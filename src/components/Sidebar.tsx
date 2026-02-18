import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; 
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Admin ismini localStorage'dan çekiyoruz
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const adminName = user?.username || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const isAdmin = location.pathname.startsWith("/admin");

  const adminMenuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Haber Yönetimi", icon: <ArticleIcon />, path: "/admin/haberler" },
    { text: "Duyuru Yönetimi", icon: <CampaignIcon />, path: "/admin/duyurular" },
  ];

  const userMenuItems = [
    { text: "Haberler", icon: <ArticleIcon />, path: "/user/haberler" },
    { text: "Duyurular", icon: <CampaignIcon />, path: "/user/duyurular" }, 
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
          
          {/* Sadece Admin modundaysa ismi gösterir */}
          {isAdmin && (
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 800, color: "primary.main", textTransform: 'uppercase', mt: 1 }}
            >
              {adminName}
            </Typography>
          )}

          <Typography 
            variant="overline" 
            sx={{ fontWeight: 700, color: "text.secondary", textAlign: "center" }}
          >
            {isAdmin ? "ADMİN PANELİ" : "KULLANICI PANELİ"}
          </Typography>
        </Box>

        {/* Ana Menü Listesi */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton 
              key={item.text} 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path} 
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
                primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 700 : 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Alt Kısım: Admin İşlemleri ve Çıkış */}
      <Box sx={{ mt: "auto" }}>
        {isAdmin && (
          <>
            <Divider />
            <List>
              <ListItemButton 
                onClick={() => navigate("/register")}
                selected={location.pathname === "/register"}
                sx={{
                  color: "primary.main",
                  "&.Mui-selected": {
                    bgcolor: "rgba(25, 118, 210, 0.08)",
                    borderRight: "4px solid #1976d2"
                  }
                }}
              >
                <ListItemIcon>
                  <PersonAddIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Admin Oluştur" 
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
              </ListItemButton>

              <ListItemButton 
                onClick={handleLogout}
                sx={{
                  color: "error.main",
                  "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" }
                }}
              >
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Çıkış Yap" 
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
              </ListItemButton>
            </List>
          </>
        )}

        <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid #eee" }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {isAdmin ? "Admin Mode" : "User Mode"}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            © CMV 2026 by CMV Software Solutions
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;