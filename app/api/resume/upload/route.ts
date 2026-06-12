import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, supabaseAdmin } from "@/lib/auth";
import pdfParse from "pdf-parse";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log("[Resume Upload] Session:", {
    userId: session?.user?.id,
    email: session?.user?.email,
    idType: typeof session?.user?.id
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Apenas arquivos PDF são aceitos" }, { status: 400 });
    }

    // Limite de 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Arquivo muito grande (máx. 5MB)" }, { status: 400 });
    }

    // Extrair texto do PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let extractedText = "";
    try {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } catch (pdfError) {
      console.error("[Resume Upload] Erro ao parsear PDF:", pdfError);
      return NextResponse.json({ error: "Erro ao processar PDF" }, { status: 400 });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json({ error: "Não foi possível extrair texto do PDF" }, { status: 400 });
    }

    // Extrair skills básicas do texto (palavras-chave comuns)
    const commonSkills = [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", 
      "Java", "Go", "Rust", "SQL", "PostgreSQL", "MongoDB", "AWS", 
      "Docker", "Kubernetes", "Git", "CI/CD", "Agile", "Scrum", 
      "Product Management", "UX", "UI", "Figma", "Design System",
      "Leadership", "Communication", "Problem Solving"
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      extractedText.toLowerCase().includes(skill.toLowerCase())
    );

    // Inserir no Supabase seguindo o schema oficial
    const { data, error } = await supabaseAdmin
      .from("resumes")
      .insert({
        user_id: session.user.id,
        title: file.name.replace('.pdf', ''),
        content: {
          extracted_text: extractedText,
          skills: foundSkills,
          source_filename: file.name
        },
        template_id: "modern"
      })
      .select("id, title, template_id, created_at")
      .single();

    if (error) {
      console.error("[Resume Upload] Erro Supabase:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Erros específicos para debugging
      if (error.code === '23503') {
        return NextResponse.json({ 
          error: "Usuário não encontrado no banco de dados. Faça login novamente." 
        }, { status: 400 });
      }
      if (error.code === '22P02') {
        return NextResponse.json({ 
          error: "Formato de ID inválido" 
        }, { status: 400 });
      }
      if (error.code === '23502') {
        return NextResponse.json({ 
          error: "Campos obrigatórios faltando" 
        }, { status: 400 });
      }
      
      return NextResponse.json({ 
        error: "Erro ao salvar resume: " + error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      resume: {
        id: data.id,
        title: data.title,
        templateId: data.template_id,
        createdAt: data.created_at
      }
    });
  } catch (error) {
    console.error("[Resume Upload] Erro inesperado:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
