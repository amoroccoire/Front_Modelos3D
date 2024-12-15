'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';
import { Box, Container } from '@mui/material';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirige al dashboard tras un inicio de sesión exitoso
    navigate('/dashboard');
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#fce8dd"
    >
      <Container maxWidth="sm">
        {isLogin ? (
          <LoginForm
            onSwitchToRegister={() => setIsLogin(false)}
            onLoginSuccess={handleLoginSuccess} // Llama a la redirección
          />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </Container>
    </Box>
  );
}
