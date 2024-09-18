import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

interface IQuestionCardProps {
  children: React.ReactNode;
}

export default function ImgMediaCard({ children }: IQuestionCardProps) {
  return (
    <Card sx={{ width: 600 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
