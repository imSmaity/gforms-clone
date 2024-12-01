export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
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
