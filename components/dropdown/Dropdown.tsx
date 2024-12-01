import { IOption } from "@/lib/redux/form/types";
import { Box, Typography, Checkbox, Select, MenuItem } from "@mui/material";

interface ICheckInputProps {
  options?: IOption[];
}

const Dropdown = ({ options = [] }: ICheckInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Select placeholder="Choose" sx={{ minWidth: "30%" }}>
        <MenuItem value="">Select</MenuItem>
        {options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Dropdown;
