import React from "react";
import { Spin } from "antd";
import {ExtractionLoaderStyled} from "../../styles/SubFeatures/ExtrationLoad";

const ExtractionLoader = () => {
  return (
    <ExtractionLoaderStyled>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
      <Spin size="large" />
      <span style={{ fontSize: "16px", fontWeight: 500 }}>
        Drawing MindMap...
      </span>
    </div>
    </ExtractionLoaderStyled>
  );
};

export default ExtractionLoader;
