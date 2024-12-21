export const answerTypes = {
  SORT_ANSWER: "short_answer",
  PARAGRAPH: "paragraph",
  MULTIPLE_CHOICE: "multiple_choice",
  CHECKBOXES: "checkboxes",
  DROPDOWN: "dropdown",
  FILE_UPLOAD: "file_upload",
  LINEAR_SCALE: "linear_scale",
  MULTIPLE_CHOICE_GRID: "multiple_choice_grid",
  CHECKBOX_GRID: "checkbox_grid",
  DATE: "date",
  TIME: "time",
};

export const constant = {
  localStorageKeys: {
    authKey: "gform_google_auth",
  },
  header: {
    emptyTitle: "Untitled form",
    placeholder: {
      title: "Form title",
      description: "Form description",
    },
  },
  answers: {
    inactive_placeholder: {
      [answerTypes.SORT_ANSWER]: "Short answer text",
      [answerTypes.PARAGRAPH]: "Long answer text",
    },
  },
};
