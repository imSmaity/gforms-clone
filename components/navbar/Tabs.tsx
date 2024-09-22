import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AppTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Questions"
            sx={{ textTransform: "none" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Responses"
            sx={{ textTransform: "none" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Settings"
            sx={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
