import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

const drawerWidth = 240;

function Topbar() {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "#1a237e", // Profesyonel koyu mavi
      }}
    >
      <Toolbar>
        {/* Sol Taraftaki Başlık */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "1px",
            flexGrow: 1, // Sağdaki ikonları en sağa itmek için gerekli
            fontSize: { xs: "0.8rem", md: "1rem" }
          }}
        >
          CMW TEKNOLOJİ SOSYAL YARDIMLAŞMA VE DAYANIŞMA DERNEĞİ
        </Typography>

        {/* Sağ Taraftaki İkonlar */}
        <Box sx={{ display: "flex", gap: 1 }}>
          
          {/* Web Sitesi İkonu */}
          <Tooltip title="Web Sitemizi Ziyaret Et">
            <IconButton
              component="a"
              href="https://www.cmvteknoloji.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          {/* LinkedIn İkonu */}
          <Tooltip title="LinkedIn'de Takip Et">
            <IconButton
              component="a"
              href="https://www.linkedin.com/company/cmv-teknoloji/?"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;