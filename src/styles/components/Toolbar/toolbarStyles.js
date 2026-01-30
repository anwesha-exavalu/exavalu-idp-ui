import styled from "styled-components";
import { Input, Button } from "antd";

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px 6px 6px 10px;
  width: 100%;
`;

export const LeftSection = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const RightSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: auto;
`;

export const SelectWrapper = styled.div`
  .ant-select {
    min-width: 120px;
    border: 1px solid #006172 !important;
    border-radius: 6px !important;
    background: #fff !important;
    font-size: 13px;
    font-weight: 600;
  }

  .ant-select-selector {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 12px !important;
    height: 32px !important;
    display: flex;
    align-items: center;
  }

  .ant-select-arrow {
    color: #006172 !important;
  }

  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    color: #006172 !important;
  }

  /* Selector (the box) */
  .kpi-select .ant-select-selector {
    border: 1px solid #006172 !important;
    border-radius: 6px !important;
    background: #006172 !important;
    color: #fff !important;
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 45px;
    padding: 6px 10px;
  }

  .kpi-select .ant-select-arrow {
    color: #fff !important;
  }

  .kpi-select .ant-select-selection-item {
    color: #fff !important;
    font-size: 15px;
  }

  /* Dropdown */
  .kpi-select-dropdown {
    border-radius: 6px;
    overflow: hidden;
    padding: 10px 20px;
  }

  /* Dropdown items */
  .kpi-select-dropdown .ant-select-item-option {
    color: #00837a !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    padding: 6px 12px;
  }

  /* Hover */
  .kpi-select-dropdown .ant-select-item-option-active {
    background: #e6f4f1 !important;
  }

  /* Selected */
  .kpi-select-dropdown .ant-select-item-option-selected {
    background: #e6f4f1 !important;
    color: #00837a !important;
    font-weight: 600 !important;
  }
`;

export const StyledSearch = styled(Input)`
  width: 160px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #006172;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #006172;

  input::placeholder {
    color: #006172;
    font-size: 13px;
    font-weight: 600;
    opacity: 1;
  }

  .ant-input-prefix {
    color: #006172;
  }
`;

export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  border: 1px solid #006172;
  border-radius: 6px;
  color: #006172;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 0 12px;
  background-color: rgba(7, 128, 119, 0.12);
`;
