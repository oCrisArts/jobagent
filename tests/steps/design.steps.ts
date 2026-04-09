import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const { Given, When, Then } = createBdd();

// Contexto para armazenar dados entre steps
const designContext: {
  tokensContent?: string;
  fileExists?: boolean;
} = {};

Given('que o projeto está configurado', async ({}) => {
  // Verifica se estamos no diretório correto
  const packageJsonPath = join(process.cwd(), 'package.json');
  expect(existsSync(packageJsonPath)).toBeTruthy();
});

When('verifico o arquivo de tokens de design', async ({}) => {
  const tokensPath = join(process.cwd(), 'styles', '_tokens.scss');
  designContext.fileExists = existsSync(tokensPath);
});

Then('o arquivo {string} deve existir', async ({}, filePath: string) => {
  const fullPath = join(process.cwd(), filePath);
  expect(existsSync(fullPath)).toBeTruthy();
});

Given('que o arquivo de tokens existe', async ({}) => {
  const tokensPath = join(process.cwd(), 'styles', '_tokens.scss');
  expect(existsSync(tokensPath)).toBeTruthy();
  designContext.fileExists = true;
});

When('leio o conteúdo dos tokens', async ({}) => {
  const tokensPath = join(process.cwd(), 'styles', '_tokens.scss');
  designContext.tokensContent = readFileSync(tokensPath, 'utf-8');
});

Then('deve conter a variável {string}', async ({}, varName: string) => {
  expect(designContext.tokensContent).toBeDefined();
  expect(designContext.tokensContent).toContain(varName);
});
