"use client";
import { Box } from "@mui/material";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SyntheticEvent } from "react";
import RichTextButtons from "../richText/RichTextButtons";
import "./style.css";

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
  setValue: (value: JSONContent) => void;
  value?: string | number | readonly string[] | undefined;
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
  setValue,
  value,
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
    immediatelyRender: false,
    onUpdate({ editor }) {
      setValue(editor.getJSON());
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
        value={value}
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
