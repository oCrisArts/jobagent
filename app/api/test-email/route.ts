import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || 'cristiano.acosta.m@gmail.com';

  try {
    console.log(`📧 Enviando e-mail de teste para: ${email}`);
    console.log(`🔑 RESEND_API_KEY configurada: ${process.env.RESEND_API_KEY ? 'SIM' : 'NÃO'}`);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Teste de E-mail - JobAgent',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Teste de E-mail</h1>
          <p>Este é um e-mail de teste do sistema JobAgent.</p>
          <p>Se você recebeu este e-mail, a configuração do Resend está funcionando corretamente!</p>
          <p style="color: #666; font-size: 14px;">Enviado em: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar e-mail:', error);
      return NextResponse.json(
        { error: 'Erro ao enviar e-mail', details: error },
        { status: 500 }
      );
    }

    console.log('✅ E-mail enviado com sucesso:', data);
    return NextResponse.json(
      { 
        success: true, 
        message: 'E-mail enviado com sucesso',
        data 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Erro na rota de teste de e-mail:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno no servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
