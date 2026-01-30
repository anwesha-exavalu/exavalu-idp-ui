import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submissionId: null,
  fileName: null,
  progress: 0,
  status: null
};

const progressSubmissionSlice = createSlice({
  name: "progressSubmission",
  initialState,
  reducers: {
    updateProgressState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetProgressState: () => initialState,
  },
});

export const { updateProgressState, resetProgressState } = progressSubmissionSlice.actions;
export default progressSubmissionSlice.reducer;
