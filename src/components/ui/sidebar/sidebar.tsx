'use client'

import React, { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";

import { styled, useTheme, Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
} from '@mui/material';

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Person as PersonIcon,
  Logout as LogOutIcon,
} from '@mui/icons-material';

import useMediaQuery from '@mui/material/useMediaQuery';

import CustomAppBar from './custom-app-bar';
import ListOptions from './list-options';
import CustomMain from '@/components/CustomMain';

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const menuOptions = {
  firstSection: [
    { option: 'Inbox', icon: <InboxIcon /> , button: false },
    { option: 'Starred', icon: <MailIcon />, button: false },
    { option: 'Send email', icon: <InboxIcon /> , button: false },
    { option: 'Send email', icon: <MailIcon /> , button: false },
    { option: 'Drafts', icon: <MailIcon />, button: false}
  ],
  secondSection: [
    { option: 'All mail', icon: <InboxIcon /> , button: false },
    { option: 'Trash', icon: <MailIcon />, button: false },
    { option: 'Spam', icon: <InboxIcon />, button: false }
  ],
  profileSection: [
    { option: 'Mi Perfil', icon: <PersonIcon /> , button: false },
    { option: 'Cerrar Sesión', icon: <LogOutIcon />, button: true, function: signOut },
  ]
}

export default function MiniDrawer({ children }: Readonly<{ children: React.ReactNode}>) {
  const theme = useTheme();
  const isMobile = useMediaQuery<Theme>(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!isClient) {
    // Evita el renderizado mientras no se haya hidratado completamente
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar
        title={'Here be stay title'}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth} />
      <Drawer variant="permanent" open={open}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#4800ff',
            color: 'white'
          }
        }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ListOptions open={open} options={menuOptions.firstSection} />
        <Divider />
        <ListOptions open={open} options={menuOptions.secondSection} />
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <ListOptions open={open} options={menuOptions.profileSection} />
      </Drawer>
      <CustomMain>{children}</CustomMain>
    </Box>
  );
}
