'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from '@mui/material';

interface IAuthErrors {
  email?: string;
  password?: string;
};

interface ICredential {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ICredential>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<IAuthErrors>({});

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: IAuthErrors = {};

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password || !formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateForm()) {
      const result = await signIn('credentials', {
        redirect: false,  // No redirigir automáticamente
        email: formData.email,
        password: formData.password,
      });
  
      if (result?.error) {
        console.error(result);
        setIsLoading(false);
      } else {
        // Redirige al usuario después de un inicio de sesión exitoso
        router.push('/');
      }
    }
    setIsLoading(false);
  };

  if (!isClient) {
    // Evita el renderizado mientras no se haya hidratado completamente
    return null;
  }

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'background.default',
      with: '100%',
      height: '100vh'
    }}
  >
    <Paper 
      elevation={3} 
      sx={{ 
        padding: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <Typography component="h1" variant="h4" color='primary'>
        Inicia sesión
      </Typography>
      <Typography color='info'>
        para continuar con tu experiencia
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type='submit'
          >
            Iniciar sesión
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'success',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  </Box>
  );
}
