import { getServerSession } from "next-auth";
import LandingPage from "@/components/LandingPage";
import ChatInterface from "@/components/ChatInterface";
import LoginButton from "@/components/LoginButton";

const Home = async () => {
  const session = await getServerSession();

  if (!session) return <LandingPage />;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/8 bg-surface-default shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-xs font-bold text-white">
            JA
          </div>
          <span className="font-semibold text-white">JobAgent</span>
          <span className="text-[10px] text-brand-400 bg-brand-600/10 border border-brand-600/20 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <LoginButton />
      </header>
      <ChatInterface />
    </div>
  );
};

export default Home;
