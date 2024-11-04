"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "@/theme";
import Navbar from "../navbar/Navbar";
import StoreProvider from "@/lib/Providers/StoreProvider";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <StoreProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Navbar />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </StoreProvider>
  );
};

export default Layout;
