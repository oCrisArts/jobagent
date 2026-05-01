import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, supabaseAdmin } from "@/lib/auth";

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { data: resumes, error } = await supabaseAdmin
      .from("resumes")
      .select("id, title, template_id, created_at")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("[Resume Check] Erro Supabase:", error);
      if (error.message?.includes('relation "resumes" does not exist') || 
          error.code === '42P01') {
        return NextResponse.json({ 
          error: "Tabela resumes não existe. Execute o schema: bd/supabase-schema.sql",
          needsMigration: true 
        }, { status: 500 });
      }
      return NextResponse.json({ error: "Erro ao verificar resume" }, { status: 500 });
    }

    const hasResume = resumes && resumes.length > 0;
    const latestResume = hasResume ? resumes[0] : null;

    return NextResponse.json({ 
      hasResume, 
      latestResume: latestResume ? {
        id: latestResume.id,
        title: latestResume.title,
        templateId: latestResume.template_id,
        createdAt: latestResume.created_at
      } : null
    });
  } catch (error) {
    console.error("[Resume Check] Erro inesperado:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
