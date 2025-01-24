"use client";
import Api from "@/Api";
import QuestionCard from "@/components/card/QuestionCard";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import { getActiveForm, getViewForm } from "@/lib/redux/form/thunk";
import { ISaveAnswerAsync } from "@/lib/redux/form/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectResponder } from "@/lib/redux/responder/responderSlice";
import { getFormAnswers, saveAnswer } from "@/lib/redux/responder/thunk";
import { selectUser } from "@/lib/redux/user/userSlice";
import { toObject } from "@/utils/modifyObjects";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import _ from "lodash";
import { redirect, useParams } from "next/navigation";
import React, { useCallback, useLayoutEffect, useState } from "react";
import Answer from "../components/Answer";
import Content from "../components/Content";
import Navbar from "@/components/navbar/Navbar";

export default function ViewForm() {
  const { user } = useAppSelector(selectUser);
  const { form, formViewAsync } = useAppSelector(selectForm);
  const { answers } = useAppSelector(selectResponder);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const params = useParams();
  const formId = String(params?.id);
  const userId = user?._id || "";
  const isLoading =
    formViewAsync === STATUS.PENDING || formViewAsync === STATUS.IDLE;
  useLayoutEffect(() => {
    if (userId && formId) {
      dispatch(getViewForm({ _id: formId, userId }))
        .unwrap()
        .then((res) => {
          const form = res?.data;
          if (form && userId !== form?.userId) {
            dispatch(getFormAnswers({ formId: form?._id, userId }));
          }
        })
        .catch(console.log);
    }
  }, [userId, formId]);

  if (user && user._id === form?.userId) {
    redirect(`/forms/${formId}`);
  }

  if (!isLoading && !form) {
    //if form id not found
    redirect("/");
  }

  const handleSaveAnswer = useCallback(
    _.debounce((_id: string, response: string[]) => {
      const body: ISaveAnswerAsync = {
        _id,
        userId,
        formId,
        data: response,
      };
      dispatch(saveAnswer(body));
    }, 700),
    [formId, userId]
  );

  const handleFormSubmit = () => {
    setSubmitting(true);
    Api.submitForm({ formId, responserId: userId })
      .then((res) => console.log)
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

  return (
    <React.Fragment>
      <LinearProgress sx={{ display: isLoading ? "block" : "none" }} />
      <Box
        sx={{
          display: isLoading ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
          gap: 2,
        }}
      >
        <QuestionCard>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {form ? (
              <>
                <Content value={form?.header} style={{ fontSize: 24 }} />
                <Content value={form?.description} />
              </>
            ) : null}
          </Box>
        </QuestionCard>
        {answers?.map((answer) => {
          return (
            <QuestionCard key={answer._id}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Content value={toObject(answer.question?.label)} />
                  <Typography
                    sx={{
                      display: answer.question.required ? "flex" : "none",
                      color: "red",
                    }}
                  >
                    *
                  </Typography>
                </Box>
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
    </React.Fragment>
  );
}
