import { getServerSession } from "next-auth";
import ChatInterface from "@/components/ChatInterface";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold">
            JA
          </div>
          <span className="font-semibold text-white">JobAgent</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <LoginButton />
      </header>

      {/* Content */}
      {session ? (
        <ChatInterface />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl">
            🎯
          </div>
          <h1 className="text-3xl font-bold text-white">
            Encontre sua vaga ideal com IA
          </h1>
          <p className="max-w-md text-gray-400">
            Faça login com o LinkedIn e deixe o JobAgent buscar vagas,
            adaptar seu currículo e preparar sua candidatura automaticamente.
          </p>
          <LoginButton large />
        </div>
      )}
    </main>
  );
}
