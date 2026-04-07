#!/usr/bin/env node
/**
 * sync-figma-tokens.js
 *
 * Usage:
 *   FIGMA_TOKEN=... node scripts/sync-figma-tokens.js [--fileKey <figmaFileKey>] [--globals <path/to/globals.css>] [--local <path/to/local/tokens.json>] [--dry-run]
 *
 * Examples:
 *   FIGMA_TOKEN=figd_xxx node scripts/sync-figma-tokens.js --fileKey 1D3V3IzG38D6t8Z2qdWhBd
 *   node scripts/sync-figma-tokens.js --dry-run
 *
 * What it does:
 *  - Fetches a Figma file's JSON (if FIGMA_TOKEN is provided and --fileKey used).
 *  - Falls back to a local tokens JSON file (design-tokens/dtcg.tokens.json) if fetching fails.
 *  - Converts design token entries into CSS custom properties.
 *  - Replaces the top-level `@theme { ... }` block inside `app/globals.css` (or the provided globals path).
 *  - Creates a timestamped backup of globals.css before writing.
 *
 * Notes:
 *  - The script does not assume any particular structure inside the Figma file beyond that it may contain token-like JSON
 *    in a node. In most setups you will use a dedicated JSON file in the repo (dtcg.tokens.json) and this script will
 *    convert it into CSS vars.
 *
 *  - If you want this process to run automatically from CI or locally, add an npm script:
 *      "sync-tokens": "node scripts/sync-figma-tokens.js --fileKey 1D3V3IzG38D6t8Z2qdWhBd"
 *
 *  - The default paths are:
 *      local tokens: design-tokens/dtcg.tokens.json
 *      globals css:  app/globals.css
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DEFAULT_FILEKEY = '1D3V3IzG38D6t8Z2qdWhBd';
const DEFAULT_LOCAL_TOKENS = path.join(process.cwd(), 'design-tokens', 'dtcg.tokens.json');
const DEFAULT_GLOBALS = path.join(process.cwd(), 'app', 'globals.css');

function usageAndExit() {
  console.log(`
Usage:
  FIGMA_TOKEN=... node scripts/sync-figma-tokens.js [--fileKey <figmaFileKey>] [--globals <path/to/globals.css>] [--local <path/to/local/tokens.json>] [--dry-run]

Flags:
  --fileKey   Figma file key. Default: ${DEFAULT_FILEKEY}
  --globals   Path to globals.css to update. Default: ${DEFAULT_GLOBALS}
  --local     Fallback local tokens file. Default: ${DEFAULT_LOCAL_TOKENS}
  --dry-run   Do not write files; print output to stdout.
  --help      Show this help.
`);
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {
    fileKey: DEFAULT_FILEKEY,
    globalsPath: DEFAULT_GLOBALS,
    localTokens: DEFAULT_LOCAL_TOKENS,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--fileKey' && args[i + 1]) {
      out.fileKey = args[++i];
    } else if (a === '--globals' && args[i + 1]) {
      out.globalsPath = args[++i];
    } else if (a === '--local' && args[i + 1]) {
      out.localTokens = args[++i];
    } else if (a === '--dry-run') {
      out.dryRun = true;
    } else if (a === '--help' || a === '-h') {
      usageAndExit();
    } else {
      console.warn('Unknown arg:', a);
      usageAndExit();
    }
  }
  return out;
}

function fetchFigmaFile(fileKey, token) {
  return new Promise((resolve, reject) => {
    if (!token) return reject(new Error('No FIGMA token provided'));

    const options = {
      hostname: 'api.figma.com',
      path: `/v1/files/${fileKey}`,
      method: 'GET',
      headers: {
        'X-Figma-Token': token,
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`Figma API returned ${res.statusCode}: ${JSON.stringify(parsed)}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

function safeReadJsonSync(filepath) {
  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

/**
 * Resolve references in the token values of the form "{color.surface.base}" to the actual token value.
 * It expects tokens in the DTCG format, e.g. tokens.color.surface.base -> { $type, $value }
 */
