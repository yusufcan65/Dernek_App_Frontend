import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";


import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HaberManagement from "./pages/admin/haber/HaberManagement";
import DuyuruManagement from "./pages/admin/duyuru/DuyuruManagement";
import UserLayout from "./layouts/UserLayout";
import UserHaberManagement from "./pages/user/UserHaberManagement";
import UserDuyuruManagement from "./pages/user/UserDuyuruManagement";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserHaberManagement />} />
            <Route path="haberler" element={<UserHaberManagement />} />
            <Route path="duyurular" element={<UserDuyuruManagement />} />
          </Route>


          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="haberler" element={<HaberManagement />} />
              <Route path="duyurular" element={<DuyuruManagement />} />
            </Route>
          </Route>


          <Route path="/" element={<Navigate to="/user" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;