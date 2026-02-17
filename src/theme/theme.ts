import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A", // koyu mavi
    },
    secondary: {
      main: "#0EA5E9", // açık mavi
    },
    background: {
      default: "#F4F6F8",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});

export default theme;
