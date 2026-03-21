"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import JobCard from "./JobCard";

interface Job {
  id: string; title: string; company: string; location: string;
  description: string; url: string; logo?: string; remote: boolean; postedAt: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  jobs?: Job[];
}

export default function ChatInterface() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "";
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `Olá${firstName ? `, ${firstName}` : ""}! 👋 Sou o JobAgent. Me diga que tipo de vaga você está buscando e eu encontro as melhores oportunidades para você!`,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const agentRes = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userProfile: session?.user }),
      });
      const agentData = await agentRes.json();

      let jobs: Job[] = [];
      if (agentData.action === "search_jobs" && agentData.params) {
        const jobsRes = await fetch(
          `/api/jobs?query=${encodeURIComponent(agentData.params.query)}&location=${encodeURIComponent(agentData.params.location || "Brazil")}`
        );
        const jobsData = await jobsRes.json();
        jobs = jobsData.jobs || [];
      }

      setMessages([...newMessages, { role: "assistant", content: agentData.message, jobs }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." }]);
    } finally {
      setLoading(false);
    }
  }

  async function adaptResume(job: Job) {
    if (!resume) { setSelectedJob(job); setShowResumeModal(true); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `✅ Currículo adaptado para **${job.title}** na **${job.company}**!\n\n${data.adaptedResume}`,
      }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Erro ao adaptar currículo." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-65px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${msg.role === "user" ? "order-1" : "order-2"}`}>
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs font-bold">JA</div>
                  <span className="text-xs text-gray-500">JobAgent</span>
                </div>
              )}
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-gray-800 text-gray-200 rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
              {msg.jobs && msg.jobs.length > 0 && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {msg.jobs.map(job => (
                    <JobCard key={job.id} job={job} onAdaptResume={adaptResume} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 px-4 py-4 bg-gray-950">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <button
            onClick={() => setShowResumeModal(true)}
            className="p-2.5 text-gray-500 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-colors flex-shrink-0"
            title="Adicionar currículo"
          >
            📄
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ex: Buscar vagas de UX Designer em São Paulo..."
            rows={1}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-white mb-1">Seu currículo</h2>
            <p className="text-sm text-gray-400 mb-4">Cole o texto do seu currículo para que eu possa adaptá-lo às vagas.</p>
            <textarea
              value={resume}
              onChange={e => setResume(e.target.value)}
              placeholder="Cole seu currículo aqui..."
              rows={10}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowResumeModal(false)} className="flex-1 py-2.5 border border-gray-600 text-gray-300 rounded-xl text-sm hover:border-gray-400 transition-colors">Cancelar</button>
              <button
                onClick={() => { setShowResumeModal(false); if (selectedJob) { adaptResume(selectedJob); setSelectedJob(null); } }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Salvar{selectedJob ? " e adaptar" : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
