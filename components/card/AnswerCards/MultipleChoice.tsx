import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IOption } from "@/lib/redux/form/types";
import { answerTypes } from "@/config/constant";

const initialOptions = [
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

const Checkbox = () => (
  <Box
    sx={{
      border: "2px solid #adb5bd",
      width: 15,
      height: 15,
      borderRadius: "15%",
    }}
  ></Box>
);

interface IMultipleChoiceProps {
  storedOptions: IOption[];
  type?: string;
}

const MultipleChoice = ({
  storedOptions,
  type = answerTypes.MULTIPLE_CHOICE,
}: IMultipleChoiceProps) => {
  const [options, setOptions] = useState<IOption[]>(
    storedOptions || initialOptions
  );

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

  const handleDeleteOption = (_id: string) => {
    const newOptions = options.filter((option) => option._id !== _id);
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
          key={option._id}
          _id={option._id}
          type={type}
          name={option.value}
          value={option.value}
          handleDeleteOption={handleDeleteOption}
          isShowDelete={radioButtonOptions.length > 1}
        />
      ))}
      {inputButtonOption ? (
        <Option
          type={type}
          name={inputButtonOption.value}
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
        {type === answerTypes.MULTIPLE_CHOICE ? (
          <RadioButtonCircle />
        ) : (
          <Checkbox />
        )}
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
  _id?: string;
  name?: string;
  value: string;
  type: string;
  handleDeleteOption: (name: string) => void;
  isOtherOption?: boolean;
  isShowDelete?: boolean;
}

const Option = ({
  _id,
  name,
  value,
  type,
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
      {type === answerTypes.MULTIPLE_CHOICE ? (
        <RadioButtonCircle />
      ) : (
        <Checkbox />
      )}
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
      <IconButton onClick={() => _id && handleDeleteOption(_id)}>
        <ClearIcon />
      </IconButton>
    </Box>
  </Box>
);

export default MultipleChoice;