function resolveValue(val, tokens, seen = new Set()) {
  if (typeof val !== 'string') return val;

  // If this value is a direct reference pattern like "{color.surface.base}"
  const refPattern = /^\{([^\}]+)\}$/;
  const match = val.match(refPattern);
  if (match) {
    const refPath = match[1].trim().split('.');
    const key = refPath.join('.');
    if (seen.has(key)) {
      // circular
      return val;
    }
    seen.add(key);

    const target = getTokenByPath(tokens, refPath);
    if (target && typeof target === 'object' && ('$value' in target)) {
      return resolveValue(target['$value'], tokens, seen);
    }
    return val;
  }

  // If the value contains inline references like "linear-gradient({color.brand.600}, {color.brand.400})"
  const inlineRefRegex = /\{([^\}]+)\}/g;
  let replaced = val;
  let m;
  while ((m = inlineRefRegex.exec(val)) !== null) {
    const refParts = m[1].trim().split('.');
    const target = getTokenByPath(tokens, refParts);
    const replacement = target && target['$value'] ? resolveValue(target['$value'], tokens) : m[0];
    replaced = replaced.replace(m[0], replacement);
  }
  return replaced;
}

function getTokenByPath(tokens, pathParts) {
  let cur = tokens;
  for (const p of pathParts) {
    if (cur && typeof cur === 'object' && p in cur) {
      cur = cur[p];
    } else {
      return null;
    }
  }
  return cur;
}

/**
 * Walk the tokens JSON and produce a mapping of CSS variable name -> resolved value.
 * Naming rules (opinionated, matches existing globals.css convention):
 *  - color.brand.50 => --color-brand-50
 *  - color.surface.base => --color-surface-base
 *  - semantic.bg.app => --color-bg-app
 *  - space.space-4 => --space-space-4 (we'll simplify to --space-4 if key starts with space-)
 *  - radius.sm => --radius-sm
 *  - typography.font-family.sans => --font-family-sans (font arrays joined)
 *  - typography.font-size.xs => --font-size-xs
 */
function tokensToCssVars(tokens) {
  const vars = {};

  function walk(node, parts = []) {
    if (node && typeof node === 'object' && ('$type' in node || '$value' in node)) {
      // terminal token
      if ('$value' in node) {
        let resolved = resolveValue(node['$value'], tokens);
        // arrays (like fontFamily arrays) -> join
        if (Array.isArray(resolved)) {
          resolved = resolved.map((v) => (typeof v === 'string' && v.includes(' ') ? `"${v}"` : v)).join(', ');
        }
        const varName = makeVarName(parts);
        vars[varName] = resolved;
      } else {
        // unusual but attempt to stringify
        const varName = makeVarName(parts);
        vars[varName] = JSON.stringify(node);
      }
    } else if (node && typeof node === 'object') {
      for (const key of Object.keys(node)) {
        walk(node[key], parts.concat([key]));
      }
    }
  }

  function makeVarName(parts) {
    if (!parts || parts.length === 0) return '--unknown';
    const [root, ...rest] = parts;
    if (root === 'color') {
      return `--color-${rest.join('-')}`;
    }
    if (root === 'space') {
      // some tokens use keys like "space-4"
      return `--space-${rest.join('-').replace(/^space-/, '')}`;
    }
    if (root === 'radius') {
      return `--radius-${rest.join('-')}`;
    }
    if (root === 'typography') {
      // typography.font-family.sans => --font-family-sans
      if (rest[0] === 'font-family') {
        return `--font-family-${rest.slice(1).join('-')}`;
      }
      if (rest[0] === 'font-size') {
        return `--font-size-${rest.slice(1).join('-')}`;
      }
    }
    if (root === 'shadow' || root === 'shadows') {
      return `--shadow-${rest.join('-')}`;
    }
    // fallback: join everything
    return `--${parts.join('-')}`;
  }

  walk(tokens);
  return vars;
}

