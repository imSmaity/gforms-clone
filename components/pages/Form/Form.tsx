"use client";
import AddQuestion from "@/components/card/AddQuestion";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import {
  autoSave,
  getActiveForm,
  getFormQuestions,
  saveFormQuestion,
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
import { IQuestion, ISaveQuestionAsync } from "@/lib/redux/form/types";

export default function Form() {
  const user = useAppSelector(selectUser);
  const { form, getAsyncStatus, questions } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const [activeQuestions, setActiveQuestions] = useState<IQuestion[] | null>(
    questions
  );

  const params = useParams();
  const formId = String(params?.id);
  const userId = user._id;
  const isLoading =
    getAsyncStatus === STATUS.PENDING || getAsyncStatus === STATUS.IDLE;

  useLayoutEffect(() => {
    if (userId && formId) {
      dispatch(getActiveForm({ _id: formId, userId }));
    }
  }, []);

  useLayoutEffect(() => {
    if (formId && !questions) {
      dispatch(getFormQuestions({ formId }));
    }

    if (questions && !activeQuestions) {
      setActiveQuestions(questions);
    }
  }, [questions]);

  if (!isLoading && !form) {
    //if form id not found
    redirect("/");
  }

  const addQuestions = () => {
    const initialData = { label: {}, options: [], type: "multiple_choice" };
    if (Array.isArray(activeQuestions))
      setActiveQuestions([
        ...activeQuestions,
        { tempId: uuid(), ...initialData },
      ]);
    dispatch(saveFormQuestion({ userId, formId, data: initialData }));
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
      handleSave(data);
    }
  };

  const handleChangeQuestionData = ({
    _id,
    data,
  }: {
    _id?: string;
    data: IQuestion;
  }) => {
    const submittingData: ISaveQuestionAsync = {
      _id,
      userId: userId,
      formId: formId,
      data,
    };
    handleSaveQuestion(submittingData);
  };

  const handleSaveQuestion = useCallback(
    _.debounce((data) => dispatch(saveFormQuestion(data)), 1000),
    []
  );

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
              _id={question._id}
              label={question.label}
              key={question._id || question?.tempId}
              type={question.type}
              value={question.label}
              options={question.options}
              handleSaveQuestion={handleChangeQuestionData}
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
