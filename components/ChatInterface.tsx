"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import JobCard from "./JobCard";

interface Job { id: string; title: string; company: string; location: string; description: string; url: string; logo?: string; remote: boolean; postedAt: string; }
interface Message { role: "user" | "assistant"; content: string; jobs?: Job[]; }

const SUGGESTIONS = ["UX Designer Sênior", "Product Designer Remoto", "UI Designer Pleno"];

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const AttachIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

const ChatInterface = () => {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "";
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `Olá${firstName ? `, ${firstName}` : ""}! 👋 Sou o JobAgent. Me diga que tipo de vaga você está buscando!`,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const userMsg: Message = { role: "user", content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const agentRes = await fetch("/api/agent", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userProfile: session?.user }),
      });
      const agentData = await agentRes.json();
      let jobs: Job[] = [];
      if (agentData.action === "search_jobs" && agentData.params) {
        const jobsRes = await fetch(`/api/jobs?query=${encodeURIComponent(agentData.params.query)}&location=${encodeURIComponent(agentData.params.location || "Brazil")}`);
        const jobsData = await jobsRes.json();
        jobs = jobsData.jobs || [];
      }
      setMessages([...newMessages, { role: "assistant", content: agentData.message, jobs }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." }]);
    } finally { setLoading(false); }
  };

  const adaptResume = async (job: Job) => {
    if (!resume) { setSelectedJob(job); setModalOpen(true); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: `✅ Currículo adaptado para **${job.title}** na **${job.company}**!\n\n${data.adaptedResume}` }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Erro ao adaptar currículo." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 max-w-3xl w-full mx-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1`}>
            {msg.role === "assistant" && (
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white">JA</div>
                <span className="text-xs text-white/30">JobAgent</span>
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-brand-600 text-white rounded-tr-sm" : "bg-surface-card border border-white/8 text-white/80 rounded-tl-sm"}`}>
              {msg.content}
            </div>
            {msg.jobs && msg.jobs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 w-full max-w-2xl">
                {msg.jobs.map(job => <JobCard key={job.id} job={job} onAdaptResume={adaptResume} />)}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white">JA</div>
            <div className="bg-surface-card border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
              {[0, 150, 300].map(d => <span key={d} className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
            </div>
          </div>
        )}
        {messages.length === 1 && (
          <div className="flex gap-2 flex-wrap">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)} className="text-xs border border-brand-600/40 hover:border-brand-600 text-brand-400 hover:text-brand-300 px-3 py-1.5 rounded-full transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/8 px-4 py-3 bg-surface-default">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <button onClick={() => setModalOpen(true)} className="p-2.5 border border-white/10 hover:border-white/30 text-white/40 hover:text-white rounded-xl transition-colors shrink-0">
            <AttachIcon />
          </button>
          <textarea
            value={input} onChange={e => setInput(e.target.value)} rows={1}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ex: Buscar vagas de UX Designer em São Paulo..."
            className="flex-1 bg-surface-card border border-white/8 focus:border-brand-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 resize-none outline-none transition-colors"
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
            className="p-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl transition-colors shrink-0">
            <SendIcon />
          </button>
        </div>
      </div>

      {/* Resume Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface-card border border-white/10 rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-white mb-1">Seu currículo</h2>
            <p className="text-sm text-white/40 mb-4">Cole o texto do seu currículo para adaptar às vagas.</p>
            <textarea value={resume} onChange={e => setResume(e.target.value)} rows={10} placeholder="Cole seu currículo aqui..."
              className="w-full bg-surface-default border border-white/8 focus:border-brand-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 resize-none outline-none mb-4 transition-colors" />
            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-white/10 hover:border-white/30 text-white/60 hover:text-white rounded-xl text-sm transition-colors">Cancelar</button>
              <button onClick={() => { setModalOpen(false); if (selectedJob) { adaptResume(selectedJob); setSelectedJob(null); } }}
                className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-medium transition-colors">
                Salvar{selectedJob ? " e adaptar" : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
