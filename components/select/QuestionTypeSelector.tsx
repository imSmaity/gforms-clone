import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import { QuestionValues } from "@/types/types";
import { questionTypes } from "./options";

interface IQuestionTypeSelectorProps {
  value?: QuestionValues;
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
  value = QuestionValues.MULTIPLE_CHOICE,
}: IQuestionTypeSelectorProps) => {
  const currentOption =
    questionTypes[questionTypes.map((option) => option.value).indexOf(value)];
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      <Select
        value={currentOption}
        onChange={() => {}}
        renderValue={(option) => (
          <Box className={classes.selectValue}>
            {option?.icon}
            <Typography>{option.label}</Typography>
          </Box>
        )}
      >
        {questionTypes.map((option) => (
          <MenuItem
            key={option?.value}
            value={option?.value}
            className={classes.menuItem}
          >
            {option.icon}
            <Typography>{option?.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default QuestionTypeSelector;
