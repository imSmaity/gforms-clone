import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoogleSignInAsync, IUser, IUserSessionAsync } from "./types";
import Api from "@/Api";

export const googleSignIn = createAsyncThunk(
  "user/signin",
  async (data: IGoogleSignInAsync) => {
    return (await Api.googleSignIn(data)) as {
      user: IUser;
      access_token: string;
    };
  }
);

export const userSession = createAsyncThunk(
  "user/session",
  async (data: IUserSessionAsync) => {
    return (await Api.userSession(data)) as {
      user: IUser;
      access_token: string;
    };
  }
);

export const userAsGuest = createAsyncThunk(
  "user/guest",
  async (data: { email: string }) => {
    return (await Api.userAsGuest(data)) as {
      user: IUser;
      access_token: string;
    };
  }
);
