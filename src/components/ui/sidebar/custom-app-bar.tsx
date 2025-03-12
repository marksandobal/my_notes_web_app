'use client'

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open', // No pasar 'open' al DOM
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
  }),
  // Aquí modificamos el estilo basado en el valor de 'open'
  marginLeft: open ? drawerWidth : 0,
  width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
}));

const CustomAppBar = ({ title, drawerWidth, open, handleDrawerOpen } : CustomAppBarProps)=> {
  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
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

export default  CustomAppBar;
