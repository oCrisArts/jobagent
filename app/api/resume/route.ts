import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/resume
 * Upload PDF → Gemini (Extract) → Claude (Adapt) → Download optimized resume
 * 
 * Body (FormData):
 *   - file: File (PDF)
 *   - jobDescription: string (job to optimize for)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing file or jobDescription' },
        { status: 400 }
      );
    }

    // TODO: Implementar fluxo:
    // 1. Parse PDF com pdf-parse
    // 2. Google Gemini: Extrair informações do CV (JSON estruturado)
    // 3. Claude 3.5 Sonnet: Adaptar CV para a vaga específica
    // 4. Retornar CV otimizado em texto/PDF

    const mockResponse = {
      success: true,
      message: 'Resume optimization API placeholder',
      originalFileName: file.name,
      jobTitle: 'Job to optimize for',
      optimizedResume: 'Optimized resume content will be here...',
      downloadUrl: '/api/resume/download'
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to optimize resume' },
      { status: 500 }
    );
  }
}
