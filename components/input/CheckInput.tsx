import { Box, Typography, Checkbox } from "@mui/material";
import React from "react";

interface ICheckInputProps {
  label: string;
  checked?: boolean;
}

const CheckInput = ({ label, checked }: ICheckInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox checked={checked} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default CheckInput;
