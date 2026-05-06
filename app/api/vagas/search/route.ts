import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, supabaseAdmin } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { Job } from "@/types/resume";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Mock jobs para teste - 15 vagas variadas
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Brasil",
    location: "São Paulo, SP",
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
    location: "Belo Horizonte, MG",
    description: "Pesquisa qualitativa e quantitativa, testes de usabilidade, análise de dados.",
    skills_required: ["User Research", "Maze", "Figma", "Métricas", "Entrevistas"],
    salary: "R$ 9.000 - 14.000",
    posted_at: "2025-04-25"
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "Cloud Systems",
    location: "Curitiba, PR",
    description: "Desenvolvimento de microserviços, arquitetura escalável, mensageria.",
    skills_required: ["Go", "Kafka", "Kubernetes", "gRPC", "MongoDB", "Redis"],
    salary: "R$ 18.000 - 28.000",
    posted_at: "2025-04-24"
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "TechOps Brasil",
    location: "São Paulo, SP",
    description: "Automação de pipelines CI/CD, gerenciamento de infraestrutura cloud, monitoramento.",
    skills_required: ["Docker", "Kubernetes", "Terraform", "AWS", "Jenkins", "GitLab CI"],
    salary: "R$ 14.000 - 20.000",
    posted_at: "2025-04-23"
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "DataCorp Analytics",
    location: "Remoto",
    description: "Análise de dados, machine learning, modelos preditivos, visualização de dados.",
    skills_required: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "SQL", "Tableau"],
    salary: "R$ 16.000 - 25.000",
    posted_at: "2025-04-22"
  },
  {
    id: "8",
    title: "Mobile Developer Flutter",
    company: "AppMaster",
    location: "Porto Alegre, RS",
    description: "Desenvolvimento de aplicativos mobile cross-platform com Flutter e Dart.",
    skills_required: ["Flutter", "Dart", "Firebase", "Mobile UX", "Git", "REST APIs"],
    salary: "R$ 11.000 - 16.000",
    posted_at: "2025-04-21"
  },
  {
    id: "9",
    title: "Tech Lead",
    company: "Enterprise Solutions",
    location: "Brasília, DF",
    description: "Liderança técnica de equipe, definição de arquitetura, code reviews, mentoria.",
    skills_required: ["Leadership", "System Design", "Java", "Spring Boot", "Microservices", "Agile"],
    salary: "R$ 20.000 - 30.000",
    posted_at: "2025-04-20"
  },
  {
    id: "10",
    title: "QA Automation Engineer",
    company: "Quality First",
    location: "Fortaleza, CE",
    description: "Automação de testes, testes end-to-end, performance testing, CI/CD.",
    skills_required: ["Selenium", "Cypress", "Jest", "Python", "Docker", "Git"],
    salary: "R$ 10.000 - 15.000",
    posted_at: "2025-04-19"
  },
  {
    id: "11",
    title: "Product Manager",
    company: "ProductLab",
    location: "Salvador, BA",
    description: "Gestão de produto digital, definição de roadmap, análise de métricas, stakeholder management.",
    skills_required: ["Product Management", "Agile", "Analytics", "User Stories", "Roadmapping", "Scrum"],
    salary: "R$ 17.000 - 26.000",
    posted_at: "2025-04-18"
  },
  {
    id: "12",
    title: "Security Engineer",
    company: "SecureNet",
    location: "Recife, PE",
    description: "Segurança de aplicações, pentesting, análise de vulnerabilidades, compliance.",
    skills_required: ["OWASP", "Penetration Testing", "Python", "Security Auditing", "Network Security", "SIEM"],
    salary: "R$ 16.000 - 24.000",
    posted_at: "2025-04-17"
  },
  {
    id: "13",
    title: "UI Designer",
    company: "Creative Studio",
    location: "Remoto",
    description: "Design de interfaces, design system, prototipagem, handoff para desenvolvedores.",
    skills_required: ["Figma", "Adobe XD", "UI Design", "Design System", "Prototyping", "Zeplin"],
    salary: "R$ 8.000 - 13.000",
    posted_at: "2025-04-16"
  },
  {
    id: "14",
    title: "Solutions Architect",
    company: "Cloud Architects",
    location: "São Paulo, SP",
    description: "Arquitetura de soluções cloud-native, definição de padrões, consultoria técnica.",
    skills_required: ["AWS", "Azure", "Architecture Patterns", "Microservices", "Kubernetes", "Terraform"],
    salary: "R$ 22.000 - 35.000",
    posted_at: "2025-04-15"
  },
  {
    id: "15",
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "Campinas, SP",
    description: "Desenvolvimento de modelos ML, MLOps, pipelines de dados, deploy de modelos.",
    skills_required: ["Python", "TensorFlow", "PyTorch", "MLOps", "Docker", "Kubernetes", "SQL"],
    salary: "R$ 19.000 - 28.000",
    posted_at: "2025-04-14"
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

    // Buscar resume do usuário (tabela resumes, content jsonb) com try/catch
    let hasResume = false;
    let resumeText = "";
    try {
      const { data: resumes, error: resumeError } = await supabaseAdmin
        .from("resumes")
        .select("content")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (resumeError) {
        console.error("[Vagas Search] Erro ao buscar resume:", resumeError);
      } else if (resumes && resumes.length > 0) {
        hasResume = true;
        resumeText = resumes[0].content?.extracted_text || "";
      }
    } catch (resumeErr) {
      console.error("[Vagas Search] Erro inesperado ao buscar resume:", resumeErr);
    }

    // Separar searchTerm em palavras individuais
    const searchWords: string[] = searchTerm 
      ? searchTerm.toLowerCase().split(/\s+/).filter((w: string) => w.length > 0)
      : [];
    const locationWords: string[] = location
      ? location.toLowerCase().split(/\s+/).filter((w: string) => w.length > 0)
      : [];

    // Filtrar jobs por termo de busca e localização
    // Match se QUALQUER palavra bater com title, company, description ou skills
    const filteredJobs = mockJobs.filter(job => {
      // Se não há termos de busca, considera match
      const matchesSearch = searchWords.length === 0 || searchWords.some((word: string) =>
        job.title.toLowerCase().includes(word) ||
        job.company.toLowerCase().includes(word) ||
        job.description.toLowerCase().includes(word) ||
        job.skills_required.some(skill => skill.toLowerCase().includes(word))
      );
      
      // Match de location por palavras parciais
      const matchesLocation = locationWords.length === 0 || locationWords.some((word: string) =>
        job.location.toLowerCase().includes(word)
      );
      
      return matchesSearch && matchesLocation;
    });
    // REMOVIDO: fallback que retornava todos os jobs quando filtro dava zero

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
