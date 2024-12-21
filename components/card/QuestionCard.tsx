// import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SxProps, Theme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

interface IQuestionCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  handleActive?: () => void;
}

export default function QuestionCard({
  children,
  sx,
  handleActive,
}: IQuestionCardProps) {
  // const { ref, isActive } = useOutsideClick();

  return (
    <Card
      // ref={ref}
      id="form-card"
      sx={{
        width: { sm: "100%", md: "55%" },
        // borderLeft: isActive ? "5px solid #4285f4" : "0",
        p: 1,
        borderRadius: 2,
        ...sx,
      }}
      onClick={handleActive}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
