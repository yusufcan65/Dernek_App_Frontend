import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const drawerWidth = 260; 
const topbarHeight = 64;

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw", bgcolor: "#F4F7FE" }}>
      <CssBaseline />
      <Topbar />
      
      {/* Sidebar Sabit Genişlikte */}
      <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Ana İçerik Alanı: Kalan TÜM alanı kaplaması için */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ÖNEMLİ: Genişliği kesin olarak Sidebar sonrası kalan miktar yapıyoruz
          width: `calc(100% - ${drawerWidth}px)`, 
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: topbarHeight }} /> {/* Topbar Boşluğu */}

        {/* Outlet'in Render Edildiği Bölge: Burası Full Screen olmalı */}
        <Box sx={{ 
          flexGrow: 1, 
          width: "100%", // İçeriğin dışarı taşmasını veya dar kalmasını önler
          p: 3, // İçeride nefes alması için padding (istemiyorsanız 0 yapabilirsiniz)
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