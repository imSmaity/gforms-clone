"use client";
import React, { useEffect } from "react";
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
import { apiConfig } from "@/config/apiConfig";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectUser, STATUS } from "@/lib/redux/user/userSlice";
import { encodeURL } from "@/utils/secureUrl";
import { usePathname } from "next/navigation";
import _localStorage from "@/utils/_localStorage";
import { constant } from "@/config/constant";
import { userSession } from "@/lib/redux/user/thunk";

interface IAlertSignInProps {}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 350,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AlertSignIn = ({}: IAlertSignInProps) => {
  const path = usePathname();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isOpen =
    user.loginStatus === STATUS.IDLE || user.loginStatus === STATUS.REJECTED;
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${apiConfig.googleAuth.clientId}&state=${path}&response_type=code&scope=openid email profile&redirect_uri=${apiConfig.googleAuth.redirectURL}&prompt=consent&include_granted_scopes=true`;

  useEffect(() => {
    const access_token = _localStorage.get(constant.localStorageKeys.authKey);
    if (access_token) {
      dispatch(userSession({ access_token }));
    }
  }, []);

  if (!isOpen) return null;
  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
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
        <Link href={authUrl}>
          <Button autoFocus>Sign In</Button>
        </Link>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AlertSignIn;
