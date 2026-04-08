import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const prodEnv = path.join(projectRoot, '.env.production');
const localEnv = path.join(projectRoot, '.env.local');

try {
  if (!fs.existsSync(prodEnv)) {
    console.warn('⚠️  .env.production não encontrado. Criando .env.local vazio.');
    fs.writeFileSync(localEnv, '# Copie de .env.production\n');
  } else {
    const content = fs.readFileSync(prodEnv, 'utf-8');
    fs.writeFileSync(localEnv, content);
    console.log('✅ .env.local sincronizado com .env.production');
  }
} catch (error) {
  console.error('❌ Erro ao sincronizar .env:', error);
  process.exit(1);
}
