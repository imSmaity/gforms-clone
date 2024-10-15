"use client";
import { Box } from "@mui/material";
import HeaderSlide from "@/components/slides/HeaderSlide";
import QuestionSlide from "@/components/slides/QuestionSlide";
import AddQuestion from "@/components/card/AddQuestion";
import { useState } from "react";
import { v1 as uuid } from "uuid";

export default function Home() {
  const [questions, setQuestions] = useState([{ id: uuid() }]);

  const addQuestions = () => setQuestions([...questions, { id: uuid() }]);

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
          <HeaderSlide />
          {questions.map((question) => (
            <QuestionSlide key={question.id} />
          ))}
          <Box sx={{ position: "fixed", left: "78%", bottom: 10 }}>
            <AddQuestion handleAddQuestions={addQuestions} />
          </Box>
        </Box>
      </main>
    </div>
  );
}
