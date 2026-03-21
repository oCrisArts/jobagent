"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const LinkedInSVG = () => (
  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface LoginButtonProps { large?: boolean; }

const LoginButton = ({ large = false }: LoginButtonProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-surface-card animate-pulse" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <img src={session.user.image} alt={session.user.name || ""} className="w-8 h-8 rounded-full border-2 border-white/20" />
        )}
        <span className="hidden sm:block text-sm text-white/60">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5 transition-colors"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("linkedin")}
      className={`flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium rounded-lg transition-colors ${large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"}`}
    >
      <LinkedInSVG />
      {large ? "Entrar com LinkedIn" : "LinkedIn"}
    </button>
  );
};

export default LoginButton;
