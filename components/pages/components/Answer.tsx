"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import CheckInput from "@/components/input/CheckInput";
import RadioInput from "@/components/input/RadioInput";
import { answerTypes } from "@/config/constant";
import { IAnswer } from "@/lib/redux/responder/types";
import { Box, Input, SelectChangeEvent } from "@mui/material";
import { produce } from "immer";
import { ChangeEvent, MouseEvent, useState } from "react";

interface IAnswerProps {
  answerId?: string;
  disabled?: boolean;
  handleSaveAnswer?: (_id: string, response: string[]) => void;
}

const Answer = ({
  answerId,
  response,
  question,
  disabled = false,
  handleSaveAnswer,
}: IAnswer & IAnswerProps) => {
  const [answer, setAnswer] = useState<string[]>(response);
  const handleSetAnswer = (id: string) => {
    const draftAns = produce(answer, (draft) => {
      draft.length = 0;
      draft.push(id);
    });
    setAnswer(draftAns);
    if (handleSaveAnswer && answerId) handleSaveAnswer(answerId, draftAns);
  };

  const handleRadioInput = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    handleSetAnswer(id);
  };

  const isChecked = (_id?: string) => answer.includes(String(_id));
  const handleCheckBoxes = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    const checked = target.checked;
    const id = target.id;

    const draftAns = produce(answer, (optionsDraft) => {
      const index = optionsDraft.indexOf(target.id);
      if (checked) optionsDraft.push(id);
      else optionsDraft.splice(index, 1);
    });
    setAnswer(draftAns);
    if (handleSaveAnswer && answerId) handleSaveAnswer(answerId, draftAns);
  };

  const handleDropdownInput = (e: SelectChangeEvent) => {
    const value = e.target.value;
    handleSetAnswer(value);
  };

  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    handleSetAnswer(value);
  };

  const singleValue = answer[0] || "";
  switch (question?.type) {
    case answerTypes.MULTIPLE_CHOICE:
      return (
        <Box onClick={(e) => handleRadioInput(e)}>
          {question?.options?.map((option) => (
            <RadioInput
              id={String(option._id)}
              key={option._id}
              label={option.value}
              checked={option._id == singleValue}
              disabled={disabled}
            />
          ))}
        </Box>
      );
    case answerTypes.CHECKBOXES:
      return (
        <Box onClick={(e) => handleCheckBoxes(e)}>
          {question?.options?.map((option) => (
            <CheckInput
              id={String(option._id)}
              key={option._id}
              label={option.value}
              checked={isChecked(option._id)}
              disabled={disabled}
            />
          ))}
        </Box>
      );
    case answerTypes.DROPDOWN:
      return (
        <Dropdown
          options={question?.options}
          disabled={disabled}
          handleChange={handleDropdownInput}
          value={singleValue}
        />
      );
    case answerTypes.PARAGRAPH:
      return (
        <Input
          placeholder="Your answer"
          sx={{ width: "100%", fontSize: 14 }}
          disabled={disabled}
          onChange={handleTextInput}
          value={singleValue}
        />
      );
    default:
      return (
        <Input
          placeholder="Your answer"
          sx={{ width: "50%", fontSize: 14 }}
          disabled={disabled}
          onChange={handleTextInput}
          value={singleValue}
        />
      );
  }
};

export default Answer;
