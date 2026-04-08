import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const figmaJsonPath = path.join(projectRoot, 'figma.json');
const tokensDir = path.join(projectRoot, 'styles', 'tokens');

// Criar estrutura se não existir
if (!fs.existsSync(tokensDir)) {
  fs.mkdirSync(tokensDir, { recursive: true });
}

try {
  // Se figma.json não existir, criar exemplo
  if (!fs.existsSync(figmaJsonPath)) {
    const exampleTokens = {
      colors: {
        primary: {
          $value: '#2563eb',
          $type: 'color',
          $description: 'Primary brand color'
        },
        secondary: {
          $value: '#1e40af',
          $type: 'color',
          $description: 'Secondary brand color'
        }
      },
      typography: {
        'heading-lg': {
          $value: '32px',
          $type: 'fontSizes'
        },
        'body-md': {
          $value: '16px',
          $type: 'fontSizes'
        }
      },
      spacing: {
        'xs': { $value: '4px', $type: 'spacing' },
        'sm': { $value: '8px', $type: 'spacing' },
        'md': { $value: '16px', $type: 'spacing' },
        'lg': { $value: '24px', $type: 'spacing' },
        'xl': { $value: '32px', $type: 'spacing' }
      }
    };

    fs.writeFileSync(figmaJsonPath, JSON.stringify(exampleTokens, null, 2));
    console.log('✅ figma.json criado (exemplo padrão)');
  }

  // Ler figma.json
  const figmaJson = JSON.parse(fs.readFileSync(figmaJsonPath, 'utf-8'));

  // Gerar colors.scss
  let colorsSCSS = `// Generated from figma.json - DO NOT EDIT MANUALLY
// Regenerate with: npm run generate-tokens\n\n`;

  if (figmaJson.colors) {
    for (const [key, value] of Object.entries(figmaJson.colors)) {
      const varName = `$color-${key.replace(/\//g, '-')}`;
      colorsSCSS += `${varName}: ${value.$value};\n`;
    }
  }

  fs.writeFileSync(path.join(tokensDir, 'colors.scss'), colorsSCSS);

  // Gerar typography.scss
  let typographySCSS = `// Generated from figma.json - DO NOT EDIT MANUALLY
// Regenerate with: npm run generate-tokens\n\n`;

  if (figmaJson.typography) {
    for (const [key, value] of Object.entries(figmaJson.typography)) {
      const varName = `$typography-${key.replace(/\//g, '-')}`;
      typographySCSS += `${varName}: ${value.$value};\n`;
    }
  }

  fs.writeFileSync(path.join(tokensDir, 'typography.scss'), typographySCSS);

  // Gerar spacing.scss
  let spacingSCSS = `// Generated from figma.json - DO NOT EDIT MANUALLY
// Regenerate with: npm run generate-tokens\n\n`;

  if (figmaJson.spacing) {
    for (const [key, value] of Object.entries(figmaJson.spacing)) {
      const varName = `$spacing-${key.replace(/\//g, '-')}`;
      spacingSCSS += `${varName}: ${value.$value};\n`;
    }
  }

  fs.writeFileSync(path.join(tokensDir, 'spacing.scss'), spacingSCSS);

  console.log('✅ Design tokens gerados com sucesso:');
  console.log('   - styles/tokens/colors.scss');
  console.log('   - styles/tokens/typography.scss');
  console.log('   - styles/tokens/spacing.scss');

} catch (error) {
  console.error('❌ Erro ao gerar tokens:', error);
  process.exit(1);
}
