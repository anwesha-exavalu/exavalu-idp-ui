import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  extractionProgress: 0, // only storing extraction progress
};

const extractionProgressSlice = createSlice({
  name: "extractionProgress",
  initialState,
  reducers: {
    setExtractionProgress(state, action) {
      state.extractionProgress = action.payload;
    },
     resetExtractionProgress(state) {
      state.extractionProgress = 0;
    },
  },
});

export const {
  setExtractionProgress,
  resetExtractionProgress,
} = extractionProgressSlice.actions;

export default extractionProgressSlice.reducer;
