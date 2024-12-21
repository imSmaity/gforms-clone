"use client";
import Underline from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CSSProperties } from "react";

export interface IContent {
  value: JSONContent;
  style?: CSSProperties;
  className?: string;
}

const Content = ({ value, style, className }: IContent) => {
  const editor = useEditor({
    content: value ? value : "",
    editable: false,
    extensions: [StarterKit, Underline],
    immediatelyRender: true,
  });

  return <EditorContent editor={editor} className={className} style={style} />;
};

export default Content;
