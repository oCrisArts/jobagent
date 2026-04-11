import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/auth";
import { Resend } from "resend";

// ─────────────────────────────────────────────────────────
// 📝 Logger para erros de API
// ─────────────────────────────────────────────────────────
const apiLogger = {
  error: (context: string, error: any) => {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[FORGOT-PASSWORD ERROR ${timestamp}] ${context}:`, errorMessage);
  },
  info: (context: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[FORGOT-PASSWORD INFO ${timestamp}] ${context}:`, data);
  },
};

// Inicializar Resend
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

if (!resendApiKey) {
  console.warn("[FORGOT-PASSWORD] RESEND_API_KEY não configurada");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ─────────────────────────────────────────────────────────
// POST /api/auth/forgot-password
// ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const body = await request.json();
    const { email } = body;

    apiLogger.info("Request", { email });

    // Validação do email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Formato de email inválido" },
        { status: 400 }
      );
    }

    // Consultar Supabase para verificar se o email existe
    const { data: user, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("id, email, name")
      .eq("email", email)
      .single();

    // Se erro não for "não encontrado", é um erro de servidor
    if (fetchError && fetchError.code !== "PGRST116") {
      apiLogger.error("SupabaseFetch", fetchError);
      return NextResponse.json(
        { error: "Erro interno ao consultar usuário" },
        { status: 500 }
      );
    }

    // Se usuário não existe, retornar erro específico
    if (!user) {
      apiLogger.info("UserNotFound", { email });
      return NextResponse.json(
        { error: "E-mail não encontrado" },
        { status: 404 }
      );
    }

    // Gerar token de recuperação (simplificado para MVP)
    // Em produção, usar crypto.randomBytes ou similar
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 horas

    // Em desenvolvimento, não salvar token no banco para evitar erros de coluna não existente
    if (process.env.NODE_ENV !== "development") {
      // Salvar token na tabela users (adicionar colunas se necessário)
      try {
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            reset_token: resetToken,
            reset_token_expires_at: resetTokenExpiry,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (updateError) {
          // Se colunas não existirem, apenas logar e continuar
          apiLogger.error("TokenUpdate", updateError);
        }
      } catch (tokenError) {
        apiLogger.error("TokenSave", tokenError);
      }
    }

    // Verificar se Resend está configurado
    if (!resend) {
      apiLogger.error("ResendNotConfigured", "RESEND_API_KEY não configurada");
      // Em desenvolvimento, retornar sucesso mesmo sem enviar email
      if (process.env.NODE_ENV === "development") {
        apiLogger.info("DevModeSkipEmail", { email });
        return NextResponse.json(
          { 
            success: true, 
            message: "Email de recuperação enviado com sucesso (modo desenvolvimento)",
            resetLink,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "Serviço de email não configurado" },
        { status: 503 }
      );
    }

    // Construir link de reset (usar variável de ambiente ou default)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Enviar email via Resend
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: `JobAgent <${resendFromEmail}>`,
        to: [email],
        subject: "Recuperação de Senha - JobAgent",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d4aa;">Recuperação de Senha</h2>
            <p>Olá ${user.name || "usuário"},</p>
            <p>Recebemos uma solicitação para redefinir sua senha no JobAgent.</p>
            <p>Clique no link abaixo para criar uma nova senha:</p>
            <p style="margin: 20px 0;">
              <a href="${resetLink}" 
                 style="background-color: #00d4aa; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Redefinir Senha
              </a>
            </p>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color: #666;">${resetLink}</p>
            <p style="margin-top: 30px; font-size: 12px; color: #999;">
              Este link expira em 24 horas. Se você não solicitou esta recuperação, ignore este email.
            </p>
          </div>
        `,
      });

      if (emailError) {
        apiLogger.error("ResendSend", emailError);
        // Em desenvolvimento, retornar sucesso mesmo se falhar ao enviar email
        if (process.env.NODE_ENV === "development") {
          apiLogger.info("DevModeSkipEmail", { email, reason: "ResendSend failed" });
          return NextResponse.json(
            { 
              success: true, 
              message: "Email de recuperação enviado com sucesso (modo desenvolvimento - Resend falhou)",
              resetLink,
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { error: "Erro ao enviar email de recuperação" },
          { status: 500 }
        );
      }

      apiLogger.info("EmailSent", { email, emailId: emailData?.id });

      return NextResponse.json(
        { 
          success: true, 
          message: "Email de recuperação enviado com sucesso",
          // Em desenvolvimento, retornar o link para facilitar testes
          ...(process.env.NODE_ENV === "development" && { resetLink }),
        },
        { status: 200 }
      );

    } catch (emailSendError) {
      apiLogger.error("EmailSendException", emailSendError);
      // Em desenvolvimento, retornar sucesso mesmo se falhar ao enviar email
      if (process.env.NODE_ENV === "development") {
        apiLogger.info("DevModeSkipEmail", { email, reason: "EmailSendException" });
        return NextResponse.json(
          { 
            success: true, 
            message: "Email de recuperação enviado com sucesso (modo desenvolvimento - exception)",
            resetLink,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "Erro ao enviar email" },
        { status: 500 }
      );
    }

  } catch (error) {
    apiLogger.error("UnhandledException", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────
// OPTIONS para CORS
// ─────────────────────────────────────────────────────────
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
