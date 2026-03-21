"use client";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1C6EF2" },
    background: { default: "#0F1117", paper: "#1A1D27" },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily: "'Google Sans', Roboto, sans-serif",
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: "none" } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 12, backgroundImage: "none" } } },
    MuiDialog: { styleOverrides: { paper: { backgroundImage: "none" } } },
    MuiTextField: { defaultProps: { variant: "outlined" } },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
