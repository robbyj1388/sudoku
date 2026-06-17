import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { NavButton } from "./NavButton";
import { useLocation } from "react-router-dom";

document.body.style.margin = "0px";

const pages = [
  {
    name: "Sudoku",
    route: "/sudoku",
  },
];

/*
 * Wrapper for child pages/components. Includes a navbar on the left.
 */
export const Root = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        padding: 0,
        margin: 0,
        height: "100%",
        display: "flex",
      }}
    >
      {/* Navigation Bar */}
      <Box
        sx={{
          zIndex: 1,
          display: "block",
          margin: "0",
          flex: "1",
          height: "100%",
          bgcolor: "#121212",
          borderRight: "1px solid white",
        }}
      >
        {pages.map(({ name, route }) => (
          <NavButton
            name={name}
            key={route}
            route={route}
            active={location.pathname.includes(route)}
          />
        ))}
      </Box>

      {/* Render Output */}
      <Box sx={{ display: "inline-block", flex: "5" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