function generateThemeBlock(vars) {
  // Produce a nicely ordered block: colors first, fonts, spacing, radius, others
  const colorVars = Object.keys(vars)
    .filter((k) => k.startsWith('--color-'))
    .sort();
  const fontVars = Object.keys(vars)
    .filter((k) => k.startsWith('--font-'))
    .sort();
  const spaceVars = Object.keys(vars)
    .filter((k) => k.startsWith('--space-'))
    .sort();
  const radiusVars = Object.keys(vars)
    .filter((k) => k.startsWith('--radius-'))
    .sort();
  const shadowVars = Object.keys(vars)
    .filter((k) => k.startsWith('--shadow-'))
    .sort();
  const others = Object.keys(vars)
    .filter((k) => !colorVars.includes(k) && !fontVars.includes(k) && !spaceVars.includes(k) && !radiusVars.includes(k) && !shadowVars.includes(k))
    .sort();

  const lines = [];
  lines.push('@theme {');
  const pushKV = (name) => {
    lines.push(`  ${name}: ${vars[name]};`);
  };

  for (const k of colorVars) pushKV(k);
  if (fontVars.length) lines.push('');
  for (const k of fontVars) pushKV(k);
  if (spaceVars.length) lines.push('');
  for (const k of spaceVars) pushKV(k);
  if (radiusVars.length) lines.push('');
  for (const k of radiusVars) pushKV(k);
  if (shadowVars.length) lines.push('');
  for (const k of shadowVars) pushKV(k);
  if (others.length) lines.push('');
  for (const k of others) pushKV(k);

  lines.push('');
  lines.push('  /* Derived semantic aliases (auto-generated) */');

  // Small set of derived aliases to keep parity with previous globals.css. We'll add if tokens exist.
  if ('--color-surface-base' in vars) {
    lines.push('  --color-bg-app: var(--color-surface-base);');
  }
  if ('--color-surface-default' in vars) {
    lines.push('  --color-bg-surface: var(--color-surface-default);');
  }
  if ('--color-surface-card' in vars) {
    lines.push('  --color-bg-card: var(--color-surface-card);');
  }
  if ('--color-text-primary' in vars) {
    lines.push('  --color-fg-primary: var(--color-text-primary);');
  }
  if ('--color-text-secondary' in vars) {
    lines.push('  --color-fg-muted: var(--color-text-secondary);');
  }
  if ('--color-brand-600' in vars) {
    lines.push('  --color-action-primary: var(--color-brand-600);');
  }
  if ('--color-brand-700' in vars) {
    lines.push('  --color-action-primary-hover: var(--color-brand-700);');
  }
  if ('--color-brand-400' in vars) {
    lines.push('  --color-action-accent: var(--color-brand-400);');
  }

  lines.push('}');
  return lines.join('\n');
}

function replaceThemeBlock(originalCss, newThemeBlock) {
  const startIndex = originalCss.indexOf('@theme');
  if (startIndex === -1) {
    // No existing theme block, put the new one at the top
    return newThemeBlock + '\n\n' + originalCss;
  }

  // Find the opening brace after @theme
  const braceIndex = originalCss.indexOf('{', startIndex);
  if (braceIndex === -1) {
    // malformed; replace everything after @theme with new block
    return originalCss.slice(0, startIndex) + newThemeBlock + originalCss.slice(startIndex);
  }

  // Now find matching closing brace balancing nested braces
  let index = braceIndex + 1;
  let depth = 1;
  while (index < originalCss.length) {
    const ch = originalCss[index];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    if (depth === 0) break;
    index++;
  }

  if (depth !== 0) {
    // unmatched braces; fallback: replace from startIndex to end with new block
    return originalCss.slice(0, startIndex) + newThemeBlock;
  }

  const before = originalCss.slice(0, startIndex);
  const after = originalCss.slice(index + 1);
  return before + newThemeBlock + after;
}

