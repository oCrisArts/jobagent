@echo off
REM Script para fazer Push no GitHub + Deploy Vercel
REM Para usar: Salve como push-and-deploy.bat e execute

setlocal enabledelayedexpansion

echo.
echo ╔═════════════════════════════════════════════╗
echo ║  Sync.IA: GitHub Push + Vercel Deploy      ║
echo ╚═════════════════════════════════════════════╝
echo.

cd /d "D:\xampp\htdocs\jobagent" || (
  echo ❌ Diretório não encontrado!
  pause
  exit /b 1
)

echo 📁 Diretório: %cd%
echo.

REM PARTE 1: GIT STATUS
echo ════════════════════════════════════════════
echo 📊 Status do Git
echo ════════════════════════════════════════════
git status
echo.

REM PARTE 2: GIT ADD
echo ════════════════════════════════════════════
echo 📋 Adicionando arquivos...
echo ════════════════════════════════════════════
git add -A
git status
echo.

REM PARTE 3: GIT COMMIT
echo ════════════════════════════════════════════
echo ✍️  Fazendo commit...
echo ════════════════════════════════════════════
git commit -m "feat: Sync.IA Sprint 1 + i18n Invisível - Production Ready"
echo.

REM PARTE 4: GIT PUSH
echo ════════════════════════════════════════════
echo 🚀 Fazendo push para GitHub...
echo ════════════════════════════════════════════
git push origin main
if errorlevel 1 (
  echo ❌ Push falhou! Verifique autenticação Git
  pause
  exit /b 1
)
echo ✅ Push realizado com sucesso!
echo.

REM PARTE 5: VERCEL (Opcional)
echo ════════════════════════════════════════════
echo 🌐 Deploy no Vercel (Opcional)
echo ════════════════════════════════════════════
set /p deploy="Fazer deploy no Vercel agora? (s/n): "
if /i "%deploy%"=="s" (
  vercel --prod
  if errorlevel 1 (
    echo ⚠️  Vercel CLI não encontrado. Instale com: npm i -g vercel
  )
)

echo.
echo ╔═════════════════════════════════════════════╗
echo ║  ✅ TUDO PRONTO!                            ║
echo ║                                              ║
echo ║  GitHub: github.com/oCrisArts/jobagent      ║
echo ║  Vercel: sync-ia.vercel.app                 ║
echo ╚═════════════════════════════════════════════╝
echo.

pause
