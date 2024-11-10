"use client";
import { useAppSelector } from "@/lib/redux/hooks";
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
  title: string;
  description?: string;
}

const Input = dynamic(() => import("../input/Input"));

const HeaderSlide = ({ title }: IHeaderSlideProps) => {
  const [activeInput, setActiveInput] = useState<ActiveInput>({
    title: false,
    description: false,
  });

  const form = useAppSelector((state) => state.formSlice);

  const handleSetValue = (value: JSONContent) => {
    if (
      value?.content &&
      value?.content[0].content &&
      value?.content[0].content[0]?.text
    ) {
      // const title = value?.content[0].content[0]?.text;
      console.log(title);
    }
  };

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
          value={form.title}
          setValue={handleSetValue}
          onFocus={() => setActiveInput({ title: true, description: false })}
          onBlur={() => setActiveInput((prev) => ({ ...prev, title: false }))}
        />
        <Input
          placeholder="Form description"
          isShowBulletedList
          isShowNumberedList
          fontSize={14}
          active={activeInput.description}
          value={""}
          setValue={() => {}}
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
