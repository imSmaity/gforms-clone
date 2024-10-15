import { answerTypes, constant } from "@/config/constant";
import { Box } from "@mui/material";
import React from "react";

const ShortAnswer = () => {
  return (
    <Box
      sx={{ borderBottom: "1px", borderBottomStyle: "dotted", maxWidth: "50%" }}
    >
      {constant.answers.inactive_placeholder[answerTypes.SORT_ANSWER]}
    </Box>
  );
};

export default ShortAnswer;
