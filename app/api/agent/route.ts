import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Você é o JobAgent, um assistente especialista em carreira e busca de emprego.
Você ajuda profissionais a encontrar vagas, adaptar currículos e se preparar para entrevistas.
Seja objetivo, prático e sempre responda em português do Brasil.

Quando o usuário pedir vagas, extraia:
- Cargo/área desejada
- Localização (se mencionar)
- Nível de experiência (se mencionar)

Retorne sempre um JSON no formato:
{ "message": "sua resposta", "action": "search_jobs" | "adapt_resume" | "none", "params": { "query": "...", "location": "..." } }`;

export async function POST(req: NextRequest) {
  const { messages, userProfile } = await req.json();

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const rawText = response.content[0].type === "text"
      ? response.content[0].text
      : "";

    let parsed;
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { message: rawText, action: "none" };
    } catch {
      parsed = { message: rawText, action: "none" };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Erro no agente:", error);
    return NextResponse.json({ error: "Erro no agente" }, { status: 500 });
  }
}
