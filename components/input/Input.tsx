import { Box, SxProps, Theme } from "@mui/material";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { SyntheticEvent } from "react";
import RichTextButtons from "../richText/RichTextButtons";
import "./style.css";

interface IInputProps {
  editorState: EditorState;
  placeholder?: string;
  active?: boolean;
  setEditorState: (editorState: EditorState) => void;
  onBlur?: (e: SyntheticEvent) => void;
  onFocus?: (e: SyntheticEvent) => void;
  sx?: SxProps<Theme>;
  isShowNumberedList?: boolean;
  isShowBulletedList?: boolean;
}

const styleMap = {
  FONT_FAMILY_ROBOTO: {
    fontFamily: "Roboto, sans-serif",
  },
  FONT_FAMILY_ARIAL: {
    fontFamily: "Arial, sans-serif",
  },
  FONT_FAMILY_GEORGIA: {
    fontFamily: "Georgia, serif",
  },
  FONT_FAMILY_COURIER: {
    fontFamily: "Courier New, monospace",
  },
};

const Input = ({
  editorState,
  placeholder,
  setEditorState,
  onBlur,
  onFocus,
  active,
  isShowNumberedList,
  isShowBulletedList,
  sx,
}: IInputProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          paddingBottom: "5px",
          borderBottom: active ? "2px solid #4e6da0" : "1px solid #f2f2f2",
          ...sx,
        }}
      >
        <Editor
          placeholder={placeholder}
          editorState={editorState}
          onChange={setEditorState}
          onBlur={onBlur}
          onFocus={onFocus}
          customStyleMap={styleMap}
        />
      </Box>
      <Box sx={{ display: active ? "flex" : "none" }}>
        <RichTextButtons
          isShowNumberedList={isShowNumberedList}
          isShowBulletedList={isShowBulletedList}
          value={editorState}
          setValue={setEditorState}
        />
      </Box>
    </Box>
  );
};

export default Input;
