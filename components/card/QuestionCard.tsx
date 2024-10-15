// import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SxProps, Theme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

interface IQuestionCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onBlur?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
}

export default function QuestionCard({
  children,
  sx,
  onBlur,
  onFocus,
}: IQuestionCardProps) {
  // const { ref, isActive } = useOutsideClick();

  return (
    <Card
      // ref={ref}
      id="form-card"
      sx={{
        width: "55%",
        // borderLeft: isActive ? "5px solid #4285f4" : "0",
        borderRadius: 2,
        ...sx,
      }}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
