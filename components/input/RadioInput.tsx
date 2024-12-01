import { Box, Radio, Typography } from "@mui/material";

interface IRadioInputProps {
  label: string;
  checked?: boolean;
}

const RadioInput = ({ label, checked }: IRadioInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Radio checked={checked} />
      <Typography>{label}</Typography>
    </Box>
  );
};

export default RadioInput;
