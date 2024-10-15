import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { answerTypes as AnswerTypes } from "@/config/constant";

export const questionTypes = [
  {
    id: 1,
    label: "Short answer",
    value: AnswerTypes.SORT_ANSWER,
    icon: <ShortTextIcon sx={{ color: "#5f6367" }} />,
    visible: true,
  },
  {
    id: 2,
    label: "Paragraph",
    value: AnswerTypes.PARAGRAPH,
    icon: <SubjectIcon sx={{ color: "#5f6367" }} />,
    visible: true,
  },
  {
    divider: true,
    id: 3,
  },
  {
    id: 4,
    label: "Multiple choice",
    value: AnswerTypes.MULTIPLE_CHOICE,
    icon: <RadioButtonCheckedIcon sx={{ color: "#5f6367" }} />,
    visible: true,
  },
  {
    id: 5,
    label: "Checkboxes",
    value: AnswerTypes.CHECKBOXES,
    icon: <CheckBoxOutlinedIcon sx={{ color: "#5f6367" }} />,
    visible: true,
  },
  {
    id: 6,
    label: "Dropdown",
    value: AnswerTypes.DROPDOWN,
    icon: <ExpandCircleDownOutlinedIcon sx={{ color: "#5f6367" }} />,
    visible: true,
  },
  {
    divider: true,
    id: 7,
  },
  {
    id: 8,
    label: "File upload",
    value: AnswerTypes.FILE_UPLOAD,
    icon: <CloudUploadOutlinedIcon sx={{ color: "#5f6367" }} />,
  },
  {
    divider: true,
    id: 9,
  },
  {
    id: 10,
    label: "Linear scale",
    value: AnswerTypes.LINEAR_SCALE,
    icon: <LinearScaleOutlinedIcon sx={{ color: "#5f6367" }} />,
  },
  {
    id: 11,
    label: "Multiple choice grid",
    value: AnswerTypes.MULTIPLE_CHOICE_GRID,
    icon: <ViewCompactRoundedIcon sx={{ color: "#5f6367" }} />,
  },
  {
    id: 12,
    label: "Checkbox grid",
    value: AnswerTypes.CHECKBOX_GRID,
    icon: <AppsOutlinedIcon sx={{ color: "#5f6367" }} />,
  },
  {
    divider: true,
    id: 13,
  },
  {
    id: 14,
    label: "Date",
    value: AnswerTypes.DATE,
    icon: <InsertInvitationOutlinedIcon sx={{ color: "#5f6367" }} />,
  },
  {
    id: 15,
    label: "Time",
    value: AnswerTypes.TIME,
    icon: <AccessTimeOutlinedIcon sx={{ color: "#5f6367" }} />,
  },
];
