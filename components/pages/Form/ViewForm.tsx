"use client";
import Api from "@/Api";
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
import { getFormAnswers, saveAnswer } from "@/lib/redux/responder/thunk";
import { IAnswer } from "@/lib/redux/responder/types";
import { selectUser } from "@/lib/redux/user/userSlice";
import { Box, Button, Input, LinearProgress } from "@mui/material";
import Underline from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { redirect, useParams } from "next/navigation";
import { CSSProperties, useCallback, useLayoutEffect, useState } from "react";
import Content from "../components/Content";
import Answer from "../components/Answer";
import { toObject } from "@/utils/modifyObjects";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { ISaveAnswerAsync } from "@/lib/redux/form/types";

export default function ViewForm() {
  const user = useAppSelector(selectUser);
  const { form, getAsyncStatus } = useAppSelector(selectForm);
  const { answers } = useAppSelector(selectResponder);
  const [submitting, setSubmitting] = useState(false);
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

  if (!isLoading && !form) {
    //if form id not found
    redirect("/");
  }

  const handleSaveAnswer = useCallback(
    _.debounce((_id: string, response: string[]) => {
      console.log(_id, response);
      const body: ISaveAnswerAsync = {
        _id,
        userId,
        formId,
        data: response,
      };
      dispatch(saveAnswer(body));
    }, 700),
    []
  );

  const handleFormSubmit = () => {
    setSubmitting(true);
    Api.submitForm({ formId, responserId: userId })
      .then((res) => console.log)
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

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
        pt: 10,
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
              <Content value={toObject(answer.question?.label)} />
              <Answer
                answerId={answer._id}
                handleSaveAnswer={handleSaveAnswer}
                {...answer}
              />
            </Box>
          </QuestionCard>
        );
      })}
      <Button
        variant="contained"
        disabled={submitting}
        sx={{ textTransform: "none" }}
        onClick={handleFormSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}
