import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Custom primary color
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e", // Custom secondary color
    },
    error: {
      main: "#f44336",
    },
  },
});

export default theme;
