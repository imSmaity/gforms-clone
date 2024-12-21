import { Box, Radio, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface IRadioInputProps {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

const RadioInput = ({ id, label, checked, disabled }: IRadioInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Radio id={id} checked={checked} disabled={disabled} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default RadioInput;
