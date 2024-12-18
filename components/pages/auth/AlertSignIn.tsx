import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 350,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AlertSignIn = () => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: "700" }}
        id="customized-dialog-title"
      >
        Sign in to continue
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom sx={{ fontSize: 14 }}>
          To fill out this form, you must be signed in. Your identity will
          remain anonymous.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=1058417054516-j0ffa468ar087q33cedj6ers4711rauu.apps.googleusercontent.com&response_type=code&state=state_parameter_passthrough_value&scope=openid email profile&redirect_uri=http://localhost:3000/forms/auth&prompt=consent&include_granted_scopes=true`}
        >
          <Button autoFocus onClick={handleClose}>
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AlertSignIn;
