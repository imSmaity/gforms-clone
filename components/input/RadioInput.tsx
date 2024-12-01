import { Box, Radio, Typography } from "@mui/material";

interface IRadioInputProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

const RadioInput = ({ label, checked, disabled }: IRadioInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Radio checked={checked} disabled={disabled} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default RadioInput;
