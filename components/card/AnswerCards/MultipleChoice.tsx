import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface IOption {
  name: string;
  value: string;
  isOtherOption?: boolean;
}

const initialOptions: IOption[] = [
  {
    name: "option1",
    value: "Option 1",
  },
];

const RadioButtonCircle = () => (
  <Box
    sx={{
      border: "2px solid #adb5bd",
      width: 15,
      height: 15,
      borderRadius: "100%",
    }}
  ></Box>
);

const MultipleChoice = () => {
  const [options, setOptions] = useState<IOption[]>(initialOptions);

  const isOtherOptionFound = (): IOption | null => {
    let foundOption: IOption | null = null;
    options.forEach((option) => {
      if (option.isOtherOption) {
        foundOption = option;
      }
    });

    return foundOption;
  };

  const handleAddOption = (other?: boolean) => {
    const newOption: IOption = {
      name: `option${
        isOtherOptionFound() ? options.length : options.length + 1
      }`,
      value: other
        ? ""
        : `Option ${
            isOtherOptionFound() ? options.length : options.length + 1
          }`,
      isOtherOption: other,
    };
    setOptions([...options, newOption]);
  };

  const handleDeleteOption = (name: string) => {
    const newOptions = options.filter((option) => option.name !== name);
    setOptions([...newOptions]);
  };

  const radioButtonOptions: IOption[] = options.filter(
    (option) => !option.isOtherOption
  );
  const inputButtonOption: IOption | null = isOtherOptionFound();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {radioButtonOptions.map((option) => (
        <Option
          key={option.name}
          name={option.name}
          value={option.value}
          handleDeleteOption={handleDeleteOption}
          isShowDelete={radioButtonOptions.length > 1}
        />
      ))}
      {inputButtonOption ? (
        <Option
          name={inputButtonOption?.name}
          value={inputButtonOption.value}
          handleDeleteOption={handleDeleteOption}
          isOtherOption
        />
      ) : null}

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <RadioButtonCircle />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          {!isOtherOptionFound() ? (
            <>
              <Typography>or</Typography>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => handleAddOption(true)}
              >{`Add "Other"`}</Button>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

interface IOptionProps {
  name: string;
  value: string;
  handleDeleteOption: (name: string) => void;
  isOtherOption?: boolean;
  isShowDelete?: boolean;
}

const Option = ({
  name,
  value,
  handleDeleteOption,
  isOtherOption,
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
      <RadioButtonCircle />
      {isOtherOption ? (
        <Box
          sx={{
            borderBottom: "1px",
            borderBottomStyle: "dotted",
            width: "95%",
          }}
        >
          Other...
        </Box>
      ) : (
        <TextField
          variant="standard"
          name={name}
          value={value}
          sx={{ width: "95%" }}
        />
      )}
    </Box>
    <Box sx={{ display: isShowDelete ? "flex" : "none" }}>
      <IconButton onClick={() => handleDeleteOption(name)}>
        <ClearIcon />
      </IconButton>
    </Box>
  </Box>
);

export default MultipleChoice;
