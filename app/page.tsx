import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LandingPage from "@/components/LandingPage";
import ChatInterface from "@/components/ChatInterface";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const session = await getServerSession();

  if (!session) return <LandingPage />;

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
      <ChatInterface />
    </Box>
  );
}
