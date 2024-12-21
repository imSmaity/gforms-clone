import { Box, Divider, IconButton, Switch } from "@mui/material";
import React, { MouseEventHandler } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

interface ICardFooterProps {
  handleDeleteQuestion: () => void;
}

const CardFooter = ({ handleDeleteQuestion }: ICardFooterProps) => {
  return (
    <Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: 1,
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <IconButton>
          <ContentCopyOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleDeleteQuestion}>
          <DeleteOutlinedIcon />
        </IconButton>
        <Box sx={{ borderLeft: "1px solid #bbbbbb", height: 30 }} />
        <Box>
          Required <Switch />
        </Box>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardFooter;
