"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { SyntheticEvent } from "react";
import RichTextButtons from "../richText/RichTextButtons";
import "./style.css";
import { Box } from "@mui/material";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export enum InputVariant {
  STANDARD = "standard",
  OUTLINED = "outlined",
  FILLED = "filled",
}

interface IInputProps {
  active?: boolean;
  onBlur?: (e: SyntheticEvent) => void;
  onFocus?: (e: SyntheticEvent) => void;
  isShowNumberedList?: boolean;
  isShowBulletedList?: boolean;
  fontSize?: number;
  placeholder?: string;
  variant?: InputVariant;
}

const Input = ({
  isShowBulletedList,
  isShowNumberedList,
  fontSize = 24,
  placeholder,
  onBlur,
  onFocus,
  active,
  variant = InputVariant.STANDARD,
}: IInputProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Placeholder.configure({ placeholder })],
    content: "",
    editorProps: {
      attributes: {
        class: `${
          variant === InputVariant.STANDARD
            ? "standard-editor"
            : "filled-editor"
        } editor-font-${fontSize} ${
          active ? "active-input" : "inactive-input"
        }`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <EditorContent
        onBlur={onBlur}
        onFocus={onFocus}
        className="editor-container"
        editor={editor}
      />
      <Box sx={{ display: active ? "flex" : "none" }}>
        <RichTextButtons
          editor={editor}
          isShowNumberedList={isShowNumberedList}
          isShowBulletedList={isShowBulletedList}
        />
      </Box>
    </Box>
  );
};

export default Input;
