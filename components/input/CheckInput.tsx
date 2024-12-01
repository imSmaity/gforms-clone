import { Box, Typography, Checkbox } from "@mui/material";
import React from "react";

interface ICheckInputProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

const CheckInput = ({ label, checked, disabled }: ICheckInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox checked={checked} disabled={disabled} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default CheckInput;
