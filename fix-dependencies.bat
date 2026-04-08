@echo off
REM Script para fazer push das dependências no GitHub

echo.
echo ╔═════════════════════════════════════════════╗
echo ║  Sync.IA: Atualizar dependências no GitHub  ║
echo ╚═════════════════════════════════════════════╝
echo.

cd /d "D:\xampp\htdocs\jobagent"

echo 📊 Status do Git:
git status

echo.
echo 📋 Adicionando package.json atualizado...
git add package.json package-lock.json

echo.
echo ✍️  Fazendo commit...
git commit -m "fix: add missing @supabase/ssr and next-intl dependencies

- Added @supabase/ssr@0.4.0 (required for middleware.ts)
- Added next-intl@3.15.0 (required for i18n invisível)
- These fix the Vercel build error"

echo.
echo 🚀 Fazendo push para origin/main...
git push origin main

echo.
echo ╔═════════════════════════════════════════════╗
echo ║  ✅ DONE!                                   ║
echo ║                                              ║
echo ║  Vercel vai redeploy automaticamente        ║
echo ║  em ~2-5 minutos                            ║
echo ╚═════════════════════════════════════════════╝
echo.

pause
