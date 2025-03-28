'use client'

import { Typography, Box  } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Notes() {
  const { data: session, status } = useSession();

  return (
    <Box>
      <Typography>
        This is my notes
      </Typography>
    </Box>
  );
}
