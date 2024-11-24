"use client";
import QuestionCard from "@/components/card/QuestionCard";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import { getActiveForm } from "@/lib/redux/form/thunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectResponder } from "@/lib/redux/responder/responderSlice";
import { getFormAnswers } from "@/lib/redux/responder/thunk";
import { selectUser } from "@/lib/redux/user/userSlice";
import { Box, Input, LinearProgress, Typography } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { useLayoutEffect } from "react";

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
        <Typography>Label</Typography>
        <Input placeholder="type text" />
      </QuestionCard>
    </Box>
  );
}
