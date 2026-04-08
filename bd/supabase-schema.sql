-- ============================================================================
-- SYNC.IA - Schema PostgreSQL para Supabase
-- Modelo: Freemium vs. Pro + Gamificação + Monetização Day 1
-- ============================================================================

-- ── EXTENSÕES ──────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── ENUM: Subscription Status ──────────────────────────────────────
CREATE TYPE subscription_status AS ENUM (
  'inactive',      -- Nunca assinou (Free)
  'active',        -- Assinatura ativa (Pro)
  'expired',       -- Período expirou
  'canceled',      -- Usuário cancelou
  'suspended'      -- Pagamento falhado (retry)
);

-- ── ENUM: Resume Generation Model ─────────────────────────────────
CREATE TYPE ai_model AS ENUM (
  'gemini',        -- Google Gemini (free, onboarding)
  'claude'         -- Anthropic Claude 3.5 (pro, adaptação)
);

-- ── ENUM: Job Application Status ──────────────────────────────────
CREATE TYPE job_application_status AS ENUM (
  'applied',       -- Candidatura enviada
  'viewed',        -- Empresa visualizou
  'interview',     -- Entrevista agendada
  'rejected',      -- Rejeitado
  'accepted'       -- Aceito/Contratado
);

-- ── TABLE: profiles (extends auth.users) ───────────────────────────
-- Supabase cria auth.users automaticamente; esta tabela estende com dados nossos
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  
  -- IDENTIDADE
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  bio text,
  
  -- MONETIZAÇÃO (flags críticas)
  is_pro boolean DEFAULT false,
  subscription_status subscription_status DEFAULT 'inactive',
  subscription_id text UNIQUE, -- ID da subscrição no Stripe
  subscription_start_date timestamp with time zone,
  subscription_end_date timestamp with time zone,
  
  -- PAGAMENTO (metadata do Stripe)
  stripe_customer_id text UNIQUE, -- ID do cliente no Stripe
  stripe_payment_method text,
  stripe_last_payment_date timestamp with time zone,
  
  -- GAMIFICAÇÃO
  ssi_score int DEFAULT 0, -- Sync Score Index (0-100)
  level int DEFAULT 1,
  total_xp int DEFAULT 0,
  daily_mission_completed boolean DEFAULT false,
  last_mission_date date,
  
  -- METADATA
  auth_provider text, -- 'google' | 'linkedin' | 'email'
  onboarding_completed boolean DEFAULT false,
  onboarding_step int DEFAULT 0, -- 1: upload PDF, 2: preview, 3: confirm
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  last_login timestamp with time zone,
  
  -- INDICES
  CONSTRAINT email_not_empty CHECK (email IS NOT NULL AND email != ''),
  CONSTRAINT valid_level CHECK (level >= 1 AND level <= 100),
  CONSTRAINT valid_ssi CHECK (ssi_score >= 0 AND ssi_score <= 100)
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
-- ── TABLE: resumes (Currículo do usuário) ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.resumes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- METADADOS
  title text NOT NULL, -- "Versão Base" | "Dev Full Stack" | "Senior Backend"
  description text,
  file_name text NOT NULL, -- Nome original do PDF
  file_url text NOT NULL, -- URL no Supabase Storage
  file_size_bytes bigint, -- Tamanho do arquivo
  
  -- VERSÃO
  is_base_version boolean DEFAULT false, -- É a versão original?
  version_number int DEFAULT 1,
  
  -- IA QUE GEROU
  generated_by ai_model DEFAULT 'gemini',
  
  -- EXTRAÇÃO DE TEXTO (para análise)
  raw_text_extracted text, -- Texto extraído do PDF (por Gemini)
  extraction_completed boolean DEFAULT false,
  
  -- TIMESTAMPS
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  -- ÍNDICES
  CONSTRAINT title_not_empty CHECK (title IS NOT NULL AND title != ''),
  CONSTRAINT file_url_not_empty CHECK (file_url IS NOT NULL),
  CONSTRAINT valid_version CHECK (version_number >= 1)
);

