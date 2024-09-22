import { Box, Button, Modal, SxProps, Theme, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface IFormModal {
  open: boolean;
  handleClose: (open: boolean) => void;
  title: string;
  children: ReactNode;
  style?: SxProps<Theme>;
  secondaryButton?: {
    title?: string;
    handleClick: () => void;
  };
  primaryButton?: {
    title?: string;
    handleClick: () => void;
  };
}

const modalStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2.7,
  borderRadius: 3,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const FormModal = ({
  open,
  handleClose,
  title,
  children,
  style = {},
  primaryButton,
  secondaryButton,
}: IFormModal) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, ...style }}>
        <Typography component="h2" sx={{ color: "#000000" }}>
          {title}
        </Typography>
        <Box>{children}</Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ textTransform: "none" }}
            onClick={secondaryButton?.handleClick}
          >
            {secondaryButton?.title || "Cancel"}
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            onClick={primaryButton?.handleClick}
          >
            {primaryButton?.title || "OK"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormModal;
