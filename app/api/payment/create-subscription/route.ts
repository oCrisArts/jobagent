// app/api/payment/create-subscription/route.ts
// Criar subscrição Stripe

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

interface CreateSubscriptionRequest {
  planType: 'pro'; // Pode ser expandido para múltiplos planos
  paymentMethod?: string; // Deixar vazio para Checkout
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body: CreateSubscriptionRequest = await req.json();
    const userId = session.user.id;
    const userEmail = session.user.email!;

    // ── VALIDAR PLANO ──────────────────────────────────────────────────
    const plano = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('name', body.planType)
      .single();

    if (!plano.data) {
      return NextResponse.json({ error: 'Plano não encontrado' }, { status: 404 });
    }

    const priceInCents = plano.data.price_cents; // Ex: 2990 (R$ 29.90)

    // ── CRIAR OU RECUPERAR CUSTOMER NO STRIPE ──────────────────────────
    let customerId: string;
    const userProfile = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (userProfile.data?.stripe_customer_id) {
      customerId = userProfile.data.stripe_customer_id;
    } else {
      // Criar novo customer
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;

      // Atualizar perfil com customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // ── CRIAR SESSÃO DE CHECKOUT ───────────────────────────────────────
    const session_checkout = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Plano ${body.planType} - Sync.IA`,
              description: plano.data.description || 'Assinatura mensal',
            },
            unit_amount: priceInCents, // Stripe usa centavos
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sucesso-pagamento?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        userId: userId,
        planType: body.planType,
      },
    });

    // ── ATUALIZAR BANCO (antes do pagamento ser aprovado) ──────────────
    await supabase
      .from('profiles')
      .update({
        subscription_status: 'inactive', // Fica inactive até o webhook confirmar
      })
      .eq('id', userId);

    // ── RETORNAR LINK DE CHECKOUT ────────────────────────────────────
    return NextResponse.json({
      success: true,
      checkout_url: session_checkout.url,
      session_id: session_checkout.id,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Erro ao criar subscrição',
      },
      { status: 500 }
    );
  }
}
