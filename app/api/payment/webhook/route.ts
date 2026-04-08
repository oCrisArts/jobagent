// app/api/payment/webhook/route.ts
// Webhook do Stripe para confirmar/atualizar pagamentos

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServerComponentClient({ cookies });

  try {
    switch (event.type) {
      // ── PAGAMENTO APROVADO ─────────────────────────────────────────
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const status = subscription.status;

        // Buscar usuário pelo customer ID
        const userRes = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!userRes.data) break;

        const userId = userRes.data.id;
        const subscriptionStatus = status === 'active' ? 'active' : 'inactive';

        // Atualizar perfil
        await supabase
          .from('profiles')
          .update({
            is_pro: subscriptionStatus === 'active',
            subscription_status: subscriptionStatus,
            subscription_id: subscription.id,
            subscription_start_date: new Date(subscription.current_period_start * 1000),
            subscription_end_date: new Date(subscription.current_period_end * 1000),
          })
          .eq('id', userId);

        // Registrar na auditoria
        await supabase.from('subscriptions_audit').insert({
          user_id: userId,
          mercado_pago_id: subscription.id,
          event_type: event.type,
          payment_method: subscription.payment_settings?.payment_method_types?.[0] || 'card',
          amount_cents: subscription.items.data[0]?.price?.unit_amount || 0,
          raw_response: subscription,
          processed_at: new Date().toISOString(),
        });

        break;
      }

      // ── ASSINATURA CANCELADA ───────────────────────────────────────
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const userRes = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!userRes.data) break;

        const userId = userRes.data.id;

        await supabase
          .from('profiles')
          .update({
            is_pro: false,
            subscription_status: 'canceled',
          })
          .eq('id', userId);

        break;
      }

      // ── PAGAMENTO FALHOU ──────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const userRes = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!userRes.data) break;

        const userId = userRes.data.id;

        await supabase
          .from('profiles')
          .update({
            subscription_status: 'suspended',
          })
          .eq('id', userId);

        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
