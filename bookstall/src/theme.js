import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F18966',
    },
    secondary: {
      main: '#a0522d',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a0522d',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#65350F',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F18966',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#a0522d',
            },
            '&:hover fieldset': {
              borderColor: '#65350F',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F18966',
            },
          },
        },
      },
    },
  },
});

export default theme;