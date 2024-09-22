import { Box } from "@mui/material";
import HeaderSlide from "@/components/slides/HeaderSlide";

export default function Home() {
  return (
    <div>
      <main>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 15 }}>
          <HeaderSlide />
        </Box>
      </main>
    </div>
  );
}
