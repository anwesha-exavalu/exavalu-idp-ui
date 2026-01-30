import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectManagerTotalPlans: 0,
  clientManagerTotalPlans: 0,
  clientManagerTotalDocuments: 0,
};

const plansDocumentsCountSlice = createSlice({
  name: "plansDocumentsCount",
  initialState,
  reducers: {
    setPlansDocumentsCount(state, action) {
      const {
        projectManagerTotalPlans,
        clientManagerTotalPlans,
        clientManagerTotalDocuments,
      } = action.payload;
      if (projectManagerTotalPlans)
        state.projectManagerTotalPlans = projectManagerTotalPlans;
      if (clientManagerTotalPlans)
        state.clientManagerTotalPlans = clientManagerTotalPlans;
      if (clientManagerTotalDocuments)
        state.clientManagerTotalDocuments = clientManagerTotalDocuments;
    },
  },
});

export const { setPlansDocumentsCount } = plansDocumentsCountSlice.actions;
export default plansDocumentsCountSlice.reducer;
