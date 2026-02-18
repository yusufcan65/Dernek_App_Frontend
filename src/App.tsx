import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HaberManagement from "./pages/admin/haber/HaberManagement";
import DuyuruManagement from "./pages/admin/duyuru/DuyuruManagement";
import UserHaberManagement from "./pages/user/UserHaberManagement";
import UserLayout from "./layouts/UserLayout";
import UserDuyuruManagement from "./pages/user/UserDuyuruManagement";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="haberler" element={<HaberManagement />} />
          <Route path="duyurular" element={<DuyuruManagement />} />
          
          </Route>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserHaberManagement />} />
            <Route path="haberler" element={<UserHaberManagement />} />
            <Route path="duyurular" element={<UserDuyuruManagement />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
