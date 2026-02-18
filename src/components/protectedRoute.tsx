import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // LocalStorage'da kullanıcı/token verisi var mı kontrol et
    const user = localStorage.getItem("user");
    
    // Eğer admin giriş yapmamışsa, onu login sayfasına gönder
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Giriş yapılmışsa admin içeri girebilir
    return <Outlet />;
};

export default ProtectedRoute;