"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WifiOffIcon from "@mui/icons-material/WifiOff";

interface Job {
  id: string; title: string; company: string; location: string;
  description: string; url: string; logo?: string; remote: boolean; postedAt: string;
}

export default function JobCard({ job, onAdaptResume }: { job: Job; onAdaptResume: (job: Job) => void }) {
  const postedDate = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    : "";

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, "&:hover": { borderColor: "primary.main", boxShadow: 2 }, transition: "all 0.2s" }}>
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
          <Avatar
            src={job.logo}
            variant="rounded"
            sx={{ width: 42, height: 42, bgcolor: "primary.50", color: "primary.main", fontSize: 14, fontWeight: 600, border: "1px solid", borderColor: "divider" }}
          >
            {job.company.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>{job.title}</Typography>
            <Typography variant="caption" color="text.secondary">{job.company}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 12, color: "text.disabled" }} />
              <Typography variant="caption" color="text.disabled">{job.location || "Não informado"}</Typography>
              {job.remote && <Chip label="Remoto" size="small" color="success" variant="outlined" sx={{ height: 18, fontSize: 10 }} />}
              {postedDate && <Typography variant="caption" color="text.disabled" sx={{ ml: "auto" }}>{postedDate}</Typography>}
            </Box>
          </Box>
        </Box>
        {job.description && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>
            {job.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        <Button fullWidth variant="outlined" size="small" startIcon={<DescriptionOutlinedIcon />} onClick={() => onAdaptResume(job)} sx={{ borderRadius: 2, textTransform: "none", fontSize: 12 }}>
          Adaptar CV
        </Button>
        <Button fullWidth variant="contained" size="small" endIcon={<OpenInNewIcon />} href={job.url} target="_blank" sx={{ borderRadius: 2, textTransform: "none", fontSize: 12 }}>
          Ver vaga
        </Button>
      </CardActions>
    </Card>
  );
}
