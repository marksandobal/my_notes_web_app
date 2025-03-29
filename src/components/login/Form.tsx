'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

interface ICredential {
  email: string;
  password: string;
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Por favor ingrese un email válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function LoginForm() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (values: ICredential) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      console.error(result);
      setIsLoading(false);
    } else {
      router.push('/');
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
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          >
          {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box component="div" sx={{ mt: 1, width: '100%' }}>
              <Field
                  name="email"
                  as={TextField}
                  label="Email Address"
                  id="email"
                  fullWidth
                  margin="normal"
                  required
                  autoComplete="email"
                  autoFocus
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  id="password"
                  fullWidth
                  margin="normal"
                  required
                  autoComplete="current-password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
            </Form>
          )}
        </Formik>
    </Paper>
  </Box>
  );
}
