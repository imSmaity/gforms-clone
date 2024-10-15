"use client";
import React, { useState } from "react";
import Input from "../input/Input";
import QuestionCard from "../card/QuestionCard";
import { Box } from "@mui/material";

interface ActiveInput {
  title: boolean;
  description: boolean;
}

const HeaderSlide = () => {
  const [activeInput, setActiveInput] = useState<ActiveInput>({
    title: false,
    description: false,
  });

  return (
    <QuestionCard
      sx={{
        borderTop: "10px solid #4285f4",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Input
          placeholder="Form title"
          active={activeInput.title}
          onFocus={() => setActiveInput({ title: true, description: false })}
          onBlur={() => setActiveInput((prev) => ({ ...prev, title: false }))}
        />
        <Input
          placeholder="Form description"
          isShowBulletedList
          isShowNumberedList
          fontSize={14}
          active={activeInput.description}
          onFocus={() => setActiveInput({ title: false, description: true })}
          onBlur={() =>
            setActiveInput((prev) => ({ ...prev, description: false }))
          }
        />
      </Box>
    </QuestionCard>
  );
};

export default HeaderSlide;
