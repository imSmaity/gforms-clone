"use client";
import StoreProvider from "@/lib/Providers/StoreProvider";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import Navbar from "../navbar/Navbar";
import AppTabs from "../navbar/Tabs";

const queryClient = new QueryClient();

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            {/* {children} */}
            <AppTabs />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
};

export default Layout;
