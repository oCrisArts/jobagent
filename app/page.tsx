import { getServerSession } from "next-auth";
import ChatInterface from "@/components/ChatInterface";
import LandingPage from "@/components/LandingPage";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const session = await getServerSession();

  if (!session) return <LandingPage />;

  return (
    <div className="flex flex-col h-screen bg-surface-base">
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-surface-default sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-xs font-bold text-white">JA</div>
          <span className="font-semibold text-white">JobAgent</span>
          <span className="text-[10px] bg-white/5 border border-white/10 text-white/40 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <LoginButton />
      </header>
      <ChatInterface />
    </div>
  );
}
