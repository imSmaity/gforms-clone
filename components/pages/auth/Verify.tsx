"use client";
import { Box, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";

const Verify = () => {
  const code = useSearchParams().get("code");
  console.log(code);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Verify;
