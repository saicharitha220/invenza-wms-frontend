import { createTheme } from '@mui/material/styles';

// Define colors to match your screenshot.
const customTheme = createTheme({
  palette: {
    // For the screen background (used in App.tsx)
    background: {
      default: '#4A6282', // Dark blue-gray
    },
    // PRIMARY ACTION COLOR: Set the Maroon/Red as the Primary color for buttons
    primary: {
      main: '#880E4F', // Wine Red / Dark Maroon
      light: '#A03F6D',
      dark: '#6A0C3C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3F51B5', 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // REMOVED MuiCssBaseline override here
    MuiContainer: {
        styleOverrides: {
            root: {
                // To cover the entire screen and center content
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }
    },
    // Rounded corners on all buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    // Rounded corners on all text fields
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  }
});

export default customTheme;