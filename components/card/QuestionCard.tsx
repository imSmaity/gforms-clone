// import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SxProps, Theme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

interface IQuestionCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  handleActive?: () => void;
  isActive?: boolean;
}

export default function QuestionCard({
  children,
  sx,
  handleActive,
  isActive,
}: IQuestionCardProps) {
  // const { ref, isActive } = useOutsideClick();
  return (
    <Card
      // ref={ref}
      id="form-card"
      sx={{
        width: { sm: "100%", md: "55%" },
        borderLeft: isActive ? "6px solid #4285f4" : "0",
        borderRadius: 1,
        ...sx,
      }}
      onClick={handleActive}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
