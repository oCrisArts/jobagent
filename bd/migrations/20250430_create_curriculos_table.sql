-- Tabela de currículos dos usuários
CREATE TABLE IF NOT EXISTS curriculos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    extracted_text TEXT NOT NULL,
    is_base BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_curriculos_user_id ON curriculos(user_id);
CREATE INDEX IF NOT EXISTS idx_curriculos_is_base ON curriculos(is_base);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_curriculos_updated_at ON curriculos;
CREATE TRIGGER update_curriculos_updated_at
    BEFORE UPDATE ON curriculos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE curriculos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
DROP POLICY IF EXISTS "Users can view own curriculos" ON curriculos;
CREATE POLICY "Users can view own curriculos"
    ON curriculos FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own curriculos" ON curriculos;
CREATE POLICY "Users can insert own curriculos"
    ON curriculos FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own curriculos" ON curriculos;
CREATE POLICY "Users can update own curriculos"
    ON curriculos FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own curriculos" ON curriculos;
CREATE POLICY "Users can delete own curriculos"
    ON curriculos FOR DELETE
    USING (auth.uid() = user_id);
