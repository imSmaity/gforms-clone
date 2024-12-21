import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface IOption {
  name: string;
  value: string;
}

const initialOptions: IOption[] = [
  {
    name: "option1",
    value: "Option 1",
  },
];

const Dropdown = () => {
  const [options, setOptions] = useState<IOption[]>(initialOptions);

  const handleAddOption = () => {
    const newOption: IOption = {
      name: `option${options.length + 1}`,
      value: `Option ${options.length + 1}`,
    };
    setOptions([...options, newOption]);
  };

  const handleDeleteOption = (name: string) => {
    const newOptions = options.filter((option) => option.name !== name);
    setOptions([...newOptions]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {options.map((option, index) => (
        <Option
          index={index}
          key={option.name}
          name={option.name}
          value={option.value}
          handleDeleteOption={handleDeleteOption}
          isShowDelete={options.length > 1}
        />
      ))}

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{options.length + 1}.</Typography>
          <Typography
            sx={{
              "&:hover": {
                borderBottom: "1px solid",
              },
            }}
            onClick={() => handleAddOption()}
          >
            Add option
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

interface IOptionProps {
  name: string;
  value: string;
  handleDeleteOption: (name: string) => void;
  isShowDelete?: boolean;
  index: number;
}

const Option = ({
  name,
  index,
  value,
  handleDeleteOption,
  isShowDelete,
}: IOptionProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        width: "100%",
      }}
    >
      {index + 1}.
      <TextField
        variant="standard"
        name={name}
        value={value}
        sx={{ width: "95%" }}
      />
    </Box>
    <Box sx={{ display: isShowDelete ? "flex" : "none" }}>
      <IconButton onClick={() => handleDeleteOption(name)}>
        <ClearIcon />
      </IconButton>
    </Box>
  </Box>
);

export default Dropdown;
