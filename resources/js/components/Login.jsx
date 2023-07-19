import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../hooks/useAuth';
import RingLoader from "react-spinners/RingLoader";
import LoadingOverlay from 'react-loading-overlay-ts';

const defaultTheme = createTheme();

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    if(loading) return;
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await login(data.get('email'), data.get('password'));
    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      {loading && (
          <LoadingOverlay
          active={loading}
          spinner={<RingLoader color="rgba(54, 83, 214, 1)" />}
          className='full-screen-overlay'
          />
        )
      }
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}