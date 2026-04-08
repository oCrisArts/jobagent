#!/usr/bin/env node

/**
 * Sync Figma Design Tokens (dtcg.tokens.json) → SASS Variables (_tokens.scss)
 * Converte tokens JSON em variáveis SCSS prontas para usar
 * AGORA: Resolve referências entre tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const tokensJsonPath = path.join(projectRoot, 'design-tokens', 'dtcg.tokens.json');
const outputPath = path.join(projectRoot, 'styles', '_tokens.scss');

console.log('🎨 Sincronizando Design Tokens (JSON → SCSS)...\n');

try {
  // 1. Verificar se arquivo de tokens existe
  if (!fs.existsSync(tokensJsonPath)) {
    console.warn(`⚠️  ${tokensJsonPath} não encontrado`);
    process.exit(1);
  }

  // 2. Ler tokens JSON
  const tokensContent = fs.readFileSync(tokensJsonPath, 'utf8');
  const tokens = JSON.parse(tokensContent);

  // 3. Flattening + Resolving references
  const tokenMap = new Map(); // Mapeia path → valor

  function flattenAndResolve(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;

      if (value.$value && value.$type) {
        // É um token direto
        let resolvedValue = value.$value;
        
        // Se o valor é uma referência (formato: {color.surface.base}), resolver
        if (typeof resolvedValue === 'string' && resolvedValue.startsWith('{')) {
          const refPath = resolvedValue.slice(1, -1); // Remove { }
          // Guardar referência para resolver depois
          tokenMap.set(path, { value: resolvedValue, $type: value.$type, ref: refPath });
        } else {
          tokenMap.set(path, { value: resolvedValue, $type: value.$type });
        }
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // É um grupo, recursionar
        flattenAndResolve(value, path);
      }
    }
  }

  flattenAndResolve(tokens);

  // 4. Resolver referências
  function resolveValue(tokenPath) {
    const token = tokenMap.get(tokenPath);
    if (!token) return null;

    // Se já foi resolvido
    if (!token.ref) return token.value;

    // Se é uma referência, resolver recursivamente
    const refValue = resolveValue(token.ref);
    token.value = refValue || token.value;
    delete token.ref; // Marcar como resolvido
    return token.value;
  }

  // Resolver todas as referências
  for (const [path] of tokenMap) {
    resolveValue(path);
  }

  // 5. Converter para SCSS
  let scssContent = `// ============================================
// DESIGN TOKENS (Gerado automaticamente)
// DO NOT EDIT MANUALLY
// Regenerate com: npm run sync-tokens
// ============================================\n\n`;

  // Gerar variáveis SCSS
  for (const [path, token] of tokenMap) {
    const sassVar = `$${path.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()}`;
    const sassValue = token.value;
    scssContent += `${sassVar}: ${sassValue};\n`;
  }

  // 6. Salvar arquivo SCSS
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, scssContent);

  console.log(`✅ Tokens gerados com sucesso!\n`);
  console.log(`📍 Origem: ${tokensJsonPath}`);
  console.log(`📍 Saída:  ${outputPath}\n`);

  // 7. Contar variáveis
  const varCount = tokenMap.size;
  console.log(`📊 ${varCount} variáveis SASS criadas\n`);

  console.log('✨ Pronto para usar: @import "_tokens.scss" em seus arquivos SCSS\n');
} catch (error) {
  console.error('❌ Erro ao sincronizar tokens:', error.message);
  process.exit(1);
}
