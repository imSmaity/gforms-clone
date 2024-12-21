"use client";
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
import { TextField } from "@mui/material";

interface IShareModal {
  open: boolean;
  handleClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ShareModal = ({ open, handleClose }: IShareModal) => {
  const [url, setUrl] = React.useState<string>("");
  React.useEffect(() => {
    if (window) {
      const link = `${window?.location?.href}/viewform`;
      setUrl(link);
    }
  }, []);

  const handleCopy = () => {
    if (navigator) {
      navigator.clipboard.writeText(url).then().catch(console.log);
    }
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Send form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>Link</Typography>
          <TextField
            sx={{ width: 450 }}
            InputProps={{ style: { fontSize: "14px" } }}
            inputMode="url"
            variant="standard"
            onChange={() => {}}
            focused
            value={url}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleCopy}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Copy
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ShareModal;
