import { Box } from "@mui/material";

type TabPanelProps = {
  index: number;
  value: number;
  children: React.ReactNode;
};

// Handles items within the tabs
const TabPanel = ({ index, value, children }: TabPanelProps) => {
  return (
    <div
      aria-labelledby={`tab-${index}`}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      role={"tabpanel"}
    >
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
        {children}
      </Box>
    </div>
  );
};

export default TabPanel;
