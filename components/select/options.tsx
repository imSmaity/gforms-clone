import { QuestionValues } from "@/types/types";
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

export const questionTypes = [
  {
    label: "Short answer",
    value: QuestionValues.SORT_ANSWER,
    icon: <ShortTextIcon />,
  },
  {
    label: "Paragraph",
    value: QuestionValues.PARAGRAPH,
    icon: <SubjectIcon />,
  },
  {
    label: "Multiple choice",
    value: QuestionValues.MULTIPLE_CHOICE,
    icon: <RadioButtonCheckedIcon />,
  },
  {
    label: "Checkboxes",
    value: QuestionValues.CHECKBOXES,
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    label: "Dropdown",
    value: QuestionValues.DROPDOWN,
    icon: <ExpandCircleDownOutlinedIcon />,
  },
  {
    label: "File upload",
    value: QuestionValues.FILE_UPLOAD,
    icon: <CloudUploadOutlinedIcon />,
  },
  {
    label: "Linear scale",
    value: QuestionValues.LINEAR_SCALE,
    icon: <LinearScaleOutlinedIcon />,
  },
  {
    label: "Multiple choice grid",
    value: QuestionValues.MULTIPLE_CHOICE_GRID,
    icon: <ViewCompactRoundedIcon />,
  },
  {
    label: "Checkbox grid",
    value: QuestionValues.CHECKBOX_GRID,
    icon: <AppsOutlinedIcon />,
  },
  {
    label: "Date",
    value: QuestionValues.DATE,
    icon: <InsertInvitationOutlinedIcon />,
  },
  {
    label: "Time",
    value: QuestionValues.TIME,
    icon: <AccessTimeOutlinedIcon />,
  },
];
