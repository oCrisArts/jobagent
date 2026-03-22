import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const location = searchParams.get("location") || "";

  if (!query) {
    return NextResponse.json({ error: "Query obrigatória" }, { status: 400 });
  }

  // Monta a query — só adiciona localização se for diferente de "Brazil" (default genérico)
  const fullQuery = location && location !== "Brazil"
    ? `${query} ${location}`
    : query;

  try {
    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query: fullQuery,
        page: "1",
        num_pages: "2",
        date_posted: "all",
        language: "pt",
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    // Se não retornou nada com localização, tenta sem
    let data = response.data.data || [];
    if (data.length === 0 && location && location !== "Brazil") {
      const fallback = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: { query, page: "1", num_pages: "2", date_posted: "all" },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      });
      data = fallback.data.data || [];
    }

    const jobs = data.map((job: any) => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city
        ? `${job.job_city}${job.job_state ? ", " + job.job_state : ""}`
        : job.job_country || "Não informado",
      description: job.job_description?.slice(0, 500),
      url: job.job_apply_link,
      logo: job.employer_logo,
      remote: job.job_is_remote,
      postedAt: job.job_posted_at_datetime_utc,
    }));

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error("Erro ao buscar vagas:", error?.response?.data || error.message);
    return NextResponse.json({ error: "Erro ao buscar vagas" }, { status: 500 });
  }
}
