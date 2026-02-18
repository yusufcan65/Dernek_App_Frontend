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
      
     
      <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Sidebar />
      </Box>

      
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
        <Box sx={{ height: topbarHeight }} />

        
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