CREATE INDEX idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX idx_resumes_is_base ON public.resumes(is_base_version);
CREATE TRIGGER resumes_updated_at BEFORE UPDATE ON public.resumes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── TABLE: job_applications (Histórico de candidaturas) ───────────
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  resume_id uuid REFERENCES public.resumes(id) ON DELETE SET NULL,
  
  -- JOB INFO (da Adzuna/JSearch)
  job_id text NOT NULL, -- ID único da vaga
  job_title text NOT NULL,
  job_company text NOT NULL,
  job_location text,
  job_url text,
  job_description text,
  job_source text, -- 'adzuna' | 'jsearch'
  job_posted_at timestamp with time zone,
  
  -- CANDIDATURA
  status job_application_status DEFAULT 'applied',
  adapted_resume_sent text, -- Versão adaptada do currículo enviada
  application_notes text, -- Anotações do usuário
  
  -- GAMIFICAÇÃO
  xp_earned int DEFAULT 10, -- XP pela candidatura
  
  -- TIMESTAMPS
  applied_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT valid_job_id CHECK (job_id IS NOT NULL AND job_id != '')
);

CREATE INDEX idx_job_apps_user_id ON public.job_applications(user_id);
CREATE INDEX idx_job_apps_status ON public.job_applications(status);
CREATE INDEX idx_job_apps_job_id ON public.job_applications(job_id);
CREATE TRIGGER job_applications_updated_at BEFORE UPDATE ON public.job_applications
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
-- ── TABLE: headhunters (CRM de Headhunters/Conectados) ────────────
CREATE TABLE IF NOT EXISTS public.headhunters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- INFORMAÇÕES
  name text NOT NULL,
  email text,
  linkedin_url text,
  company text,
  phone text,
  notes text,
  
  -- INTERAÇÃO
  contacted boolean DEFAULT false,
  contact_status text, -- 'pending' | 'replied' | 'meeting_scheduled' | 'rejected'
  last_contact_at timestamp with time zone,
  next_follow_up_at timestamp with time zone,
  
  -- GAMIFICAÇÃO
  trust_score int DEFAULT 0, -- 0-100
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT name_not_empty CHECK (name IS NOT NULL AND name != '')
);

CREATE INDEX idx_headhunters_user_id ON public.headhunters(user_id);
CREATE INDEX idx_headhunters_contacted ON public.headhunters(contacted);
CREATE TRIGGER headhunters_updated_at BEFORE UPDATE ON public.headhunters
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── TABLE: gamification_missions (Missões diárias) ─────────────────
CREATE TABLE IF NOT EXISTS public.gamification_missions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- MISSÃO
  mission_type text NOT NULL, -- 'search_jobs' | 'upload_resume' | 'contact_recruiter' | 'fill_profile'
  title text NOT NULL,
  description text,
  
  -- RECOMPENSA
  xp_reward int NOT NULL DEFAULT 10,
  
  -- STATUS
  completed boolean DEFAULT false,
  completed_at timestamp with time zone,
  
  -- TIMING
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone DEFAULT now() + interval '24 hours',
  
  CONSTRAINT mission_type_valid CHECK (mission_type IN ('search_jobs', 'upload_resume', 'contact_recruiter', 'fill_profile'))
);

CREATE INDEX idx_missions_user_id ON public.gamification_missions(user_id);
CREATE INDEX idx_missions_completed ON public.gamification_missions(completed);

