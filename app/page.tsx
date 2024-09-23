import { Box } from "@mui/material";
import HeaderSlide2 from "@/components/slides/HeaderSlide2";
import QuestionSlide from "@/components/slides/QuestionSlide";

export default function Home() {
  return (
    <div>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 15,
            gap: 2,
          }}
        >
          <HeaderSlide2 />
          <QuestionSlide />
        </Box>
      </main>
    </div>
  );
}
