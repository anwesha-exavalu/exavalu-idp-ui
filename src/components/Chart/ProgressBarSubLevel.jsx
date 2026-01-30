import React from "react";
import { Row, Col, Progress, Typography, Tooltip } from "antd";
import { ProgressbarStyled } from '../../styles/components/chart/index'
import { InfoCircleOutlined } from "@ant-design/icons";

const ProgressBarSubLevel = ({ chartData, title, subtitle,text }) => {
  const data = chartData?.[0] || {};
  const entries = Object.entries(data);
  const { Text } = Typography;
  const firstKey = entries[0]?.[0] || "";
  const firstValue = entries[0]?.[1] || 0;

  const secondKey = entries[1]?.[0] || "";
  const secondValue = entries[1]?.[1] || 0;

  const total = firstValue + secondValue;
  const percent = total > 0 ? ((firstValue / total) * 100).toFixed(0) : 0;

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Text
          title={text}
          
          style={{ fontSize: 15, fontWeight: 600, color: "#212121" ,cursor: "pointer"}}
        >
        
          {title} 
          <span>
            <Tooltip
              title={text}
              overlayInnerStyle={{
                background: "#fff",
                width: 350,
                maxWidth: 400,
              color: '#006172',
               
                whiteSpace: "normal",
              
              }}
              placement="top"
            >
              <InfoCircleOutlined
                style={{ marginLeft: 5, color: "#006172", fontSize: 13 }}
              />
            </Tooltip>
          </span>
        </Text>


        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#212121",
            display: "block",
          }}
        >
          {subtitle}
        </Text>
      </div>


      <Row justify="start" align="top">
        <Col flex="auto" style={{ marginTop: 5 }}>
          <ProgressbarStyled>
            <Row align="middle" gutter={12}>
              <Col style={{ fontSize: 13, fontWeight: 600, color: "#212121" }}>
                {firstKey}: {firstValue.toLocaleString()}
              </Col>

              {/* Progress Bar */}
              <Col>
                <div style={{ width: 280 }}>
                  <Progress
                    percent={percent}
                    strokeColor="#117B99"
                    trailColor="#74CEE6"
                    showInfo
                    format={(p) => `${p}%`}
                    className="custom-progress"
                  />
                </div>
              </Col>

              <Col style={{ fontSize: 13, fontWeight: 500, color: "#212121" }}>
                {secondKey}: {secondValue.toLocaleString()}
              </Col>
            </Row>
          </ProgressbarStyled>
        </Col>
      </Row>
    </>
  );
};

export default ProgressBarSubLevel;
