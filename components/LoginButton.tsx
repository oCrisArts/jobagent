"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "./AuthModal";

const LoginButton = ({ large = false }: { large?: boolean }) => {
  const { data: session, status } = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  if (status === "loading") return (
    <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
  );

  if (session) return (
    <div className="flex items-center gap-3">
      {session.user?.image && (
        <img src={session.user.image} alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
      )}
      <span className="hidden sm:block text-sm text-white/60">{session.user?.name}</span>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
      >
        Sair
      </button>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={`flex items-center gap-2 bg-brand-gradient hover:opacity-90 text-white font-medium rounded-lg transition-all shadow-glow-sm ${large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"}`}
      >
        Entrar
      </button>
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default LoginButton;
