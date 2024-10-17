"use client";
import React, { useState } from "react";
import Input2, { InputVariant } from "../input/Input";
import QuestionCard from "../card/QuestionCard";
import { Box, Grid, IconButton, SelectChangeEvent } from "@mui/material";
import QuestionTypeSelector from "../select/QuestionTypeSelector";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { answerTypes as AnswerTypes } from "@/config/constant";
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

interface IAnswerComponentProps {
  questionType: string;
}

const AnswerComponent = ({ questionType }: IAnswerComponentProps) => {
  switch (questionType) {
    case AnswerTypes.SORT_ANSWER:
      return <ShortAnswer />;
    case AnswerTypes.PARAGRAPH:
      return <Paragraph />;
    case AnswerTypes.MULTIPLE_CHOICE:
      return <MultipleChoice />;
    case AnswerTypes.CHECKBOXES:
      return <Checkboxes />;
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

const QuestionSlide = () => {
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<boolean>(false);
  const [questionType, setQuestionType] = useState(AnswerTypes.MULTIPLE_CHOICE);

  const handleChangeAnswerType = (event: SelectChangeEvent<string>) => {
    setQuestionType(event.target.value);
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
                handleChange={handleChangeAnswerType}
              />
            </Box>
          </Grid>
        </Grid>
        <AnswerComponent questionType={questionType} />
        {activeCard ? <CardFooter /> : null}
      </Box>
    </QuestionCard>
  );
};

export default QuestionSlide;
