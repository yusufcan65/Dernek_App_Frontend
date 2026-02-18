import React, { useState } from 'react';
import { 
    TextField, Button, Typography, Box, Paper, 
    Avatar, InputAdornment, Container, IconButton 
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { register } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, password); 
            alert("Yeni admin başarıyla veritabanına kaydedildi.");
            navigate("/admin", { replace: true }); 
        } catch (error) {
            alert("Kayıt sırasında bir hata oluştu! Lütfen bilgileri kontrol edin.");
        }
    };

    return (
        <Box sx={{ 
            height: '100vh', 
            width: '100vw',
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'flex-start',
            pt: { xs: 4, md: 2.5 },
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)', 
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
                    bgcolor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    mb: 4
                }}>
                    <Avatar sx={{ 
                        mb: 2, 
                        bgcolor: '#059669',
                        width: 70, 
                        height: 70, 
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)' 
                    }}>
                        <PersonAddAlt1Icon fontSize="large" />
                    </Avatar>
                    
                    <Typography component="h4" variant="h4" sx={{ fontWeight: 800, color: '#064e3b', textAlign: 'center' }}>
                        YENİ ADMİN OLUŞTUR
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontWeight: 500, textAlign: 'center' }}>
                        Sisteme yeni bir yönetici hesabı tanımlayın
                    </Typography>

                    <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Yeni Kullanıcı Adı"
                            margin="normal"
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle sx={{ color: '#059669' }} />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                sx: { borderRadius: 2 }
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Yeni Şifre"
                            type={showPassword ? 'text' : 'password'}
                            margin="normal"
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#059669' }} />
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
                                bgcolor: '#059669',
                                '&:hover': { bgcolor: '#047857', transform: 'translateY(-2px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }
                            }}
                        >
                            Kaydı Tamamla
                        </Button>

                        <Button 
                            fullWidth 
                            variant="text" 
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate("/admin")}
                            sx={{ mt: 1, fontWeight: 600, color: '#065f46' }}
                        >
                            İşlemi İptal Et ve Panele Dön
                        </Button>
                    </Box>
                </Paper>
                
                <Typography variant="body2" color="rgba(255,255,255,0.8)" align="center" sx={{ pb: 4 }}>
                    © 2026 CMV Software Solutions. Admin Yönetim Modülü.
                </Typography>
            </Container>
        </Box>
    );
};

export default RegisterPage;