-- ── TABLE: subscriptions_audit (Auditoria de pagamentos) ──────────
CREATE TABLE IF NOT EXISTS public.subscriptions_audit (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- PAGAMENTO
  mercado_pago_id text NOT NULL UNIQUE,
  event_type text NOT NULL, -- 'customer.subscription.created' | 'customer.subscription.updated' | 'invoice.payment_failed'
  payment_method text, -- 'card'
  amount_cents bigint, -- Valor em centavos (R$ 9.90 = 990)
  
  -- METADATA
  raw_response jsonb, -- Response completo do Stripe
  
  created_at timestamp with time zone DEFAULT now(),
  processed_at timestamp with time zone
);

CREATE INDEX idx_audit_user_id ON public.subscriptions_audit(user_id);
CREATE INDEX idx_audit_mp_id ON public.subscriptions_audit(mercado_pago_id);
-- ── TABLE: pricing_plans (Planos disponíveis) ──────────────────────────
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- PLANO
  name text NOT NULL UNIQUE, -- 'free' | 'pro'
  display_name text NOT NULL, -- "Gratuito" | "Profissional"
  description text,
  
  -- PREÇO
  price_cents bigint NOT NULL DEFAULT 0, -- Em centavos
  billing_period text DEFAULT 'monthly', -- 'monthly' | 'annual'
  currency text DEFAULT 'BRL',
  
  -- FEATURES (JSON array)
  features jsonb DEFAULT '[]'::jsonb,
  
  -- STATUS
  is_active boolean DEFAULT true,
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT valid_price CHECK (price_cents >= 0)
);

-- Insert default plans
INSERT INTO public.pricing_plans (name, display_name, description, price_cents, features)
VALUES
  ('free', 'Gratuito', 'Acesso básico ao Sync.IA', 0, '["Buscar vagas", "1 Versão de currículo", "Gemini para leitura de PDF", "Score SSI básico"]'::jsonb),
  ('pro', 'Profissional', 'Acesso completo + IA avançada', 2990, '["Vagas ilimitadas", "Versões de currículo ilimitadas", "Claude 3.5 Sonnet", "SSI Score avançado", "Hub de Headhunters", "Relatórios de performance"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- ── RLS (Row Level Security) ───────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.headhunters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions_audit ENABLE ROW LEVEL SECURITY;

-- Política: Usuário só vê seus próprios dados
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own resumes" ON public.resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own job applications" ON public.job_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job applications" ON public.job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own headhunters" ON public.headhunters
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own headhunters" ON public.headhunters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own missions" ON public.gamification_missions
  FOR SELECT USING (auth.uid() = user_id);

-- ── VIEWS úteis ────────────────────────────────────────────────────
-- View: Resumo do Usuário para Dashboard
CREATE OR REPLACE VIEW public.user_dashboard_summary AS
SELECT
  p.id,
  p.email,
  p.name,
  p.is_pro,
  p.subscription_status,
  p.ssi_score,
  p.level,
  p.total_xp,
  p.daily_mission_completed,
  COUNT(DISTINCT r.id)::int as resume_count,
  COUNT(DISTINCT ja.id)::int as total_applications,
  COUNT(DISTINCT CASE WHEN ja.status = 'applied' THEN ja.id END)::int as pending_applications,
  COUNT(DISTINCT h.id)::int as headhunters_count
FROM public.profiles p
LEFT JOIN public.resumes r ON p.id = r.user_id
LEFT JOIN public.job_applications ja ON p.id = ja.user_id
LEFT JOIN public.headhunters h ON p.id = h.user_id
GROUP BY p.id;

-- View: Aplicações recentes com dados do currículo
CREATE OR REPLACE VIEW public.recent_applications AS
SELECT
  ja.id,
  ja.user_id,
  ja.job_title,
  ja.job_company,
  ja.job_location,
  ja.status,
  ja.applied_at,
  r.title as resume_used,
  p.name as user_name
FROM public.job_applications ja
LEFT JOIN public.resumes r ON ja.resume_id = r.id
LEFT JOIN public.profiles p ON ja.user_id = p.id
ORDER BY ja.applied_at DESC;

-- ============================================================================
-- FIM DO SCHEMA
-- ============================================================================
