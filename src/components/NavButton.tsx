import { Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import React from "react";

/*
 * The properties that will be passed in
 */
interface Props {
  name: string;
  route: string;
  active: boolean;
}

/*
 * @param props.name The name to be drawn on button
 * @param props.route The active route
 */
export const NavButton: React.FC<Props> = (props: Props) => {
  return (
    <>
      <NavLink to={props.route}>
        <Button
          className="nButton"
          variant="contained"
          sx={{
            width: "100%",
            borderBottom: "1px solid #bbbbbb",
            padding: "25px",
            boxSizing: "border-box",
            color: "#fff",
            background: props.active ? "#434343" : "unset",
            borderRadius: "0px",
          }}
          color="primary"
        >
          <Box sx={{ textAlign: "left", width: "75%" }}>{props.name}</Box>
          <Box sx={{ textAlign: "right", width: "25%" }}>{">"}</Box>
        </Button>
      </NavLink>
    </>
  );
};
