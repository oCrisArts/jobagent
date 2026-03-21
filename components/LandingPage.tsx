"use client";
import { useState } from "react";
import Link from "next/link";

const features = [
  { icon: "📄", color: "text-violet-400", title: "CV adaptado para cada vaga", items: ["Currículo reescrito com palavras-chave da vaga", "Tom e formato alinhados ao que o recrutador busca", "Destaque automático das suas melhores experiências"] },
  { icon: "🔍", color: "text-emerald-400", title: "Busca inteligente de vagas", items: ["Vagas do LinkedIn, Indeed, Glassdoor em um lugar", "Filtro por nível, local e modalidade", "Score de compatibilidade com seu perfil"] },
  { icon: "⚡", color: "text-yellow-400", title: "Decisões mais rápidas", items: ["Resumo da vaga em segundos", "Pontos fortes e fracos da sua candidatura", "Priorize onde vale mais a pena aplicar"] },
  { icon: "🎤", color: "text-pink-400", title: "Preparação para entrevistas", items: ["Perguntas prováveis baseadas na vaga", "Respostas modelo com sua experiência real", "Dicas específicas para cada empresa"] },
  { icon: "💼", color: "text-blue-400", title: "LinkedIn otimizado", items: ["Sugestões de headline e about", "Palavras-chave que recrutadores buscam", "Alinhamento entre CV e perfil público"] },
  { icon: "📑", color: "text-orange-400", title: "PDF profissional gerado", items: ["Layout limpo e compatível com ATS", "Download em segundos", "Histórico de versões por vaga"] },
];

