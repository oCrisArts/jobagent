// app/api/payment/cancel-subscription/route.ts
// Cancelar assinatura Stripe (usuário solicita)

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const userId = session.user.id;

    // Buscar subscription_id do usuário
    const userProfile = await supabase
      .from('profiles')
      .select('subscription_id')
      .eq('id', userId)
      .single();

    if (!userProfile.data?.subscription_id) {
      return NextResponse.json(
        { error: 'Nenhuma assinatura ativa' },
        { status: 404 }
      );
    }

    // Cancelar no Stripe
    await stripe.subscriptions.cancel(userProfile.data.subscription_id);

    // Atualizar banco (o webhook vai fazer a confirmação, mas já marcamos como cancelado)
    await supabase
      .from('profiles')
      .update({
        is_pro: false,
        subscription_status: 'canceled',
      })
      .eq('id', userId);

    return NextResponse.json({ success: true, message: 'Assinatura cancelada' });
  } catch (error: any) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Erro ao cancelar assinatura' },
      { status: 500 }
    );
  }
}
