"use client";
import React, { useState } from "react";
import Input2, { InputVariant } from "../input/Input";
import QuestionCard from "../card/QuestionCard";
import { Box, Grid, IconButton, SelectChangeEvent } from "@mui/material";
import QuestionTypeSelector from "../select/QuestionTypeSelector";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { answerTypes, answerTypes as AnswerTypes } from "@/config/constant";
import ShortAnswer from "../card/AnswerCards/ShortAnswer";
import Paragraph from "../card/AnswerCards/Paragraph";
import MultipleChoice from "../card/AnswerCards/MultipleChoice";
import Checkboxes from "../card/AnswerCards/Checkboxes";
import Dropdown from "../card/AnswerCards/Dropdown";
import FileUpload from "../card/AnswerCards/FileUpload";
import LinearScale from "../card/AnswerCards/LinearScale";
import MultipleChoiceGrid from "../card/AnswerCards/MultipleChoiceGrid";
import CheckboxGrid from "../card/AnswerCards/CheckboxGrid";
import Date from "../card/AnswerCards/Date";
import Time from "../card/AnswerCards/Time";
import CardFooter from "../card/CardFooter";
import { IOption, IQuestion } from "@/lib/redux/form/types";
import { JSONContent } from "@tiptap/react";

interface IAnswerComponentProps {
  questionType: string;
  options?: IOption[];
  setOptions?: (options: IOption[]) => void;
}

interface IQuestionSlideProps {
  _id?: string;
  label: JSONContent;
  value: JSONContent;
  type: string;
  options?: IOption[];
  handleSaveQuestion: ({
    _id,
    data,
  }: {
    _id?: string;
    data: IQuestion;
  }) => void;
}

const AnswerComponent = ({
  questionType,
  options,
  setOptions,
}: IAnswerComponentProps) => {
  switch (questionType) {
    case AnswerTypes.SORT_ANSWER:
      return <ShortAnswer />;
    case AnswerTypes.PARAGRAPH:
      return <Paragraph />;
    case AnswerTypes.MULTIPLE_CHOICE:
      return options ? (
        <MultipleChoice options={options} setOptions={setOptions} />
      ) : null;
    case AnswerTypes.CHECKBOXES:
      return options ? (
        <MultipleChoice
          options={options}
          setOptions={setOptions}
          type={answerTypes.CHECKBOXES}
        />
      ) : null;
    case AnswerTypes.DROPDOWN:
      return <Dropdown />;
    case AnswerTypes.FILE_UPLOAD:
      return <FileUpload />;
    case AnswerTypes.LINEAR_SCALE:
      return <LinearScale />;
    case AnswerTypes.MULTIPLE_CHOICE_GRID:
      return <MultipleChoiceGrid />;
    case AnswerTypes.CHECKBOX_GRID:
      return <CheckboxGrid />;
    case AnswerTypes.DATE:
      return <Date />;
    case AnswerTypes.TIME:
      return <Time />;
    default:
      return <ShortAnswer />;
  }
};

const QuestionSlide = ({
  _id,
  type,
  label,
  value,
  options,
  handleSaveQuestion,
}: IQuestionSlideProps) => {
  const initialOptions = options ? options : [];
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<boolean>(false);
  const [questionLabel, setQuestionLabel] = useState<JSONContent>(label);
  const [questionOptions, setQuestionOptions] =
    useState<IOption[]>(initialOptions);
  const [questionType, setQuestionType] = useState(
    type || AnswerTypes.MULTIPLE_CHOICE
  );

  const handleSetLabel = (label: JSONContent) => {
    setQuestionLabel(label);
    const data: IQuestion = {
      label,
      type: questionType,
      options: questionOptions,
    };
    handleSaveQuestion({ _id, data });
  };

  const handleSetType = (event: SelectChangeEvent<string>) => {
    const type = event.target.value;
    setQuestionType(type);
    const data: IQuestion = {
      label: questionLabel,
      type,
      options: questionOptions,
    };
    handleSaveQuestion({ _id, data });
  };

  const handleSetOptions = (options: IOption[]) => {
    setQuestionOptions(options);
    const data: IQuestion = {
      label: questionLabel,
      type: questionType,
      options,
    };
    handleSaveQuestion({ _id, data });
  };

  return (
    <QuestionCard>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        tabIndex={0} // Makes Box focusable
        onFocus={() => setActiveCard(true)}
        onBlur={() => setActiveCard(false)}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <Input2
              placeholder="Question"
              variant={InputVariant.FILLED}
              isShowBulletedList
              isShowNumberedList
              value={value}
              setValue={handleSetLabel}
              fontSize={14}
              active={activeInput}
              onFocus={() => setActiveInput(true)}
              onBlur={() => setActiveInput(false)}
            />
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: activeCard ? "flex" : "none",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <IconButton>
                <InsertPhotoOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: activeCard ? "flex" : "none" }}>
              <QuestionTypeSelector
                value={questionType}
                handleChange={handleSetType}
              />
            </Box>
          </Grid>
        </Grid>
        <AnswerComponent
          questionType={questionType}
          options={questionOptions}
          setOptions={handleSetOptions}
        />
        {activeCard ? <CardFooter /> : null}
      </Box>
    </QuestionCard>
  );
};

export default QuestionSlide;
