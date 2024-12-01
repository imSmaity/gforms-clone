"use client";
import MultipleChoice from "@/components/card/AnswerCards/MultipleChoice";
import QuestionCard from "@/components/card/QuestionCard";
import Dropdown from "@/components/dropdown/Dropdown";
import CheckInput from "@/components/input/CheckInput";
import RadioInput from "@/components/input/RadioInput";
import { answerTypes } from "@/config/constant";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import { getActiveForm } from "@/lib/redux/form/thunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectResponder } from "@/lib/redux/responder/responderSlice";
import { getFormAnswers } from "@/lib/redux/responder/thunk";
import { IAnswer } from "@/lib/redux/responder/types";
import { selectUser } from "@/lib/redux/user/userSlice";
import { Box, Button, Input, LinearProgress } from "@mui/material";
import Underline from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { redirect, useParams } from "next/navigation";
import { CSSProperties, useLayoutEffect } from "react";

interface IContent {
  value: JSONContent;
  style?: CSSProperties;
  className?: string;
}

const Content = ({ value, style, className }: IContent) => {
  const editor = useEditor({
    content: value ? value : "",
    editable: false,
    extensions: [StarterKit, Underline],
    immediatelyRender: true,
  });

  return <EditorContent editor={editor} className={className} style={style} />;
};

const Answer = ({ response, question }: IAnswer) => {
  switch (question?.type) {
    case answerTypes.MULTIPLE_CHOICE:
      return question?.options?.map((option) => (
        <RadioInput
          key={option._id}
          label={option.value}
          checked={option._id == response}
        />
      ));
    case answerTypes.CHECKBOXES:
      return question?.options?.map((option) => (
        <CheckInput
          key={option._id}
          label={option.value}
          checked={option._id == response}
        />
      ));
    case answerTypes.DROPDOWN:
      return <Dropdown options={question?.options} />;
    case answerTypes.PARAGRAPH:
      return (
        <Input
          placeholder="Your answer"
          sx={{ width: "100%", fontSize: 14 }}
          value={response}
        />
      );
    default:
      return (
        <Input
          placeholder="Your answer"
          sx={{ width: "50%", fontSize: 14 }}
          value={response}
        />
      );
  }
};

export default function ViewForm() {
  const user = useAppSelector(selectUser);
  const { form, getAsyncStatus } = useAppSelector(selectForm);
  const { answers } = useAppSelector(selectResponder);
  const dispatch = useAppDispatch();

  const params = useParams();
  const formId = String(params?.id);
  const userId = user._id;
  const isLoading =
    getAsyncStatus === STATUS.PENDING || getAsyncStatus === STATUS.IDLE;

  useLayoutEffect(() => {
    if (userId && formId) {
      dispatch(getActiveForm({ _id: formId, userId }));
      dispatch(getFormAnswers({ formId, userId }));
    }
  }, []);

  console.log(answers);
  if (!isLoading && !form) {
    //if form id not found
    redirect("/");
  }

  if (isLoading)
    return (
      <Box sx={{ pt: 15 }}>
        <LinearProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 15,
        gap: 2,
      }}
    >
      <QuestionCard>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Content value={form ? form.header : {}} style={{ fontSize: 24 }} />
          <Content value={form ? form.description : {}} />
        </Box>
      </QuestionCard>
      {answers?.map((answer) => {
        return (
          <QuestionCard key={answer._id}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Content value={answer.question?.label} />
              <Answer {...answer} />
            </Box>
          </QuestionCard>
        );
      })}
      <Button variant="contained">Submit</Button>
    </Box>
  );
}
