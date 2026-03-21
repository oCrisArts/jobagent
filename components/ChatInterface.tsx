"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import JobCard from "./JobCard";

interface Job { id: string; title: string; company: string; location: string; description: string; url: string; logo?: string; remote: boolean; postedAt: string; }
interface Message { role: "user" | "assistant"; content: string; jobs?: Job[]; }

const SUGGESTIONS = ["UX Designer Sênior", "Product Designer Remoto", "UI Designer Pleno"];

export default function ChatInterface() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "";
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `Olá${firstName ? `, ${firstName}` : ""}! 👋 Sou o JobAgent. Me diga que tipo de vaga você está buscando!`,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(text?: string) {
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
  }

  async function adaptResume(job: Job) {
    if (!resume) { setSelectedJob(job); setResumeModalOpen(true); return; }
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
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 65px)" }}>
      <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 3, display: "flex", flexDirection: "column", gap: 2, maxWidth: 768, width: "100%", mx: "auto" }}>
        {messages.map((msg, i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 1 }}>
            {msg.role === "assistant" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ width: 26, height: 26, bgcolor: "primary.main", fontSize: 10, fontWeight: 700, borderRadius: 1.5 }}>JA</Avatar>
                <Typography variant="caption" color="text.disabled">JobAgent</Typography>
              </Box>
            )}
            <Box sx={{ maxWidth: "85%", bgcolor: msg.role === "user" ? "primary.main" : "background.paper", color: msg.role === "user" ? "white" : "text.primary", borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", px: 2, py: 1.5, border: msg.role === "assistant" ? "1px solid" : "none", borderColor: "divider" }}>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{msg.content}</Typography>
            </Box>
            {msg.jobs && msg.jobs.length > 0 && (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, width: "100%", maxWidth: 680 }}>
                {msg.jobs.map(job => <JobCard key={job.id} job={job} onAdaptResume={adaptResume} />)}
              </Box>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar sx={{ width: 26, height: 26, bgcolor: "primary.main", fontSize: 10, fontWeight: 700, borderRadius: 1.5 }}>JA</Avatar>
            <Box sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: "4px 16px 16px 16px", px: 2, py: 1.5 }}>
              <CircularProgress size={16} />
            </Box>
          </Box>
        )}
        {messages.length === 1 && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {SUGGESTIONS.map(s => <Chip key={s} label={s} variant="outlined" color="primary" size="small" onClick={() => sendMessage(s)} sx={{ cursor: "pointer" }} />)}
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: 2, py: 2, bgcolor: "background.paper" }}>
        <Box sx={{ maxWidth: 768, mx: "auto", display: "flex", gap: 1, alignItems: "flex-end" }}>
          <IconButton size="small" onClick={() => setResumeModalOpen(true)} title="Adicionar currículo" sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <AttachFileIcon fontSize="small" />
          </IconButton>
          <TextField fullWidth multiline maxRows={4} size="small" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ex: Buscar vagas de UX Designer em São Paulo..."
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
          <IconButton color="primary" onClick={() => sendMessage()} disabled={loading || !input.trim()} sx={{ bgcolor: "primary.main", color: "white", borderRadius: 2, "&:hover": { bgcolor: "primary.dark" }, "&.Mui-disabled": { bgcolor: "action.disabledBackground" } }}>
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={resumeModalOpen} onClose={() => setResumeModalOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ pb: 0.5 }}>Seu currículo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Cole o texto do seu currículo para que eu possa adaptá-lo às vagas.</Typography>
          <TextField fullWidth multiline rows={10} value={resume} onChange={e => setResume(e.target.value)} placeholder="Cole seu currículo aqui..." variant="outlined" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button variant="outlined" onClick={() => setResumeModalOpen(false)} sx={{ borderRadius: 2, textTransform: "none" }}>Cancelar</Button>
          <Button variant="contained" onClick={() => { setResumeModalOpen(false); if (selectedJob) { adaptResume(selectedJob); setSelectedJob(null); } }} sx={{ borderRadius: 2, textTransform: "none" }}>
            Salvar{selectedJob ? " e adaptar" : ""}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
