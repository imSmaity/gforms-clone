import Card from "@mui/material/Card";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { IconButton } from "@mui/material";

interface IAddQuestions {
  handleAddQuestions: () => void;
}

const AddQuestion = ({ handleAddQuestions }: IAddQuestions) => {
  return (
    <Card sx={{ padding: 0.5 }}>
      <IconButton onClick={handleAddQuestions}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Card>
  );
};

export default AddQuestion;
