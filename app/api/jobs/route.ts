import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const location = searchParams.get("location") || "";

  if (!query) {
    return NextResponse.json({ error: "Query obrigatória" }, { status: 400 });
  }

  const jobs = await fetchAdzuna(query, location)
    || await fetchJSearch(query, location)
    || [];

  return NextResponse.json({ jobs });
}

// ── Adzuna (melhor cobertura BR) ────────────────────────────────────────────
async function fetchAdzuna(query: string, location: string) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) return null;

  try {
    const where = location && location !== "Brazil" ? location : "brasil";
    const res = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/br/search/1`,
      {
        params: {
          app_id: appId,
          app_key: appKey,
          results_per_page: 20,
          what: query,
          where,
          content_type: "application/json",
        },
      }
    );

    return (res.data.results || []).map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company?.display_name || "Empresa não informada",
      location: job.location?.display_name || "Não informado",
      description: job.description?.slice(0, 500),
      url: job.redirect_url,
      logo: null,
      remote: job.title?.toLowerCase().includes("remot") || false,
      postedAt: job.created,
      source: "Adzuna",
    }));
  } catch (e: any) {
    console.error("Adzuna error:", e?.response?.status, e?.response?.data?.display);
    return null;
  }
}

// ── JSearch / RapidAPI (fallback) ───────────────────────────────────────────
async function fetchJSearch(query: string, location: string) {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return null;

  try {
    const fullQuery = location && location !== "Brazil"
      ? `${query} ${location}`
      : query;

    const res = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: { query: fullQuery, page: "1", num_pages: "2", date_posted: "all" },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    return (res.data.data || []).map((job: any) => ({
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
      source: "JSearch",
    }));
  } catch (e: any) {
    console.error("JSearch error:", e?.response?.status);
    return null;
  }
}
