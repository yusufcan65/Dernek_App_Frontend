import React, { useState } from 'react';
import { 
    TextField, Button, Typography, Box, Paper, 
    Avatar, InputAdornment, IconButton, Divider, Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { login } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/admin");
        } catch (error) {
            alert("Hatalı kullanıcı adı veya şifre!");
        }
    };

    return (
        <Box sx={{ 
            height: '100vh', 
            width: '100vw',
            display: 'flex', 
            flexDirection: 'column', // Dikey hizalama için
            alignItems: 'center', 
            justifyContent: 'flex-start', // En üstten başla
            pt: { xs: 4, md: 1.25 }, // Üstten güvenli boşluk (Taşmayı önler)
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            <Container maxWidth="sm">
                <Paper elevation={24} sx={{ 
                    padding: { xs: 3, sm: 6 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    borderRadius: 5,
                    bgcolor: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    mb: 4 // Alt kısımda boşluk bırakır
                }}>
                    <Avatar sx={{ 
                        mb: 2, 
                        bgcolor: 'primary.main', 
                        width: 70, 
                        height: 70, 
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)' 
                    }}>
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    
                    <Typography component="h4" variant="h4" sx={{ fontWeight: 800, color: '#1e3a8a', textAlign: 'center' }}>
                        CMW TEKNOLOJİ 
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontWeight: 500, textAlign: 'center' }}>
                        Yönetim paneline erişmek için kimliğinizi doğrulayın
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Kullanıcı Adı"
                            margin="normal"
                            variant="filled"
                            autoComplete="username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                sx: { borderRadius: 2 }
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Şifre"
                            type={showPassword ? 'text' : 'password'}
                            margin="normal"
                            variant="filled"
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                sx: { borderRadius: 2 }
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <Button 
                            fullWidth 
                            variant="contained" 
                            type="submit" 
                            size="large"
                            sx={{ 
                                mt: 4, 
                                mb: 2, 
                                py: 2, 
                                borderRadius: 3, 
                                fontWeight: 'bold', 
                                fontSize: '1.1rem',
                                textTransform: 'none',
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }
                            }}
                        >
                            Giriş Yap
                        </Button>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Divider sx={{ flexGrow: 1 }} />
                            <Typography variant="body2" sx={{ px: 2, color: 'text.secondary', fontWeight: 600 }}>
                                VEYA
                            </Typography>
                            <Divider sx={{ flexGrow: 1 }} />
                        </Box>

                        <Button 
                            fullWidth 
                            variant="outlined" 
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => navigate("/user")}
                            sx={{ 
                                py: 1.5, 
                                borderRadius: 3, 
                                textTransform: 'none', 
                                fontWeight: 600,
                                border: '2px solid'
                            }}
                        >
                            Ziyaretçi Olarak Devam Et
                        </Button>
                    </Box>
                </Paper>
                
                <Typography variant="body2" color="rgba(255,255,255,0.8)" align="center" sx={{ pb: 4 }}>
                    © 2026 CMV Software Solutions. Tüm hakları saklıdır.
                </Typography>
            </Container>
        </Box>
    );
};

export default LoginPage;