"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectTabs, setTab } from "@/lib/redux/tab/tabSlice";
import { TABS } from "@/lib/redux/tab/types";
import Form from "../pages/Form/Form";
import Responses from "../pages/Form/Responses";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ActiveTab = ({ value }: { value: number }) => {
  switch (value) {
    case TABS.RESPONSES:
      return <Responses />;
    case TABS.SETTINGS:
      return null;
    default:
      return <Form />;
  }
};

export default function AppTabs() {
  const { currentTab } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setTab(newValue));
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pt: 7,
          position: "fixed",
          backgroundColor: "#ffffff",
          zIndex: 10,
        }}
      >
        <Box>
          <Tabs
            value={currentTab}
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
      <ActiveTab value={currentTab} />
    </>
  );
}
