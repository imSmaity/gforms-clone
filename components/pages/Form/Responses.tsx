import Api from "@/Api";
import QuestionCard from "@/components/card/QuestionCard";
import { selectForm } from "@/lib/redux/form/formSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { IAnswer } from "@/lib/redux/responder/types";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import Answer from "../components/Answer";

const Responses = () => {
  const [activeResponse, setActiveResponse] = useState(1);
  const [answers, setAnswers] = useState<IAnswer[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { form } = useAppSelector(selectForm);
  const formId = form?._id;

  const fetchFormResponses = (page: number = 1) => {
    setLoading(true);
    const responserId = form?.responsesUsers[page - 1];
    const userId = form?.userId;
    const reqBody = {
      formId,
      responserId,
      userId,
    };

    if (formId && responserId && userId)
      Api.getIndividualResponses(reqBody)
        .then((res: any) => setAnswers(res.response))
        .catch(console.error)
        .finally(() => {
          setActiveResponse(page);
          setLoading(false);
        });
  };

  const handleFetchResponses = (page: number = 1) => {
    if (page == activeResponse) return;
    fetchFormResponses();
  };

  useEffect(() => {
    fetchFormResponses(activeResponse);
  }, []);

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
      <Stack spacing={2} sx={{ position: "fixed", backgroundColor: "#ffffff" }}>
        <Pagination
          count={form?.responsesUsers.length}
          onChange={(e, page) => handleFetchResponses(page)}
        />
      </Stack>
      {!loading ? (
        answers?.map((answer) => {
          return (
            <QuestionCard key={answer._id}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Content value={answer.question?.label} />
                <Answer {...answer} disabled={true} />
              </Box>
            </QuestionCard>
          );
        })
      ) : (
        <Box
          sx={{
            height: 500,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Responses;
