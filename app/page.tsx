import { getServerSession } from "next-auth";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ChatInterface from "@/components/ChatInterface";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const session = await getServerSession();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "56px !important" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 32, height: 32, bgcolor: "primary.main", borderRadius: 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ color: "white", fontSize: 11, fontWeight: 700 }}>JA</Typography>
            </Box>
            <Typography variant="subtitle1" fontWeight={600}>JobAgent</Typography>
            <Chip label="Beta" size="small" sx={{ height: 18, fontSize: 10 }} />
          </Box>
          <LoginButton />
        </Toolbar>
      </AppBar>

      {session ? (
        <ChatInterface />
      ) : (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, px: 2, textAlign: "center" }}>
          <Box sx={{ width: 72, height: 72, bgcolor: "primary.light", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
            🎯
          </Box>
          <Typography variant="h4" fontWeight={600}>Encontre sua vaga ideal com IA</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
            Faça login com o LinkedIn e deixe o JobAgent buscar vagas, adaptar seu currículo e preparar sua candidatura automaticamente.
          </Typography>
          <LoginButton large />
        </Box>
      )}
    </Box>
  );
}
