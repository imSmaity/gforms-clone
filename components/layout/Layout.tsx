"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "@/theme";
import Navbar from "../navbar/Navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Layout;
