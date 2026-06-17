import { Typography, Box, createTheme, Switch, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Sudoku } from "./Sudoku";
import { IPAddress } from "./IPAddress";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import TabPanel from "./TabPanel";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FFFFFF",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#000000"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF70B5", // Cell backgrounds
      dark: "#000000", // Main (Thick) grid borders
      light: "#E80562", // Thin grid borders
      contrastText: "#000000", // Text
    },
    secondary: {
      main: "#D3D3D3", // Main background
      dark: "#FF3092", // Title card background
      light: "#FFFFFF", // Sudoku box background
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#FAA0C8",
            transition: "0.2s",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#910A67", // Cell backgrounds
      dark: "#F7599E", // Main (Thick) grid borders
      light: "#000000", // Thin grid borders
      contrastText: "#FFFFFF", // Text
    },
    secondary: {
      main: "#242222", // Main Background
      dark: "#B80055", // Title card background
      light: "#000000", // Sudoku box background
    },
  },
});

export const SudokuPage = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [darkMode, setDarkMode] = useState(true);
  const [tab, setTab] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Set tab title
  useEffect(() => {
    document.title = "Robby's Sudoku Puzzle";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
          height: "100%",
          width: "100%",
          minWidth: "1332px",
          backgroundColor: "secondary.main",
        }}
      >
        {/* Dark/light mode toggler */}
        <MaterialUISwitch
          sx={{ m: 1 }}
          onChange={() => {
            if (darkMode) {
              setDarkMode(false);
              setTheme(lightTheme);
            } else {
              setDarkMode(true);
              setTheme(darkTheme);
            }
          }}
          defaultChecked
        />
        {/* Create tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Sudoku" />
            <Tab label="DOXXED" />
          </Tabs>
        </Box>
        {/* Sudoku Tab */}
        <TabPanel index={0} value={tab}>
          {/* Create Sudoku game */}
          <>
            <Box
              sx={{
                textAlign: "center",
                height: "auto",
                width: "40%",
                pt: "20px",
                margin: "25px",
                backgroundColor: "secondary.dark",
                border: "3px solid",
                borderRadius: "15px",
                boxShadow: "0px 0px 15px #787878",
              }}
            >
              <Typography
                sx={{
                  mb: 3,
                  color: "primary.contrastText",
                }}
                variant="h2"
              >
                Sudoku Puzzle!
              </Typography>
            </Box>
            <Sudoku />
          </>
        </TabPanel>
        {/* Doxxed tab */}
        <TabPanel index={1} value={tab}>
          <Box
            sx={{
              textAlign: "center",
              height: "auto",
              width: "20%",
              pt: "20px",
              margin: "25px",
              backgroundColor: "secondary.dark",
              border: "3px solid",
              borderRadius: "15px",
              boxShadow: "0px 0px 15px #787878",
            }}
          >
            <Typography
              sx={{
                mb: 3,
                color: "primary.contrastText",
              }}
              variant="h4"
            >
              Found You!
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              width: "70%",
              height: "auto",
              pt: "20px",
              backgroundColor: "secondary.light",
              padding: "10px",
              border: "3px solid",
              borderRadius: "15px",
              boxShadow: "0px 0px 15px #787878",
            }}
          >
            <IPAddress />
          </Box>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};
