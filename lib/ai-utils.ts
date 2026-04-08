// lib/ai-utils.ts - CHUNK 1/3
// Abstração para suportar Gemini + Claude com base no plano do usuário

import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdf from 'pdf-parse';

// ── CLIENTS ────────────────────────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const googleAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GEMINI_API_KEY!
);

// ── TIPOS ──────────────────────────────────────────────────────────────
interface ExtractResumeTextOptions {
  pdfBuffer: Buffer;
  isPro: boolean;
}

interface AdaptResumeOptions {
  resumeText: string;
  jobTitle: string;
  jobDescription: string;
  jobCompany: string;
  isPro: boolean;
}

interface AIResult {
  model: 'gemini' | 'claude';
  content: string;
  tokensUsed?: number;
}

// ── FUNÇÃO 1: Extrair Texto do PDF ─────────────────────────────────────
// Usa GEMINI mesmo para Free (análise básica) e Pro (análise avançada)
export async function extractResumeText(
  options: ExtractResumeTextOptions
): Promise<AIResult> {
  const { pdfBuffer, isPro } = options;

  try {
    // Parse PDF
    const pdfData = await pdf(pdfBuffer);
    const rawText = pdfData.text;

    // Se Free: apenas limpar e retornar
    if (!isPro) {
      return {
        model: 'gemini',
        content: rawText.trim(),
      };
    }

    // Se Pro: usar Gemini para análise estruturada e extração
    const geminiModel = googleAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp', // Modelo free
    });

    const prompt = `Analise o seguinte currículo em PDF e extraia as informações estruturadas:
    
TEXTO DO PDF:
${rawText}

Retorne um JSON com:
{
  "name": "Nome completo",
  "email": "email@example.com",
  "phone": "telefone",
  "summary": "Resumo profissional",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "Empresa",
      "position": "Cargo",
      "duration": "2021-2023",
      "description": "O que fez"
    }
  ],
  "education": [
    {
      "institution": "Universidade",
      "degree": "Curso",
      "year": "2019"
    }
  ],
  "certifications": ["cert1", "cert2"]
}`;

    const response = await geminiModel.generateContent(prompt);
    const extractedText = response.response.text();

    return {
      model: 'gemini',
      content: extractedText,
    };
  } catch (error) {
    console.error('Resume extraction error:', error);
    throw new Error('Erro ao extrair texto do currículo');
  }
}
// lib/ai-utils.ts - CHUNK 2/3 (append)

// ── FUNÇÃO 2: Adaptar Currículo para Vaga ──────────────────────────────
// Free: Gemini básico | Pro: Claude 3.5 Sonnet (melhor qualidade)
export async function adaptResume(
  options: AdaptResumeOptions
): Promise<AIResult> {
  const { resumeText, jobTitle, jobDescription, jobCompany, isPro } = options;

  const systemPrompt = `Você é um especialista em RH e redação de currículos brasileiros. 
Sua tarefa é adaptar um currículo para uma vaga específica, mantendo as informações verídicas, 
mas reorganizando e enfatizando as experiências e habilidades mais relevantes.
Use linguagem profissional em português do Brasil.`;

  const userPrompt = `Adapte o currículo abaixo para a vaga indicada:

VAGA:
Título: ${jobTitle}
Empresa: ${jobCompany}
Descrição: ${jobDescription}

CURRÍCULO ORIGINAL:
${resumeText}

Retorne apenas o currículo adaptado, sem explicações adicionais.`;

  try {
    // Se FREE: usar Gemini
    if (!isPro) {
      const geminiModel = googleAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      const response = await geminiModel.generateContent([
        {
          text: systemPrompt + '\n\n' + userPrompt,
        },
      ]);

      const adaptedText = response.response.text();

      return {
        model: 'gemini',
        content: adaptedText,
      };
    }

    // Se PRO: usar Claude 3.5 Sonnet (melhor qualidade)
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const adaptedText =
      response.content[0].type === 'text' ? response.content[0].text : '';

    return {
      model: 'claude',
      content: adaptedText,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  } catch (error) {
    console.error('Resume adaptation error:', error);
    throw new Error('Erro ao adaptar currículo');
  }
}
// lib/ai-utils.ts - CHUNK 3/3 (append)

// ── FUNÇÃO 3: Analisar Fit Job-Candidato (só Pro) ─────────────────────
// Usa Claude para análise profunda
export async function analyzeJobFit(
  resumeText: string,
  jobDescription: string,
  jobTitle: string,
  isPro: boolean
): Promise<{
  matchPercentage: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}> {
  if (!isPro) {
    return {
      matchPercentage: 0,
      strengths: [],
      gaps: [],
      recommendations: ['Atualize para Pro para análise detalhada de fit'],
    };
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Analise o match entre este currículo e a vaga:

CURRÍCULO:
${resumeText}

VAGA: ${jobTitle}
DESCRIÇÃO:
${jobDescription}

Retorne um JSON com:
{
  "matchPercentage": 0-100,
  "strengths": ["força1", "força2"],
  "gaps": ["lacuna1", "lacuna2"],
  "recommendations": ["recomendação1"]
}`,
        },
      ],
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '{}';
    const analysis = JSON.parse(text);

    return analysis;
  } catch (error) {
    console.error('Job fit analysis error:', error);
    throw new Error('Erro ao analisar compatibilidade');
  }
}

// ── FUNÇÃO 4: Gerar Scoring SSI (Sync Score Index) ────────────────────
// Análise gamificada do perfil do usuário
export async function calculateSSIScore(userProfile: {
  totalXp: number;
  level: number;
  resumeCount: number;
  applicationCount: number;
  headhunterCount: number;
  profileCompleteness: number; // 0-100
}): Promise<{ ssiScore: number; breakdown: Record<string, number> }> {
  const breakdown = {
    xp_factor: Math.min((userProfile.totalXp / 1000) * 20, 20), // até 20 pontos
    level_factor: Math.min(userProfile.level * 2, 20), // até 20 pontos
    activity_factor:
      (userProfile.applicationCount * 5 +
        userProfile.resumeCount * 10 +
        userProfile.headhunterCount * 15) /
      100, // até 30 pontos
    profile_completeness: userProfile.profileCompleteness * 0.3, // até 30 pontos
  };

  const ssiScore = Math.min(
    100,
    Object.values(breakdown).reduce((a, b) => a + b, 0)
  );

  return { ssiScore: Math.round(ssiScore), breakdown };
}
