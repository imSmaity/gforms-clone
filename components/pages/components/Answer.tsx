"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import CheckInput from "@/components/input/CheckInput";
import RadioInput from "@/components/input/RadioInput";
import { answerTypes } from "@/config/constant";
import { IAnswer } from "@/lib/redux/responder/types";
import { Input } from "@mui/material";

interface IAnswerProps {
  disabled?: boolean;
}

const Answer = ({
  response,
  question,
  disabled = false,
}: IAnswer & IAnswerProps) => {
  switch (question?.type) {
    case answerTypes.MULTIPLE_CHOICE:
      return question?.options?.map((option) => (
        <RadioInput
          key={option._id}
          label={option.value}
          checked={option._id == response}
          disabled={disabled}
        />
      ));
    case answerTypes.CHECKBOXES:
      return question?.options?.map((option) => (
        <CheckInput
          key={option._id}
          label={option.value}
          checked={option._id == response}
          disabled={disabled}
        />
      ));
    case answerTypes.DROPDOWN:
      return <Dropdown options={question?.options} disabled={disabled} />;
    case answerTypes.PARAGRAPH:
      return (
        <Input
          placeholder="Your answer"
          sx={{ width: "100%", fontSize: 14 }}
          disabled={disabled}
          value={response}
        />
      );
    default:
      return (
        <Input
          placeholder="Your answer"
          sx={{ width: "50%", fontSize: 14 }}
          disabled={disabled}
          value={response}
        />
      );
  }
};

export default Answer;
