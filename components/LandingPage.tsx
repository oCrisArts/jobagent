"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import AuthModal from "./AuthModal";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

const CheckIcon = () => (
  <svg className="w-5 h-5 text-brand-400 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RadarIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M12 2a10 10 0 0 1 7.07 17.07M4.93 4.93A10 10 0 0 0 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 6a6 6 0 0 1 4.24 10.24M7.76 7.76A6 6 0 0 0 12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
    <div className="bg-[#0A0A0F] text-white font-sans overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/8 bg-[#0A0A0F]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-xs font-bold shadow-glow-sm">JA</div>
          <span className="font-semibold text-base tracking-tight">JobAgent</span>
        </div>
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
          onClick={openModal}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/></svg>
          Login
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center px-6 md:px-16 py-24 overflow-hidden">
        {/* Anime ink BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(124,58,237,0.13)_0%,transparent_70%)]" />
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10"
            style={{ background: "url(\"data:image/svg+xml,%3Csvg width='600' height='800' viewBox='0 0 600 800' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='400' cy='300' rx='200' ry='280' stroke='%237C3AED' stroke-width='1.5' stroke-dasharray='6 4'/%3E%3Cellipse cx='350' cy='450' rx='150' ry='200' stroke='%234F46E5' stroke-width='1' stroke-dasharray='4 6'/%3E%3Cpath d='M200 100 Q 400 200 350 500 Q 300 700 500 750' stroke='%23A78BFA' stroke-width='1' stroke-dasharray='3 5' fill='none'/%3E%3C/svg%3E\") no-repeat center/cover" }}
          />
        </div>

        <div className="relative max-w-2xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/30 text-brand-400 text-xs font-medium mb-6">
              🔥 Nova Atualização — IA Otimizada para ATS
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Pare de panfletar currículos.{" "}
            <span className="bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">
              Hackeie o processo seletivo com IA.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-[#94A3B8] text-lg leading-relaxed mb-8 max-w-xl">
            O JobAgent busca vagas, calcula o seu Match e reescreve o seu currículo com as palavras exatas que os recrutadores buscam.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button onClick={openModal}
              className="flex items-center gap-2 px-7 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-orange-500 to-brand-600 hover:opacity-90 transition-all shadow-glow text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 4.8 5.3.8-3.85 3.75.9 5.25L12 14.1l-4.75 2.5.9-5.25L4.3 7.6l5.3-.8z"/></svg>
              Começar de Graça (3 Créditos)
            </button>
            <span className="text-xs text-white/30">Acesso instantâneo via LinkedIn</span>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="px-6 md:px-12 py-10 border-y border-white/6">
        <p className="text-center text-xs text-white/30 mb-6 tracking-widest uppercase">Compatível com os sistemas ATS das maiores plataformas</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {["Gupy", "Workday", "LinkedIn", "Greenhouse"].map(name => (
            <div key={name} className="px-5 py-2.5 rounded-lg bg-white/4 border border-white/6 text-white/25 text-sm font-medium w-28 text-center">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── BENTO CARDS ── */}
      <section className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-14">
          Um funil de contratação em piloto automático.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 — wide */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="md:col-span-1 bg-[#1A1D27] border border-white/8 rounded-2xl p-6 flex flex-col gap-4"
            style={{ aspectRatio: "9/16", minHeight: 320 }}>
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-brand-400"><SearchIcon /></div>
            <div>
              <h3 className="font-bold text-lg mb-2">Busca Direta</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Encontre vagas do LinkedIn e outros portais diretamente aqui, sem distrações.</p>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-2">
              {["LinkedIn", "Indeed", "Gupy", "Catho"].map(p => (
                <div key={p} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white/40 text-center">{p}</div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            className="bg-[#1A1D27] border border-white/8 rounded-2xl p-6 flex flex-col gap-4"
            style={{ aspectRatio: "9/16", minHeight: 320 }}>
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400"><RadarIcon /></div>
            <div>
              <h3 className="font-bold text-lg mb-2">Raio-X da Vaga</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Descubra o seu Score de Compatibilidade antes de aplicar.</p>
            </div>
            <div className="mt-auto flex flex-col items-center justify-center flex-1">
              <div className="text-5xl font-black text-blue-400">87<span className="text-2xl">%</span></div>
              <div className="text-xs text-white/30 mt-1">Match estimado</div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
            className="bg-[#1A1D27] border border-white/8 rounded-2xl p-6 flex flex-col gap-4"
            style={{ aspectRatio: "9/16", minHeight: 320 }}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400"><DocumentIcon /></div>
            <div>
              <h3 className="font-bold text-lg mb-2">IA Copywriter</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">O seu currículo reescrito focando exatamente nos requisitos da vaga.</p>
            </div>
            <div className="mt-auto space-y-2">
              {["Palavras-chave ATS", "Tom profissional", "PDF gerado"].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-white/50">
                  <span className="text-emerald-400">✓</span> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SPLIT SECTION ── */}
      <section className="px-6 md:px-16 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="text-xs font-bold tracking-widest text-brand-400 uppercase mb-4 block">IA Copywriter</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
            Descobrindo a narrativa oculta do seu perfil
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-8">
            A IA não inventa mentiras, ela apenas traduz a sua experiência real para a linguagem exata que o sistema de recrutamento (ATS) da empresa foi programado para aprovar.
          </p>
          <button onClick={openModal}
            className="px-6 py-3 rounded-xl bg-brand-gradient text-sm font-semibold text-white hover:opacity-90 transition-all shadow-glow-sm">
            Adaptar meu Currículo
          </button>
        </motion.div>

        {/* Anime ink placeholder */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
          className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#1A1D27] min-h-64 flex items-center justify-center p-8">
          <div className="absolute inset-0 opacity-10"
            style={{ background: "url(\"data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='40' y='30' width='320' height='240' rx='8' stroke='%23A78BFA' stroke-width='1.5' stroke-dasharray='6 4'/%3E%3Cline x1='60' y1='70' x2='200' y2='70' stroke='%23A78BFA' stroke-width='1.5'/%3E%3Cline x1='60' y1='90' x2='340' y2='90' stroke='%237C3AED' stroke-width='0.8' stroke-dasharray='4 4'/%3E%3Cline x1='60' y1='110' x2='280' y2='110' stroke='%237C3AED' stroke-width='0.8' stroke-dasharray='4 4'/%3E%3Cline x1='60' y1='130' x2='310' y2='130' stroke='%237C3AED' stroke-width='0.8' stroke-dasharray='4 4'/%3E%3C/svg%3E\") no-repeat center/cover" }}
          />
          <div className="relative grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 rounded-xl p-4 border border-red-500/20">
              <div className="text-xs text-red-400 font-bold mb-2 uppercase tracking-wide">Antes</div>
              <div className="space-y-1.5">
                {["Trabalhei com UX", "Fiz wireframes", "Usei o Figma"].map(t => (
                  <div key={t} className="h-2.5 bg-white/10 rounded-full text-[10px] flex items-center px-2 text-white/20">{t}</div>
                ))}
              </div>
            </div>
            <div className="bg-brand-600/10 rounded-xl p-4 border border-brand-600/30">
              <div className="text-xs text-brand-400 font-bold mb-2 uppercase tracking-wide">Depois ✨</div>
              <div className="space-y-1.5">
                {["UX Research & Strategy", "Design Systems (Figma)", "ATS-Optimized copy"].map(t => (
                  <div key={t} className="h-2.5 bg-brand-600/20 rounded-full text-[10px] flex items-center px-2 text-brand-300">{t}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── METRICS ── */}
      <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12">
          Velocidade e Precisão Absoluta
        </motion.h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "+10", label: "Portais", sub: "Busca centralizada" },
            { value: "6s", label: "Segundos", sub: "Tempo médio que o recrutador lê um CV" },
            { value: "90%+", label: "ATS", sub: "Taxa de compatibilidade" },
            { value: "1", label: "Clique", sub: "Para gerar o PDF final" },
          ].map((m, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}
              className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-1">
              <span className="text-4xl md:text-5xl font-black text-white">{m.value}</span>
              <span className="text-brand-400 font-semibold text-sm">{m.label}</span>
              <span className="text-[#94A3B8] text-xs">{m.sub}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="relative px-6 md:px-12 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_70%)]" />
        </div>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12 relative">
          Um investimento que se paga no primeiro salário.
        </motion.h2>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 items-stretch relative">
          {/* Free */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="bg-[#1A1D27] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-sm font-semibold text-white/50 uppercase tracking-widest">Gratuito</div>
            <div className="text-4xl font-black">R$ 0</div>
            <div className="space-y-3 flex-1">
              {["3 créditos de boas-vindas", "Busca de vagas", "Score de Match"].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/50"><CheckIcon />{f}</div>
              ))}
            </div>
            <button onClick={openModal} className="w-full py-3 rounded-xl border border-white/10 text-sm font-semibold text-white/60 hover:bg-white/5 transition-all">
              Começar Grátis
            </button>
          </motion.div>

          {/* Pro */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            className="bg-[#1A1D27] border-2 border-brand-600/60 rounded-2xl p-6 flex flex-col gap-4 relative shadow-glow">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-gradient rounded-full text-xs font-bold text-white whitespace-nowrap">
              OFERTA DE LANÇAMENTO
            </span>
            <div className="text-sm font-semibold text-brand-400 uppercase tracking-widest">Plano Pro</div>
            <div>
              <span className="text-sm text-white/30 line-through">R$ 97/mês</span>
              <div className="text-5xl font-black text-white">R$ 47<span className="text-xl font-normal text-white/40">/mês</span></div>
            </div>
            <div className="space-y-3 flex-1">
              {["Buscas ilimitadas", "Adaptações IA ilimitadas", "Download de PDF premium", "Histórico salvo"].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white"><CheckIcon />{f}</div>
              ))}
            </div>
            <button onClick={openModal}
              className="w-full py-3.5 rounded-xl bg-brand-gradient text-sm font-bold text-white hover:opacity-90 transition-all shadow-glow-sm">
              Assinar Plano Pro
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-16 px-6 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-2xl font-bold mb-6">Sua próxima oportunidade está esperando.</h3>
          <button onClick={openModal}
            className="px-8 py-4 rounded-xl bg-brand-gradient text-sm font-bold text-white hover:opacity-90 transition-all shadow-glow mb-10">
            Começar de Graça
          </button>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-brand-gradient flex items-center justify-center text-[10px] font-bold">JA</div>
            <span className="text-sm font-semibold">JobAgent</span>
          </div>
          <p className="text-xs text-white/20">© 2026 JobAgent. Todos os direitos reservados.</p>
        </motion.div>
      </footer>

    </div>
    <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default LandingPage;
