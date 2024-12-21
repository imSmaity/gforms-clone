import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import { answerTypes as AnswerTypes } from "@/config/constant";
import { questionTypes } from "./options";

interface IQuestionTypeSelectorProps {
  value?: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
}

const useStyles = makeStyles({
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 14,
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
  selectValue: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
});

const QuestionTypeSelector = ({
  value = AnswerTypes.MULTIPLE_CHOICE,
  handleChange,
}: IQuestionTypeSelectorProps) => {
  const classes = useStyles();

  const currentOption = questionTypes.find((option) => option.value === value);

  return (
    <FormControl fullWidth>
      <Select
        value={currentOption?.value || ""}
        onChange={handleChange}
        renderValue={(selectedValue) => {
          const selectedOption = questionTypes.find(
            (option) => option.value === selectedValue
          );
          return (
            <Box className={classes.selectValue} sx={{ display: "flex" }}>
              {selectedOption?.icon}
              <Typography>{selectedOption?.label}</Typography>
            </Box>
          );
        }}
      >
        {questionTypes.map((option) =>
          option.divider ? (
            <Divider
              key={option.id}
              sx={{ display: option?.visible ? "flex" : "none" }}
            />
          ) : (
            <MenuItem
              key={option.id}
              value={option.value}
              className={classes.menuItem}
              style={{ display: option?.visible ? "flex" : "none" }}
            >
              {option.icon}
              <Typography>{option.label}</Typography>
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default QuestionTypeSelector;
