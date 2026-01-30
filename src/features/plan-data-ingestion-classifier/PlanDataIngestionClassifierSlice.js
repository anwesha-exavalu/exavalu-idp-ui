import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIngestionClassifier: "Documents",
};

const planDataIngestionClassifierSlice = createSlice({
  name: "planDataIngestionClassifier",
  initialState,
  reducers: {
    setPlanDataIngestionClassifier(state, action) {
      const { selectedIngestionClassifier } = action.payload;
      if (selectedIngestionClassifier)
        state.selectedIngestionClassifier = selectedIngestionClassifier;
    },
  },
});

export const { setPlanDataIngestionClassifier } =
  planDataIngestionClassifierSlice.actions;
export default planDataIngestionClassifierSlice.reducer;
