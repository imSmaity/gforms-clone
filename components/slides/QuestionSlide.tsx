"use client";
import Api from "@/Api";
import { answerTypes, answerTypes as AnswerTypes } from "@/config/constant";
import { selectForm, updateQuestions } from "@/lib/redux/form/formSlice";
import { IOption, IQuestion } from "@/lib/redux/form/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { deleteQuestionUtil } from "@/utils/deleteQuestion";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { Box, Grid, IconButton, SelectChangeEvent } from "@mui/material";
import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import CheckboxGrid from "../card/AnswerCards/CheckboxGrid";
import Date from "../card/AnswerCards/Date";
import FileUpload from "../card/AnswerCards/FileUpload";
import LinearScale from "../card/AnswerCards/LinearScale";
import MultipleChoice from "../card/AnswerCards/MultipleChoice";
import MultipleChoiceGrid from "../card/AnswerCards/MultipleChoiceGrid";
import Paragraph from "../card/AnswerCards/Paragraph";
import ShortAnswer from "../card/AnswerCards/ShortAnswer";
import Time from "../card/AnswerCards/Time";
import CardFooter from "../card/CardFooter";
import QuestionCard from "../card/QuestionCard";
import Input2, { InputVariant } from "../input/Input";
import QuestionTypeSelector from "../select/QuestionTypeSelector";

interface IAnswerComponentProps {
  questionType: string;
  options?: IOption[];
  setOptions?: (options: IOption[]) => void;
}

interface IQuestionSlideProps {
  _id: string;
  label: JSONContent;
  value: JSONContent;
  required?: boolean;
  type: string;
  options?: IOption[];
  activeCard: string;
  setActiveCard: (v: string) => void;
  handleSaveQuestion: ({ _id, data }: { _id: string; data: any }) => void;
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
      return options ? (
        <MultipleChoice
          options={options}
          setOptions={setOptions}
          type={answerTypes.DROPDOWN}
        />
      ) : null;
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
  required,
  activeCard,
  setActiveCard,
  handleSaveQuestion,
}: IQuestionSlideProps) => {
  const { form, questions } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();
  const initialOptions = options ? options : [];
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [requiredState, setRequiredState] = useState<boolean>(
    Boolean(required)
  );
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

  const handleRequired = (value: boolean) => {
    setRequiredState(value);
    const data = {
      required: value,
    };
    handleSaveQuestion({ _id, data });
  };

  const handleDeleteQuestion = (_id: string, questions: IQuestion[] | null) => {
    if (questions) {
      const items = deleteQuestionUtil(_id, questions);
      dispatch(updateQuestions(items));

      Api.deleteQuestion({ _id, formId: String(form?._id) }).catch((error) => {
        console.error(error);
        dispatch(updateQuestions(questions));
      });
    }
  }; //Handle question delete

  const isActive = activeCard === _id;
  return (
    <QuestionCard
      sx={{ width: "100%" }}
      isActive={isActive}
      handleActive={() => setActiveCard(_id)}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        tabIndex={0} // Makes Box focusable
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
            />
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: isActive ? "flex" : "none",
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
            <Box sx={{ display: isActive ? "flex" : "none" }}>
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
        {isActive ? (
          <CardFooter
            required={requiredState}
            handleDeleteQuestion={() => handleDeleteQuestion(_id, questions)}
            handleRequired={handleRequired}
          />
        ) : null}
      </Box>
    </QuestionCard>
  );
};

export default QuestionSlide;
