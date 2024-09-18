import Input from "@/components/input/Input";

import QuestionCard from "@/components/card/QuestionCard";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <div>
      <main>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <QuestionCard>
            <Input width={"100%"} />
          </QuestionCard>
        </Box>
      </main>
    </div>
  );
}
