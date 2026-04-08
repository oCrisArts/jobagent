import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/jobs
 * Busca vagas integrando Adzuna API & JSearch API
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || 'global';

    // TODO: Integrar com Adzuna API e JSearch API
    // const jobs = await searchJobs(query, location);

    return NextResponse.json({
      success: true,
      message: 'Jobs API placeholder',
      query,
      location,
      jobs: [],
      total: 0
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