const faqs = [
  { q: "Como funciona o agente de IA?", a: "Você faz login com o LinkedIn, descreve que tipo de vaga quer e o agente busca as melhores oportunidades, analisa o match com seu perfil e adapta seu currículo automaticamente." },
  { q: "Preciso ter experiência em UX?", a: "Não. O JobAgent funciona para qualquer área e nível de experiência. Quanto mais informações você fornecer sobre sua trajetória, melhor será a adaptação." },
  { q: "Por quanto tempo tenho acesso?", a: "O plano Pro dá acesso vitalício com atualizações incluídas. Pague uma vez e use sempre." },
  { q: "Funciona para quem está migrando de área?", a: "Sim! O agente é especialmente útil para transições de carreira — ele identifica habilidades transferíveis e as apresenta da forma mais relevante para a nova área." },
  { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento você recebe o link de acesso por e-mail." },
  { q: "Posso usar no celular?", a: "Sim, o JobAgent é 100% responsivo e funciona em qualquer dispositivo." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A0A0F", color: "#fff", fontFamily: "'Google Sans', Roboto, sans-serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>JA</div>
          <span style={{ fontWeight: 600, fontSize: 16 }}>JobAgent</span>
        </div>
        <Link href="/" style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
          Começar agora
        </Link>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#A78BFA", marginBottom: 28 }}>
          ✦ Powered by IA
        </div>
        <h1 style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 700, lineHeight: 1.15, maxWidth: 700, margin: "0 auto 20px", letterSpacing: "-1px" }}>
          Encontre sua vaga ideal<br />com <span style={{ background: "linear-gradient(90deg,#A78BFA,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>estratégia, clareza e velocidade</span>
        </h1>
        <p style={{ fontSize: 17, color: "#94A3B8", maxWidth: 520, margin: "0 auto 16px", lineHeight: 1.7 }}>
          Um agente de IA que busca vagas, adapta seu currículo automaticamente e prepara você para cada candidatura — em segundos.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 36, fontSize: 14, color: "#FBBF24" }}>
          {"★★★★★"} <span style={{ color: "#94A3B8", marginLeft: 6 }}>5/5 — primeiros usuários</span>
        </div>
        <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", padding: "16px 36px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", boxShadow: "0 0 40px rgba(124,58,237,0.35)", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <TrackChangesIcon sx={{ fontSize: 20 }} /> Começar gratuitamente
        </Link>
        <p style={{ marginTop: 14, fontSize: 12, color: "#475569" }}>Faça login com o LinkedIn — sem cadastro extra</p>
      </section>

      {/* PARA QUEM É */}
      <section style={{ padding: "80px 24px", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Para <span style={{ color: "#A78BFA" }}>quem é</span></h2>
        <p style={{ textAlign: "center", color: "#64748B", marginBottom: 40, fontSize: 15 }}>Essa solução é para você que:</p>
        {[
          "Quer entrar ou se reposicionar no mercado",
          "Sente que seu CV não reflete seu real valor profissional",
          "Perde tempo organizando processos e sintetizando informações",
          "Quer tomar decisões mais rápidas sem perder qualidade",
          "Precisa de apoio prático no dia a dia, não apenas teoria",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#A78BFA", flexShrink: 0 }}>✓</div>
            <span style={{ fontSize: 15, color: "#CBD5E1" }}>{item}</span>
          </div>
        ))}
      </section>

      {/* O QUE VOCÊ VAI CONSEGUIR */}
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>O que você vai <span style={{ color: "#A78BFA" }}>conseguir</span></h2>
        <p style={{ textAlign: "center", color: "#64748B", marginBottom: 48, fontSize: 15 }}>Tudo que você precisa para acelerar sua busca por emprego</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px" }}>
              <div style={{ marginBottom: 12 }} className="text-2xl">{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#F1F5F9" }}>{f.title}</div>
              {f.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#7C3AED", marginTop: 2, fontSize: 12 }}>→</span>
                  <span style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ACESSO E BENEFÍCIOS */}
      <section style={{ padding: "60px 24px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "32px", textAlign: "center", background: "rgba(124,58,237,0.04)" }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Acesso e <span style={{ color: "#A78BFA" }}>Benefícios</span></h3>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {[{ icon: "♾️", label: "Acesso vitalício" }, { icon: "🔄", label: "Base atualizada diariamente" }, { icon: "⚡", label: "Uso contínuo ilimitado" }].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-lg">{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 24px", maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5", borderRadius: 20, padding: "6px 14px", fontSize: 12, marginBottom: 20 }}>
          ⏰ Oferta por tempo limitado
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>IA • JobAgent</h2>
        <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>Seu agente de IA para potencializar sua busca de emprego</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", marginBottom: 28 }}>
          {["Agente de IA personalizado", "Plano de ação completo", "Currículo otimizado", "Estratégia de portfólio", "Preparação para entrevistas", "Posts prontos para LinkedIn"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#94A3B8" }}>
              <span style={{ color: "#A78BFA" }}>✓</span> {item}
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 16, color: "#475569", textDecoration: "line-through" }}>R$ 297</span>
        </div>
        <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 4 }}>
          R$ <span style={{ color: "#A78BFA" }}>57</span>
        </div>
        <p style={{ fontSize: 12, color: "#7C3AED", marginBottom: 28 }}>🔥 60% off para fechar agora essa tela</p>
        <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", padding: "16px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", marginBottom: 12 }}>
          <TrackChangesIcon sx={{ fontSize: 20 }} /> Garantir Minha Vaga
        </Link>
        <p style={{ fontSize: 12, color: "#475569", marginBottom: 4 }}>Acesso imediato após a confirmação do pagamento</p>
        <p style={{ fontSize: 12, color: "#475569" }}>🛡 7 dias de garantia</p>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px", maxWidth: 680, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 48 }}>Perguntas <span style={{ color: "#A78BFA" }}>Frequentes</span></h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 4 }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", background: "none", border: "none", color: "#F1F5F9", fontSize: 15, fontWeight: 500, cursor: "pointer", textAlign: "left", gap: 16 }}>
              {faq.q}
              <span style={{ fontSize: 20, color: "#7C3AED", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {openFaq === i && <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7, paddingBottom: 18, margin: 0 }}>{faq.a}</p>}
          </div>
        ))}
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Pare de adivinhar o que o mercado quer</h2>
        <p style={{ color: "#64748B", fontSize: 15, marginBottom: 32 }}>Use um agente de IA para evoluir sua carreira com clareza e estratégia</p>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", padding: "16px 36px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
          <RocketLaunchIcon sx={{ fontSize: 20 }} /> Começar Agora por R$ 57
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center", color: "#334155", fontSize: 13 }}>
        <p>Feito com ♥ por Cristiano Acosta · © 2025 JobAgent · Todos os direitos reservados</p>
      </footer>

    </div>
  );
}
