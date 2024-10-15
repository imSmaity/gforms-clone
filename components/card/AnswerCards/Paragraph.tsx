import { answerTypes, constant } from "@/config/constant";
import { Box } from "@mui/material";
import React from "react";

const Paragraph = () => {
  return (
    <Box
      sx={{ borderBottom: "1px", borderBottomStyle: "dotted", maxWidth: "85%" }}
    >
      {constant.answers.inactive_placeholder[answerTypes.PARAGRAPH]}
    </Box>
  );
};

export default Paragraph;
