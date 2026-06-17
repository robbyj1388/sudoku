import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d55d6c",
      light: "#f5b0b3",
      dark: "#cb4154",
    },
    secondary: {
      main: "#ffcccb",
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
