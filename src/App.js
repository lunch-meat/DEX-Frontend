import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DonationWidget from './components/DonationWidget';

const theme = createTheme();

export default function Donate() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DonationWidget />
      </ThemeProvider>
  );
}