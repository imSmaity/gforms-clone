import { Box, Typography, Checkbox } from "@mui/material";
import React, { MouseEvent } from "react";

interface ICheckInputProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  id: string;
}

const CheckInput = ({ label, checked, disabled, id }: ICheckInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox checked={checked} disabled={disabled} id={id} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default CheckInput;
