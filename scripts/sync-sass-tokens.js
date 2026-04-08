#!/usr/bin/env node

/**
 * Sync Figma Design Tokens (dtcg.tokens.json) → SASS Variables (_tokens.scss)
 * Converte tokens JSON em variáveis SCSS prontas para usar
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
    console.log('   Criando arquivo de tokens padrão...\n');
    
    const defaultTokens = {
      color: {
        brand: { 600: { $value: '#2563eb', $type: 'color' } },
        neutral: {
          50: { $value: '#f9fafb', $type: 'color' },
          900: { $value: '#111827', $type: 'color' }
        }
      },
      sizing: {
        xs: { $value: '0.25rem', $type: 'dimension' },
        sm: { $value: '0.5rem', $type: 'dimension' },
        md: { $value: '1rem', $type: 'dimension' }
      },
      typography: {
        size: {
          h1: { $value: '32px', $type: 'dimension' },
          body: { $value: '16px', $type: 'dimension' }
        }
      }
    };
    
    fs.mkdirSync(path.dirname(tokensJsonPath), { recursive: true });
    fs.writeFileSync(tokensJsonPath, JSON.stringify(defaultTokens, null, 2));
    console.log(`✅ Criado: ${tokensJsonPath}\n`);
  }

  // 2. Ler tokens JSON
  const tokensContent = fs.readFileSync(tokensJsonPath, 'utf8');
  const tokens = JSON.parse(tokensContent);

  // 3. Converter para SCSS
  let scssContent = `// ============================================
// DESIGN TOKENS (Gerado automaticamente)
// DO NOT EDIT MANUALLY
// Regenerate com: npm run sync-tokens
// ============================================\n\n`;

  function flattenTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${key}` : key;

      if (value.$value && value.$type) {
        // É um token direto
        const sassVar = `$${varName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()}`;
        const sassValue = value.$value;
        scssContent += `${sassVar}: ${sassValue};\n`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // É um grupo, recursionar
        flattenTokens(value, varName);
      }
    }
  }

  flattenTokens(tokens);

  // 4. Salvar arquivo SCSS
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, scssContent);

  console.log(`✅ Tokens gerados com sucesso!\n`);
  console.log(`📍 Origem: ${tokensJsonPath}`);
  console.log(`📍 Saída:  ${outputPath}\n`);

  // 5. Contar variáveis
  const varCount = (scssContent.match(/^\$/gm) || []).length;
  console.log(`📊 ${varCount} variáveis SASS criadas\n`);

  console.log('✨ Pronto para usar: @import "_tokens.scss" em seus arquivos SCSS\n');
} catch (error) {
  console.error('❌ Erro ao sincronizar tokens:', error.message);
  process.exit(1);
}
