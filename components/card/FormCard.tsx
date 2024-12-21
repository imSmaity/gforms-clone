import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/public/icons/half_logo.png";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

interface IFormCardProps {
  title: string;
}

interface IHeaderDisplaySlideProps {
  title: string;
}

const HeaderDisplaySlide = ({ title }: IHeaderDisplaySlideProps) => {
  return (
    <Box>
      <Box
        sx={{
          borderTop: "5px solid #4285f4",
          width: "120px",
          opacity: 0.8,
          marginTop: "5px",
          borderRadius: "3px",
          padding: "5px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography sx={{ fontSize: "8px" }}>{title}</Typography>
        <Divider />
        <Typography sx={{ fontSize: "4px" }}>{"description"}</Typography>
      </Box>
      <Typography sx={{ fontSize: "6px", textAlign: "center", padding: 1 }}>
        {"Google Forms"}
      </Typography>
    </Box>
  );
};

const FormCard = ({ title }: IFormCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 0,
        border: "1px solid #fbfbfb",
        borderColor: "#bbbbbb",
        borderRadius: "5px",
        width: "200px",
        height: "235px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e0f2f7",
          height: "100%",
          marginBottom: "10px",
        }}
      >
        <HeaderDisplaySlide title={title} />
      </Box>
      <Box sx={{ p: "15px", borderTop: "1px solid #bbbbbb" }}>
        <Typography sx={{ fontSize: "14px" }}>{title}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ width: "10x", height: "20px" }}>
            <Image src={logo} alt="Logo" width={20} height={20} />
          </Box>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default FormCard;
