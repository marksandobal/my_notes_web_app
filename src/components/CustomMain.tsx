'use client'

import {
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CustomMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  
  return (
    <Box component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - 240px)` },
        ml: { md: `20px` },
        mt: { xs: 8, md: 8 },
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {children}
    </Box>
  );
}
