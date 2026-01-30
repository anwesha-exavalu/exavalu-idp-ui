import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actionItems: 0,
  actionItemPlans: 0,
  totalProducts: 0,
  myPlans: 0,
  requiredDocuments: 0,
  archivedDocuments: 0,
  investmentMaster: 0,
  employerPlanStatistics: 0,
  employerPlans: 0,
  employerActionItems: 0,
  employerActionItemPlans: 0,
  employerContacts: 0,
  planActionItems: 0,
  planInvestments: 0,
  planContacts: 0,
  planRequiredDocuments: 0,
  planArchivedDocuments: 0,
  documentsRequireAttention: 0,
  actionItemCommntList: 0,
  horizontalBarChartData: 0,
  salesEffectivenessChartData:0,
};

const dataCountSlice = createSlice({
  name: "dataCount",
  initialState,
  reducers: {
    setDataCount(state, action) {
      const {
        actionItems,
        actionItemPlans,
        totalProducts,
        myPlans,
        requiredDocuments,
        archivedDocuments,
        investmentMaster,
        employerPlanStatistics,
        employerPlans,
        employerActionItems,
        employerActionItemPlans,
        employerContacts,
        planActionItems,
        planInvestments,
        planContacts,
        planRequiredDocuments,
        planArchivedDocuments,
        documentsRequireAttention,
        actionItemCommntList,
        horizontalBarChartData,
        salesEffectivenessChartData
      } = action.payload;

      if (actionItems) state.actionItems = actionItems;
      if (actionItemPlans) state.actionItemPlans = actionItemPlans;
      if (totalProducts) state.totalProducts = totalProducts;
      if (myPlans) state.myPlans = myPlans;
      if (requiredDocuments) state.requiredDocuments = requiredDocuments;
      if (archivedDocuments) state.archivedDocuments = archivedDocuments;
      if (investmentMaster) state.investmentMaster = investmentMaster;

      if (employerPlanStatistics)
        state.employerPlanStatistics = employerPlanStatistics;
      if (employerPlans) state.employerPlans = employerPlans;
      if (employerActionItems) state.employerActionItems = employerActionItems;
      if (employerActionItemPlans)
        state.employerActionItemPlans = employerActionItemPlans;
      if (employerContacts) state.employerContacts = employerContacts;
      if (planActionItems) state.planActionItems = planActionItems;
      if (planInvestments) state.planInvestments = planInvestments;
      if (planContacts) state.planContacts = planContacts;
      if (planRequiredDocuments)
        state.planRequiredDocuments = planRequiredDocuments;
      if (planArchivedDocuments)
        state.planArchivedDocuments = planArchivedDocuments;
      if (documentsRequireAttention)
        state.documentsRequireAttention = documentsRequireAttention;
      if (actionItemCommntList)
        state.actionItemCommntList = actionItemCommntList;
      if (horizontalBarChartData)
        state.horizontalBarChartData = horizontalBarChartData;
      if(salesEffectivenessChartData)
        state.salesEffectivenessChartData =salesEffectivenessChartData;
    },
  },
});

export const { setDataCount } = dataCountSlice.actions;
export default dataCountSlice.reducer;