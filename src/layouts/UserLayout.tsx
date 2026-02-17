import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/Sidebar"; // Kullanıcı için Sidebar
import UserTopbar from "../components/Topbar";   // Kullanıcı için Topbar

const drawerWidth = 260; 
const topbarHeight = 64;

export default function UserLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw", bgcolor: "#F4F7FE" }}>
      <CssBaseline />
      <UserTopbar />
      
      {/* Sidebar Sabit Genişlikte */}
      <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <UserSidebar />
      </Box>

      {/* Ana İçerik Alanı: Kalan TÜM alanı kaplaması için */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`, 
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: topbarHeight }} /> {/* Topbar Boşluğu */}

        {/* Outlet'in Render Edildiği Bölge */}
        <Box sx={{ 
          flexGrow: 1, 
          width: "100%", 
          p: 3, 
          overflowY: "auto",
          display: "flex",
          flexDirection: "column"
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
