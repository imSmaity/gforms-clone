import { IOption } from "@/lib/redux/form/types";
import {
  Box,
  Typography,
  Checkbox,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface ICheckInputProps {
  options?: IOption[];
  disabled?: boolean;
  handleChange: (e: SelectChangeEvent) => void;
  value: string;
}

const Dropdown = ({
  options = [],
  disabled,
  handleChange,
  value,
}: ICheckInputProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Select
        placeholder="Choose"
        sx={{ width: "30%" }}
        disabled={disabled}
        value={value || ""}
        onChange={handleChange}
      >
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
