-- 1. LIMPEZA TOTAL (Reset)
DROP TABLE IF EXISTS public.resumes CASCADE;
DROP TABLE IF EXISTS public.saved_jobs CASCADE;
DROP TABLE IF EXISTS public.sessions CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.verification_tokens CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA ÚNICA DE UTILIZADORES (NextAuth + SaaS)
CREATE TABLE public.users (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text, 
  email text UNIQUE, 
  "emailVerified" timestamp with time zone, 
  image text,
  password text,
  headline text, 
  bio text, 
  location text, 
  website_url text,
  ssi_score integer DEFAULT 0, 
  ats_score integer DEFAULT 0,
  plan_type text DEFAULT 'free', 
  resumes_count integer DEFAULT 0,
  "createdAt" timestamp with time zone DEFAULT now()
);

-- 3. TABELAS OBRIGATÓRIAS DO NEXTAUTH
CREATE TABLE public.accounts (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL, 
  provider text NOT NULL, 
  "providerAccountId" text NOT NULL,
  refresh_token text, 
  access_token text, 
  expires_at bigint, 
  token_type text, 
  scope text, 
  id_token text, 
  session_state text,
  UNIQUE(provider, "providerAccountId")
);

CREATE TABLE public.sessions (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  "sessionToken" text NOT NULL UNIQUE, 
  "userId" uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  expires timestamp with time zone NOT NULL
);

CREATE TABLE public.verification_tokens (
  identifier text NOT NULL, 
  token text NOT NULL, 
  expires timestamp with time zone NOT NULL, 
  PRIMARY KEY (identifier, token)
);

-- 4. TABELA DE CURRÍCULOS (Apontando para public.users)
CREATE TABLE public.resumes (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL, 
  content jsonb NOT NULL, 
  template_id text DEFAULT 'modern', 
  created_at timestamp with time zone DEFAULT now()
);