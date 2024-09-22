import { SxProps, Theme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

interface IQuestionCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function QuestionCard({ children, sx }: IQuestionCardProps) {
  return (
    <Card sx={{ width: "55%", py: 2, borderRadius: 2, ...sx }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
