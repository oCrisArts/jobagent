import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const location = searchParams.get("location") || "Brazil";

  if (!query) {
    return NextResponse.json({ error: "Query obrigatória" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search",
      {
        params: {
          query: `${query} in ${location}`,
          page: "1",
          num_pages: "1",
          date_posted: "month",
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    const jobs = response.data.data.map((job: any) => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_country,
      description: job.job_description?.slice(0, 500),
      url: job.job_apply_link,
      logo: job.employer_logo,
      remote: job.job_is_remote,
      postedAt: job.job_posted_at_datetime_utc,
    }));

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return NextResponse.json({ error: "Erro ao buscar vagas" }, { status: 500 });
  }
}
