import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, supabaseAdmin } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { Job } from "@/types/resume";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Mock jobs para teste
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Brasil",
    location: "São Paulo, SP (Remoto)",
    description: "Desenvolvimento de interfaces modernas com React, TypeScript e Next.js. Trabalho em equipe ágil.",
    skills_required: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git", "REST APIs"],
    salary: "R$ 12.000 - 18.000",
    posted_at: "2025-04-28"
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Startup Inovadora",
    location: "Remoto",
    description: "Design de produtos digitais, prototipagem em Figma, pesquisa com usuários.",
    skills_required: ["Figma", "UI/UX", "Prototipagem", "Design System", "User Research"],
    salary: "R$ 8.000 - 12.000",
    posted_at: "2025-04-27"
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Fintech Plus",
    location: "Rio de Janeiro, RJ",
    description: "Desenvolvimento completo de aplicações web, banco de dados PostgreSQL, APIs REST.",
    skills_required: ["Node.js", "React", "PostgreSQL", "Docker", "AWS", "TypeScript"],
    salary: "R$ 15.000 - 22.000",
    posted_at: "2025-04-26"
  },
  {
    id: "4",
    title: "UX Researcher",
    company: "Agência Digital",
    location: "Belo Horizonte, MG (Híbrido)",
    description: "Pesquisa qualitativa e quantitativa, testes de usabilidade, análise de dados.",
    skills_required: ["User Research", "Maze", "Figma", "Métricas", "Entrevistas"],
    salary: "R$ 9.000 - 14.000",
    posted_at: "2025-04-25"
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "Cloud Systems",
    location: "Remoto",
    description: "Desenvolvimento de microserviços, arquitetura escalável, mensageria.",
    skills_required: ["Go", "Kafka", "Kubernetes", "gRPC", "MongoDB", "Redis"],
    salary: "R$ 18.000 - 28.000",
    posted_at: "2025-04-24"
  }
];

async function calculateMatchScores(curriculoText: string, jobs: Job[]): Promise<Map<string, number>> {
  const scoresMap = new Map<string, number>();
  
  try {
    // Criar um batch de vagas para análise em uma única chamada
    const jobsSummary = jobs.map((job, idx) => `
[${idx}] ${job.title}
Skills: ${job.skills_required.join(", ")}
Desc: ${job.description.substring(0, 100)}...`).join("\n\n");

    const prompt = `
Analise a compatibilidade entre o currículo abaixo e cada uma das ${jobs.length} vagas listadas.
Retorne APENAS um JSON array com os scores (0-100) na mesma ordem das vagas.

Currículo:
${curriculoText.substring(0, 3000)}

Vagas:
${jobsSummary}

Retorne APENAS: [85, 72, 45, ...] (array de números na ordem das vagas)`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 100,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      // Fallback: retornar scores médios
      jobs.forEach(job => scoresMap.set(job.id, 50));
      return scoresMap;
    }

    // Extrair array de scores
    const text = content.text.trim();
    const match = text.match(/\[([\d\s,]+)\]/);
    if (match) {
      const scores = match[1].split(',').map(s => parseInt(s.trim(), 10));
      jobs.forEach((job, idx) => {
        const score = scores[idx] || 50;
        scoresMap.set(job.id, Math.min(100, Math.max(0, score)));
      });
    } else {
      // Fallback
      jobs.forEach(job => scoresMap.set(job.id, 50));
    }
    
    return scoresMap;
  } catch (error) {
    console.error("[Vagas Search] Erro ao calcular match scores:", error);
    // Fallback: retornar scores padrão
    jobs.forEach(job => scoresMap.set(job.id, 50));
    return scoresMap;
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { searchTerm, location } = await request.json();

    // Buscar resume do usuário (tabela resumes, content jsonb)
    const { data: resumes } = await supabaseAdmin
      .from("resumes")
      .select("content")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    const hasResume = resumes && resumes.length > 0;
    const resumeText = hasResume ? resumes[0].content?.extracted_text || "" : "";

    // Filtrar jobs por termo de busca e localização
    let filteredJobs = mockJobs.filter(job => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills_required.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesLocation = !location || 
        job.location.toLowerCase().includes(location.toLowerCase());
      
      return matchesSearch && matchesLocation;
    });

    // Se não encontrou com filtro, retorna todos
    if (filteredJobs.length === 0) {
      filteredJobs = mockJobs;
    }

    // Calcular match scores se tiver resume (uma única chamada para todas as vagas)
    let jobsWithScores: Job[];
    if (hasResume && filteredJobs.length > 0) {
      const scoresMap = await calculateMatchScores(resumeText, filteredJobs);
      
      jobsWithScores = filteredJobs.map(job => ({
        ...job,
        matchScore: scoresMap.get(job.id) || 50
      }));
      
      // Ordenar por matchScore DESC
      jobsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else {
      jobsWithScores = filteredJobs;
    }

    return NextResponse.json({
      jobs: jobsWithScores,
      hasResume,
      total: jobsWithScores.length
    });
  } catch (error) {
    console.error("[Vagas Search] Erro inesperado:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
