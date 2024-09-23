import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Box, IconButton } from "@mui/material";
import { Editor } from "@tiptap/react";

enum InlineStyle {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  ORDERED_LIST = "orderedList",
  UNORDERED_LIST = "bulletList",
}

interface IRichTextButtonsProps {
  editor: Editor;
  isShowNumberedList?: boolean;
  isShowBulletedList?: boolean;
}

const RichTextButtons2 = ({
  editor,
  isShowBulletedList,
  isShowNumberedList,
}: IRichTextButtonsProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        sx={{
          backgroundColor: editor.isActive(InlineStyle.BOLD)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: editor.isActive(InlineStyle.ITALIC)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: editor.isActive(InlineStyle.UNDERLINE)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
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
          backgroundColor: editor.isActive(InlineStyle.ORDERED_LIST)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <FormatListNumberedIcon />
      </IconButton>
      <IconButton
        sx={{
          display: isShowBulletedList ? "flex" : "none",
          backgroundColor: editor.isActive(InlineStyle.UNORDERED_LIST)
            ? "#f7f5f5"
            : "none",
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FormatListBulletedIcon />
      </IconButton>
      {/* <IconButton>
        <FormatClearIcon />
      </IconButton> */}

      {/* <LinkAddModal
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
      </LinkAddModal> */}
    </Box>
  );
};

export default RichTextButtons2;
