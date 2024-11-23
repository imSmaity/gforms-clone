"use client";
import { Box } from "@mui/material";
import { JSONContent } from "@tiptap/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import QuestionCard from "../card/QuestionCard";

interface ActiveInput {
  title: boolean;
  description: boolean;
}

interface IHeaderSlideProps {
  header?: string;
  description?: string;
  handleSetValue: (name: string, value: JSONContent) => void;
}

const Input = dynamic(() => import("../input/Input"));

const HeaderSlide = ({
  header,
  description,
  handleSetValue,
}: IHeaderSlideProps) => {
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
          value={header}
          setValue={(value) => handleSetValue("header", value)}
          onFocus={() => setActiveInput({ title: true, description: false })}
          onBlur={() => setActiveInput((prev) => ({ ...prev, title: false }))}
        />
        <Input
          placeholder="Form description"
          isShowBulletedList
          isShowNumberedList
          fontSize={14}
          active={activeInput.description}
          value={description}
          setValue={(value) => handleSetValue("description", value)}
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
