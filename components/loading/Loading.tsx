import { Box, CircularProgress, SxProps } from "@mui/material";
import React from "react";

interface ILoadingProps {
  sx?: SxProps;
}

const Loading = ({ sx }: ILoadingProps) => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
