export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
  googleAuth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirectURL: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
  testEmail: "su.suman.maity@gmail.com",
  GOOGLE: {
    BASE: "/google",
    AUTH: {
      BASE: "/auth",
    },
    VERIFY: {
      BASE: "/verify",
    },
    GUEST: {
      BASE: "/guest",
    },
  },
  USER: {
    BASE: "/user",
    SESSION: {
      BASE: "/session",
    },
  },
  FORMS: {
    BASE: "forms",
  },
  FORM: {
    BASE: "form",
    SAVE: {
      BASE: "/save",
    },
    SUBMIT: {
      BASE: "/submit",
    },
    VIEW: {
      BASE: "/view",
    },
    RESPONSES: {
      BASE: "/responses",
    },
  },
  QUESTION: {
    BASE: "/question",
  },
  SYNC_QUESTIONS: {
    BASE: "/sync-questions",
  },
  POSITION: {
    BASE: "/position",
  },
  ANSWER: {
    BASE: "/answer",
  },
};