async function main() {
  const opts = parseArgs();
  const figmaToken = process.env.FIGMA_TOKEN || process.env.FIGMA_API_KEY || process.env.FIGMA_KEY;

  console.log('Options:', opts);
  console.log('Using globals file:', opts.globalsPath);
  let tokens = null;
  let source = null;

  if (figmaToken) {
    console.log('Attempting to fetch tokens from Figma file:', opts.fileKey);
    try {
      const figmaJson = await fetchFigmaFile(opts.fileKey, figmaToken);
      // Heuristic: some Figma-based token systems store a JSON string in a specific page or node.
      // We'll look for a node with name containing 'tokens' or 'design-tokens' and if it holds JSON, parse it.
      // Otherwise fallback to local file.
      let found = null;
      const traverse = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        if (obj.type === 'CANVAS' && obj.children) {
          for (const c of obj.children) traverse(c);
        } else if (obj.type === 'FRAME' && obj.name && obj.children) {
          for (const c of obj.children) traverse(c);
        } else if (obj.type === 'TEXT' && obj.characters) {
          const nameLower = (obj.name || '').toLowerCase();
          if (nameLower.includes('token') || nameLower.includes('tokens') || nameLower.includes('design-tokens')) {
            // attempt parse obj.characters as JSON
            try {
              const parsed = JSON.parse(obj.characters);
              found = parsed;
            } catch (e) {
              // not JSON
            }
          }
        }
        // Descend generically
        for (const k of Object.keys(obj)) {
          const v = obj[k];
          if (Array.isArray(v)) {
            for (const it of v) if (it && typeof it === 'object') traverse(it);
          } else if (v && typeof v === 'object') {
            traverse(v);
          }
        }
      };
      traverse(figmaJson);
      if (found) {
        tokens = found;
        source = 'figma-node-json';
      } else if (figmaJson && figmaJson.styles) {
        // Not ideal: map figma styles to tokens? skip; fallback
        console.log('Figma file found but no JSON token node. Falling back to local token file.');
      } else {
        console.log('Could not find token data in Figma file. Falling back to local token file.');
      }
    } catch (err) {
      console.warn('Figma fetch failed:', err.message || err);
    }
  } else {
    console.log('No FIGMA_TOKEN env var found; will use local tokens file.');
  }

  if (!tokens) {
    tokens = safeReadJsonSync(opts.localTokens);
    if (!tokens) {
      console.error('No tokens found in Figma or local file. Tried:', opts.localTokens);
      process.exit(2);
    }
    source = 'local-file';
  }

  console.log('Using tokens source:', source);

  // Convert tokens to vars
  const vars = tokensToCssVars(tokens);
  const newThemeBlock = generateThemeBlock(vars);

  if (opts.dryRun) {
    console.log('--- Generated theme block (dry-run) ---\n');
    console.log(newThemeBlock);
    console.log('\n--- End generated block ---');
    return;
  }

  // Read globals.css
  let globalsCss = '';
  try {
    globalsCss = fs.readFileSync(opts.globalsPath, 'utf8');
  } catch (err) {
    console.error('Failed to read globals.css at', opts.globalsPath, err.message);
    process.exit(3);
  }

  // Backup
  try {
    const backupDir = path.join(process.cwd(), 'scripts', 'backups');
    fs.mkdirSync(backupDir, { recursive: true });
    const bname = `globals.css.bak.${Date.now()}.css`;
    const bpath = path.join(backupDir, bname);
    fs.writeFileSync(bpath, globalsCss, 'utf8');
    console.log('Backup saved to', bpath);
  } catch (err) {
    console.warn('Failed to create backup:', err.message);
  }

  const replaced = replaceThemeBlock(globalsCss, newThemeBlock);
  try {
    fs.writeFileSync(opts.globalsPath, replaced, 'utf8');
    console.log('globals.css updated successfully.');
  } catch (err) {
    console.error('Failed to write globals.css:', err.message);
    process.exit(4);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Unhandled error:', err && err.stack ? err.stack : err);
    process.exit(99);
  });
}
