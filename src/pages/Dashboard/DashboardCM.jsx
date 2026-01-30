import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { setMockData } from "../../features/mock-data/mockDataSlice";

import useLoader from "context/loader";
// import { RechartStyled } from "../../styles/pages/DasboardCM";
import { DashboradStyled } from "../../styles/pages/DasboardCM";
import { Row, Col, Typography, Card } from "antd";
import { getStaticTextConfig } from "../../data/getStaticTextConfig";
import DocumentInventory from "../../subfeatures/DocumentInventoryMaster/DocumentInventory";

const DashboardCM = () => {
  // const { Title, Text } = Typography;
  // const { setLoader } = useLoader();
  const user = useSelector((state) => state.user);
  const dataCount = useSelector((state) => state.dataCount);
  // const dispatch = useDispatch();

  const role = user.role;
  const firstname = useSelector((state) => state.user.firstname);
  const staticText = getStaticTextConfig(firstname, dataCount);
  // const clientManagerScope = staticText[role].scopes[0];
  const [activeTab, setActiveTab] = useState(0);

  // const tabs = staticText[role].tabs.filter(
  //   (tab) => tab.label !== "My Investments"
  // );
  // const clientManagerDataRows = useSelector(
  //   (state) => state.mockData.clientManagerData
  // );

  const widgets = staticText[role].widgets;
  // const dashboardMetricsStaticData = widgets.dashboardMetrics;

  // const dashboardMetricsCardData = getWidgetChartData(
  //   clientManagerDataRows,
  //   clientManagerScope,
  //   0,
  //   dashboardMetricsStaticData
  // );
  // // const investmentTableData = getWidgetTableData(
  // //   clientManagerDataRows || [],
  // //   clientManagerScope,
  // //   0,
  // //   widgets.myInvestments.investmentsMaster
  // // );

  // const plansTableData = getWidgetTableData(
  //   clientManagerDataRows,
  //   clientManagerScope,
  //   0,
  //   widgets.myPlans.myPlans
  // );

  // const refreshData = async (showLoader = false) => {
  //   if (showLoader) setLoader(true);

  //   const token = localStorage.getItem("token");

  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/document-ingestion/fetch-mock-data?tablename=${clientManagerScope}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const parsedData = res.data.map((row) => ({
  //       ...row,
  //       str_dashboard_client_manager_data: JSON.parse(
  //         row.str_dashboard_client_manager_data
  //       ),
  //     }));

  //     dispatch(setMockData({ clientManagerData: parsedData }));
  //   } catch (e) {
  //     console.error("Error refreshing data:", e);
  //   } finally {
  //     if (showLoader) setLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!clientManagerDataRows || clientManagerDataRows.length === 0) {
  //     refreshData(true);
  //   } else {
  //     refreshData(false);
  //   }
  // }, [clientManagerScope]);

  return (
    <>
      <DashboradStyled>
        <Row>
          {activeTab === 0 && (
            <DocumentInventory
              widgetStaticData={widgets.myDocuments.documentInventory}
            />
          )}
        </Row>
      </DashboradStyled>
    </>
  );
};

export default DashboardCM;
