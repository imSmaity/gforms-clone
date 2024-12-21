"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { googleSignIn } from "@/lib/redux/user/thunk";
import { selectUser, STATUS } from "@/lib/redux/user/userSlice";
import { Box, CircularProgress } from "@mui/material";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Verify = () => {
  const { loginStatus, user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirectPath = String(searchParams.get("state"));
  const isLogin = loginStatus == STATUS.FULFILLED && user;

  useEffect(() => {
    if (redirectPath && isLogin) {
      redirect(redirectPath);
    }
    if (!isLogin && code) {
      dispatch(googleSignIn({ code }));
    }
  }, [redirectPath, isLogin, code]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Verify;
