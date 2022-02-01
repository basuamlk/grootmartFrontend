import { createTheme } from '@material-ui/core/styles';

const appTheme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#f5f5f5',
      dark: '#c2c2c2',
      textPrimary: '#000000',
    },
    secondary: {
      light: '#b0ff57',
      main: '#76ff03',
      dark: '#32cb00',
      textSecondary: '#000000',
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans', 'sans-serif'].join(','),
  },
});

export default appTheme;
