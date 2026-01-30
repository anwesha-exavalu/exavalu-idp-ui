import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectManagerData: [],
  clientManagerData: [],
  planData: [],
  employerData: [],
  seniorLeaderData: [],
  seniorLeaderProductData: [],
  seniorLeaderPlanData: [],
  productManagerData: [],
  advisorPlanData: [],
};

const mockDataSlice = createSlice({
  name: "mockData",
  initialState,
  reducers: {
    setMockData(state, action) {
      const {
        projectManagerData,
        clientManagerData,

        planData,
        employerData,
        seniorLeaderData,
        seniorLeaderProductData,
        seniorLeaderPlanData,
        productManagerData,
        advisorPlanData,
      } = action.payload;

      if (projectManagerData) state.projectManagerData = projectManagerData;
      if (clientManagerData) state.clientManagerData = clientManagerData;

      if (planData) state.planData = planData;
      if (employerData) state.employerData = employerData;
      if (seniorLeaderData) state.seniorLeaderData = seniorLeaderData;
      if (seniorLeaderProductData)
        state.seniorLeaderProductData = seniorLeaderProductData;
      if (seniorLeaderPlanData)
        state.seniorLeaderPlanData = seniorLeaderPlanData;
      if (productManagerData) state.productManagerData = productManagerData;
      if (advisorPlanData) state.advisorPlanData = advisorPlanData;
    },
  },
});

export const { setMockData } = mockDataSlice.actions;
export default mockDataSlice.reducer;
