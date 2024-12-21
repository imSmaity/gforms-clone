export interface IUser {
  _id: string;
  email: string;
  name: string;
  picture: string;
}

export interface IGoogleSignInAsync {
  code: string;
}

export interface IUserSessionAsync {
  access_token: string;
}
