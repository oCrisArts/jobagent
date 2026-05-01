import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, supabaseAdmin } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { MatchAnalysis } from "@/types/resume";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { jobId, jobTitle, jobSkills } = await request.json();

    if (!jobId || !jobTitle || !jobSkills) {
      return NextResponse.json({ 
        error: "Dados incompletos. Forneça jobId, jobTitle e jobSkills." 
      }, { status: 400 });
    }

    // Buscar resume do usuário (tabela resumes, content jsonb)
    const { data: resumes, error } = await supabaseAdmin
      .from("resumes")
      .select("content")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !resumes || resumes.length === 0) {
      return NextResponse.json({ 
        error: "Resume não encontrado. Faça upload primeiro." 
      }, { status: 404 });
    }

    const resumeText = resumes[0].content?.extracted_text || "";

    const prompt = `
Analise a compatibilidade entre o currículo e a vaga abaixo.
Retorne um JSON com a seguinte estrutura exata:
{
  "matchScore": number (0-100),
  "matched": string[] (skills do currículo que batem com a vaga),
  "missing": string[] (skills da vaga que faltam no currículo),
  "suggestions": string[] (sugestões para melhorar o currículo),
  "summary": string (resumo breve da análise em português)
}

Currículo:
${resumeText.substring(0, 3000)}

Vaga: ${jobTitle}
Skills requeridas: ${jobSkills.join(", ")}

Retorne apenas o JSON válido, sem markdown, sem texto adicional.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Erro na análise da IA" }, { status: 500 });
    }

    // Extrair JSON da resposta
    let analysisData: MatchAnalysis;
    try {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("JSON não encontrado na resposta");
      }
      analysisData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("[Vagas Analyze] Erro ao parsear JSON:", parseError, "Resposta:", content.text);
      
      // Fallback para resposta padrão
      analysisData = {
        jobId,
        matchScore: 50,
        matched: [],
        missing: jobSkills,
        suggestions: ["Adicione mais skills relevantes ao currículo"],
        summary: "Não foi possível realizar a análise detalhada."
      };
    }

    // Garantir que jobId está no retorno
    const result: MatchAnalysis = {
      ...analysisData,
      jobId
    };

    return NextResponse.json({ analysis: result });
  } catch (error) {
    console.error("[Vagas Analyze] Erro inesperado:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
