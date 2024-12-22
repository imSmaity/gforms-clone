"use client";
import AddQuestion from "@/components/card/AddQuestion";
import Demo from "@/components/Demo";
import DraggableCards from "@/components/drag-and-drop/DraggableCards";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import { selectForm, STATUS } from "@/lib/redux/form/formSlice";
import {
  autoSave,
  getActiveForm,
  getFormQuestions,
  saveFormQuestion,
  updateFormQuestionsPosition,
} from "@/lib/redux/form/thunk";
import { IQuestion, ISaveQuestionAsync } from "@/lib/redux/form/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux/user/userSlice";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Box, Card, LinearProgress } from "@mui/material";
import { JSONContent } from "@tiptap/react";
import _ from "lodash";
import { redirect, useParams } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { v1 as uuid } from "uuid";

export default function Form() {
  const { user } = useAppSelector(selectUser);
  const { form, getAsyncStatus, questions } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const [activeQuestions, setActiveQuestions] = useState<IQuestion[] | null>(
    questions
  );

  const params = useParams();
  const formId = String(params?.id);
  const userId = user?._id || "";
  const isLoading =
    getAsyncStatus === STATUS.PENDING || getAsyncStatus === STATUS.IDLE;

  useLayoutEffect(() => {
    if (userId && formId) {
      dispatch(getActiveForm({ _id: formId, userId }))
        .unwrap()
        .then((res) => {
          const data = res?.data;
          if (data) {
            dispatch(getFormQuestions({ formId: data?._id }))
              .unwrap()
              .then((res) => {
                const data = res?.data;
                setActiveQuestions(data);
              })
              .catch(console.error);
          }
        })
        .catch(console.error);
    }
  }, [userId, formId]);

  useLayoutEffect(() => {
    setActiveQuestions(questions);
  }, [questions]);

  const addQuestions = () => {
    const initialData = { label: {}, options: [], type: "multiple_choice" };
    dispatch(saveFormQuestion({ userId, formId, data: initialData })).unwrap();
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

  const handleUpdatePosition = useCallback(
    _.debounce((data) => dispatch(updateFormQuestionsPosition(data)), 1000),
    []
  );

  if (isLoading)
    return (
      <Box sx={{ pt: 15 }}>
        <LinearProgress />
      </Box>
    );

  const isNotOwnFrom = user && !form && STATUS.FULFILLED;
  if (isNotOwnFrom) {
    redirect(`/forms/${formId}/viewform`);
  }

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
          <DraggableCards
            questions={activeQuestions}
            handleUpdatePosition={handleUpdatePosition}
            formId={formId}
            handleChangeQuestionData={handleChangeQuestionData}
          />
          <Box sx={{ position: "fixed", left: "78%", bottom: 10 }}>
            <AddQuestion handleAddQuestions={addQuestions} />
          </Box>
        </Box>
      </main>
    </div>
  );
}
