"use client";
import React, { useState } from "react";
import Input2, { InputVariant } from "../input/Input2";
import QuestionCard from "../card/QuestionCard";
import { Box, Grid } from "@mui/material";
import QuestionTypeSelector from "../select/QuestionTypeSelector";

const QuestionSlide = () => {
  const [activeInput, setActiveInput] = useState<boolean>(false);

  return (
    <QuestionCard>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <Input2
              placeholder="Question"
              variant={InputVariant.FILLED}
              isShowBulletedList
              isShowNumberedList
              fontSize={14}
              active={activeInput}
              onFocus={() => setActiveInput(true)}
              onBlur={() => setActiveInput(() => false)}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <QuestionTypeSelector />
          </Grid>
        </Grid>
      </Box>
    </QuestionCard>
  );
};

export default QuestionSlide;
