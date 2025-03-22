'use client'

import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import {
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

interface AppBarProps {
  open: boolean;
  drawerWidth: number;
}

interface CustomAppBarProps {
  title: string;
  drawerWidth: number;
  open: boolean;
  handleDrawerOpen: () => void;
}

// Estilo personalizado para AppBar, asegurándonos de que 'drawerWidth' no se pase al DOM
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth', // No pasar 'drawerWidth' al DOM
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
  width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
}));

const CustomAppBar = ({ title, drawerWidth, open, handleDrawerOpen }: CustomAppBarProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Evita el renderizado mientras no se haya hidratado completamente
    return null;
  }
  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}> {/* drawerWidth ya no se pasa al DOM */}
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
