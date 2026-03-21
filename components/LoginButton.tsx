"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function LoginButton({ large = false }: { large?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <CircularProgress size={24} />;

  if (session) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={session.user?.image || ""}
          alt={session.user?.name || ""}
          sx={{ width: 32, height: 32, border: "2px solid rgba(255,255,255,0.3)" }}
        />
        <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" }, color: "text.secondary" }}>
          {session.user?.name}
        </Typography>
        <Button variant="outlined" size="small" onClick={() => signOut()} sx={{ borderRadius: 2, fontSize: 12 }}>
          Sair
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="contained"
      size={large ? "large" : "medium"}
      startIcon={<LinkedInIcon />}
      onClick={() => signIn("linkedin")}
      sx={{ bgcolor: "#0A66C2", "&:hover": { bgcolor: "#004182" }, borderRadius: 2, textTransform: "none", fontWeight: 500 }}
    >
      {large ? "Entrar com LinkedIn" : "LinkedIn"}
    </Button>
  );
}
