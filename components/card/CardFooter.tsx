import { Box, Divider, IconButton, Switch } from "@mui/material";
import React from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const CardFooter = () => {
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
        <IconButton>
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
