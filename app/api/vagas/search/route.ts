import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, supabaseAdmin } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { Job } from "@/types/resume";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Função para buscar vagas da API JSearch
async function searchJobsFromAPI(searchTerm: string, location: string): Promise<Job[]> {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const rapidApiHost = process.env.RAPIDAPI_HOST;

  if (!rapidApiKey || !rapidApiHost) {
    console.error('[Vagas Search API] Credenciais da RapidAPI não configuradas');
    throw new Error('Credenciais da RapidAPI não configuradas');
  }

  try {
    console.log('[Vagas Search API] Buscando vagas na API JSearch:', { searchTerm, location });
    
    const url = new URL('https://jsearch.p.rapidapi.com/search');
    
    // Parâmetros da API JSearch
    url.searchParams.append('query', searchTerm || '');
    if (location) {
      url.searchParams.append('location', location);
    }
    url.searchParams.append('page', '1');
    url.searchParams.append('num_pages', '1');
    url.searchParams.append('date_posted', 'all');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey,
      },
    });

    if (!response.ok) {
      console.error('[Vagas Search API] Erro na API JSearch:', response.status, response.statusText);
      throw new Error(`Erro na API JSearch: ${response.status}`);
    }

    const data = await response.json();
    console.log('[Vagas Search API] Resposta da API JSearch:', { 
      dataKeys: Object.keys(data),
      jobsCount: data.data?.length || 0 
    });

    // Mapear resposta da API JSearch para formato Job
    const jobs: Job[] = (data.data || []).map((job: any) => ({
      id: job.job_id || job.job_id,
      title: job.job_title || 'Sem título',
      company: job.employer_name || 'Empresa não informada',
      location: job.job_location || 'Localização não informada',
      description: job.job_description || 'Sem descrição',
      skills_required: job.job_required_skills || [],
      salary: job.job_min_salary && job.job_max_salary 
        ? `${job.job_salary_currency || 'R$'} ${job.job_min_salary} - ${job.job_max_salary}`
        : job.job_salary || 'Salário não informado',
      posted_at: job.job_posted_at_datetime_utc || job.job_posted_at || new Date().toISOString(),
      job_url: job.job_apply_link || job.job_google_link || '',
    }));

    console.log('[Vagas Search API] Vagas mapeadas:', jobs.length);
    return jobs;
  } catch (error) {
    console.error('[Vagas Search API] Erro ao buscar vagas da API JSearch:', error);
    throw error;
  }
}

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
  console.log('[Vagas Search API] Iniciando requisição');
  
  const session = await getServerSession(authOptions);
  console.log('[Vagas Search API] Sessão:', { hasSession: !!session, userId: session?.user?.id });

  if (!session?.user?.id) {
    console.error('[Vagas Search API] Não autorizado - sem sessão');
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { searchTerm, location } = body;
    console.log('[Vagas Search API] Parâmetros:', { searchTerm, location });

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

    // Buscar vagas da API JSearch
    let jobsFromAPI: Job[] = [];
    try {
      jobsFromAPI = await searchJobsFromAPI(searchTerm, location);
    } catch (apiError) {
      console.error('[Vagas Search API] Erro ao buscar vagas da API JSearch:', apiError);
      return NextResponse.json({ error: "Erro ao buscar vagas da API externa" }, { status: 500 });
    }
    
    console.log('[Vagas Search API] Vagas obtidas da API:', jobsFromAPI.length);

    // Calcular match scores se tiver resume (uma única chamada para todas as vagas)
    let jobsWithScores: Job[];
    if (hasResume && jobsFromAPI.length > 0) {
      console.log('[Vagas Search API] Calculando match scores para', jobsFromAPI.length, 'vagas');
      const scoresMap = await calculateMatchScores(resumeText, jobsFromAPI);
      
      jobsWithScores = jobsFromAPI.map((job: Job) => ({
        ...job,
        matchScore: scoresMap.get(job.id) || 50
      }));
      
      // Ordenar por matchScore DESC
      jobsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else {
      jobsWithScores = jobsFromAPI;
    }

    console.log('[Vagas Search API] Retornando resposta:', { 
      jobsCount: jobsWithScores.length, 
      hasResume 
    });
    
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
