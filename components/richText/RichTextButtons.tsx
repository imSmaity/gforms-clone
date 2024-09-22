import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Box, IconButton, TextField } from "@mui/material";
import { EditorState, RichUtils } from "draft-js";
import LinkAddModal from "../modal/FormModal";
import { useState } from "react";

enum InlineStyle {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
}

enum BlockType {
  ORDERED_LIST = "ordered-list-item",
  UNORDERED_LIST = "unordered-list-item",
}

interface IRichTextButtonsProps {
  value: EditorState;
  setValue: (editorState: EditorState) => void;
  isShowNumberedList?: boolean;
  isShowBulletedList?: boolean;
}

const RichTextButtons = ({
  value,
  setValue,
  isShowBulletedList,
  isShowNumberedList,
}: IRichTextButtonsProps) => {
  const [isLinkAdd, setIsLinkAdd] = useState<boolean>(false);
  const currentInlineStyle = value.getCurrentInlineStyle();
  const currentBlockType = RichUtils.getCurrentBlockType(value);

  const toggleInlineStyle = (value: EditorState, inlineStyle: string) => {
    setValue(RichUtils.toggleInlineStyle(value, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    setValue(RichUtils.toggleBlockType(value, blockType));
  };

  // const addLink = (link: string) => {
  //   const selection = value.getSelection();

  //   if (!link) {
  //     return;
  //   }

  //   const contentState = value.getCurrentContent();
  //   const contentStateWithLink = contentState.createEntity("LINK", "MUTABLE", {
  //     url: link,
  //   });

  //   const entityKey = contentStateWithLink.getLastCreatedEntityKey();
  //   const newEditorState = EditorState.push(
  //     value,
  //     contentStateWithLink,
  //     "apply-entity"
  //   );

  //   setValue(RichUtils.toggleLink(newEditorState, selection, entityKey));
  // };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        sx={{
          backgroundColor: currentInlineStyle.has(InlineStyle.BOLD)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => toggleInlineStyle(value, "BOLD")}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: currentInlineStyle.has(InlineStyle.ITALIC)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => toggleInlineStyle(value, "ITALIC")}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: currentInlineStyle.has(InlineStyle.UNDERLINE)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => toggleInlineStyle(value, "UNDERLINE")}
      >
        <FormatUnderlinedIcon />
      </IconButton>
      {/* <IconButton
        onClick={() => setIsLinkAdd(true)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <LinkIcon />
      </IconButton> */}
      <IconButton
        sx={{
          display: isShowNumberedList ? "flex" : "none",
          backgroundColor:
            currentBlockType === BlockType.ORDERED_LIST ? "#f7f5f5" : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => toggleBlockType("ordered-list-item")}
      >
        <FormatListNumberedIcon />
      </IconButton>
      <IconButton
        sx={{
          display: isShowBulletedList ? "flex" : "none",
          backgroundColor:
            currentBlockType === BlockType.UNORDERED_LIST ? "#f7f5f5" : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => toggleBlockType("unordered-list-item")}
      >
        <FormatListBulletedIcon />
      </IconButton>
      {/* <IconButton>
        <FormatClearIcon />
      </IconButton> */}

      <LinkAddModal
        title="Add Link"
        open={isLinkAdd}
        handleClose={() => setIsLinkAdd(false)}
        secondaryButton={{ handleClick: () => setIsLinkAdd(false) }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            id="standard-basic"
            label="Text to display"
            variant="standard"
          />
          <TextField id="standard-basic" label="Link to" variant="standard" />
        </Box>
      </LinkAddModal>
    </Box>
  );
};

export default RichTextButtons;
