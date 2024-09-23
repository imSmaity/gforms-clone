"use client";
import { constant } from "@/config/constant";
import { Box } from "@mui/material";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";
import QuestionCard from "../card/QuestionCard";
import Input from "../input/Input";
import "./style.css";

interface ActiveInput {
  title: boolean;
  description: boolean;
}

const HeaderSlide = () => {
  const [title, setTitle] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [activeInput, setActiveInput] = useState<ActiveInput>({
    title: false,
    description: false,
  });

  return (
    <QuestionCard sx={{ borderTop: "10px solid #4285f4" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Input
          active={activeInput.title}
          placeholder={constant.header.placeholder.title}
          editorState={title}
          setEditorState={setTitle}
          // sx={{ fontSize: "24px" }}
          onFocus={() => setActiveInput({ title: true, description: false })}
          onBlur={() => setActiveInput((prev) => ({ ...prev, title: false }))}
        />
        <Input
          active={activeInput.description}
          placeholder={constant.header.placeholder.description}
          editorState={description}
          setEditorState={setDescription}
          isShowNumberedList={true}
          isShowBulletedList={true}
          // sx={{ fontSize: "12px" }}
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
