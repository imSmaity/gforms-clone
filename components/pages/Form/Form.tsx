"use client";
import AddQuestion from "@/components/card/AddQuestion";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import {
  autoSave,
  getActiveForm,
  getFormQuestions,
} from "@/lib/redux/form/thunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux/user/userSlice";
import { socket } from "@/utils/socket";
import { Box, LinearProgress } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { v1 as uuid } from "uuid";
import { JSONContent } from "@tiptap/react";
import _ from "lodash";
import { IQuestion } from "@/lib/redux/form/types";

export default function Form() {
  const user = useAppSelector(selectUser);
  const { form, getAsyncStatus, questions } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const [activeQuestions, setActiveQuestions] = useState<
    IQuestion[] | undefined
  >(questions?.fields);

  console.log(questions);

  const params = useParams();
  const formId = String(params?.id);
  const questionsRef = form?.questions;
  const userId = user._id;
  const isLoading =
    getAsyncStatus === STATUS.PENDING || getAsyncStatus === STATUS.IDLE;

  useLayoutEffect(() => {
    if (userId && formId) {
      dispatch(getActiveForm({ _id: formId, userId }));
    }
  }, []);

  useLayoutEffect(() => {
    if (questionsRef && formId && !questions) {
      dispatch(getFormQuestions({ _id: questionsRef, formId }));
    }

    if (questions?.fields && !activeQuestions) {
      setActiveQuestions(questions.fields);
    }
  }, [questionsRef, questions?.fields]);

  if (!isLoading && !form) {
    //if form id not found
    redirect("/");
  }

  const addQuestions = () => {
    if (Array.isArray(activeQuestions))
      setActiveQuestions([
        ...activeQuestions,
        { tempId: uuid(), label: "", options: [], type: "multiple_choice" },
      ]);
  };

  const handleSave = useCallback(
    _.debounce((data) => dispatch(autoSave(data)), 1000),
    []
  );

  const handleSetValue = (name: string, value: JSONContent) => {
    if (value) {
      const data = {
        _id: form?._id,
        userId,
        header: name === "header" ? value : form?.header,
        description: name === "description" ? value : form?.description,
      };
      // const title = value?.content[0].content[0]?.text;
      console.log(value);
      handleSave(data);
    }
  };

  if (isLoading)
    return (
      <Box sx={{ pt: 15 }}>
        <LinearProgress />
      </Box>
    );

  return (
    <div>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 15,
            gap: 2,
          }}
        >
          <HeaderSlide
            header={form?.header}
            description={form?.description}
            handleSetValue={handleSetValue}
          />
          {activeQuestions?.map((question) => (
            <QuestionSlide
              key={question._id || question?.tempId}
              type={question.type}
              value={question.label}
              options={question.options}
            />
          ))}
          <Box sx={{ position: "fixed", left: "78%", bottom: 10 }}>
            <AddQuestion handleAddQuestions={addQuestions} />
          </Box>
        </Box>
      </main>
    </div>
  );
}
