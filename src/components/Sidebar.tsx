import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL "/admin" ile başlıyorsa Admin menüsünü, değilse User menüsünü göster
  const isAdmin = location.pathname.startsWith("/admin");

  const adminMenuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Haber Yönetimi", icon: <ArticleIcon />, path: "/admin/haberler" },
    { text: "Duyuru Yönetimi", icon: <CampaignIcon />, path: "/admin/duyurular" },
  ];

  const userMenuItems = [
    { text: "Haberler", icon: <ArticleIcon />, path: "/user/haberler" }, // [cite: 10]
    { text: "Duyurular", icon: <CampaignIcon />, path: "/user/duyurular" }, // [cite: 11]
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Toolbar />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
  {/* LOGO */}
  <Box sx={{ mb: 1 }}>
    <img
      src="/ikon/ikoncmw.png"
      alt="CMW Logo"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "1px solid #eee"
      }}
    />
  </Box>

  {/* DİNAMİK MENÜ BAŞLIĞI */}
  <Typography 
    variant="overline" 
    sx={{ 
      fontWeight: 700, 
      color: "text.secondary",
      textAlign: "center" // yatay ortalama
    }}
  >
    {isAdmin ? "ADMİN PANELİ" : "KULLANICI PANELİ"}
  </Typography>
</Box>



        {/* MENÜ LİSTESİ */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton 
              key={item.text} 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path} // Aktif sayfayı vurgula
              sx={{
                "&.Mui-selected": {
                  borderRight: `4px solid ${isAdmin ? "#1a73e8" : "#f59e0b"}`,
                  bgcolor: isAdmin ? "rgba(26, 115, 232, 0.08)" : "rgba(245, 158, 11, 0.08)"
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? (isAdmin ? "#1a73e8" : "#f59e0b") : "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? 700 : 500 
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* FOOTER */}
      <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid #eee" }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {isAdmin ? "Admin Mode" : "User Mode"}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          © CMV 2026 by CMV Software Solutions
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;