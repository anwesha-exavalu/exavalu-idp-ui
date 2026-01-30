import React, { useEffect } from "react";
import { Row, Col, Progress } from "antd";
import { ProgressbarStyled } from "../../styles/components/chart/index";
import { useDispatch } from "react-redux";
import { setPlansDocumentsCount } from "../../features/plans-documents-count/PlansDocumentsCountSlice";

const ProgressBar = ({ idKey, chartData, title }) => {
  const data = chartData?.[0] || {};
  const entries = Object.entries(data);
  const firstKey =  "Plan Set Up Complete";
  const firstValue = entries[0]?.[1] || 0;

  const secondKey = entries[1]?.[0] || "";
  const secondValue = entries[1]?.[1] || 0;

  const total = firstValue + secondValue;
  const percent = total > 0 ? ((firstValue / total) * 100).toFixed(0) : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlansDocumentsCount({ projectManagerTotalPlans: total }));
  }, [dispatch, total]);

  return (
    <>
      <Row justify="space-between" align="left">
        <Col>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
            {title}
          </div>
        </Col>

        <Col style={{ textAlign: "right",marginTop: 5}}>
          <Col style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
            {total.toLocaleString()}
          </Col>
          <Col style={{ fontSize: 14, fontWeight: 600, color: "#ffffff" }}>
            Expected {idKey}
          </Col>
        </Col>
      </Row>

      <Row justify="space-between" align="left">
        <Col flex="auto">
          <ProgressbarStyled>
            <Row align="middle" gutter={12}>
              <Col style={{ fontSize: 14, fontWeight: 600, color: "#ffffff" }}>
                {firstKey}: {firstValue.toLocaleString()}
              </Col>

              {/* Progress Bar */}
              <Col>
                <div style={{ width: 280 }}>
                  <Progress
                    percent={percent}
                    strokeColor="#F2A523"
                    trailColor="#FFFDC4"
                    showInfo
                    format={(p) => `${p}%`}
                    className="custom-progress"
                  />
                </div>
              </Col>

              <Col style={{ fontSize: 14, fontWeight: 500, color: "#ffffff" }}>
                {secondKey}: {secondValue.toLocaleString()}
              </Col>
            </Row>
          </ProgressbarStyled>
        </Col>
      </Row>
    </>
  );
};

export default ProgressBar;
