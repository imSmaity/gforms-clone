import TextField from "@mui/material/TextField";

interface IInputProps {
  width: string | number;
}

const Input = ({ width }: IInputProps) => {
  return (
    <TextField sx={{ width: width }} id="standard-basic" variant="standard" />
  );
};

export default Input;
