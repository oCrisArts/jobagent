import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { resume, job } = await req.json();

  if (!resume || !job) {
    return NextResponse.json({ error: "Currículo e vaga são obrigatórios" }, { status: 400 });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [{
        role: "user",
        content: `Você é um especialista em RH e redação de currículos.
        
Adapte o currículo abaixo para a vaga indicada. Mantenha as informações verídicas, mas reorganize e enfatize as experiências e habilidades mais relevantes para a vaga. Use linguagem profissional em português do Brasil.

VAGA:
Título: ${job.title}
Empresa: ${job.company}
Descrição: ${job.description}

CURRÍCULO ORIGINAL:
${resume}

Retorne apenas o currículo adaptado, sem explicações adicionais.`,
      }],
    });

    const adaptedResume = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ adaptedResume });
  } catch (error) {
    console.error("Erro ao adaptar currículo:", error);
    return NextResponse.json({ error: "Erro ao adaptar currículo" }, { status: 500 });
  }
}
