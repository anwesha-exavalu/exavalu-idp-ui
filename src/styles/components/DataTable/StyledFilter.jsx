import styled from "styled-components";
import { Select, DatePicker, Input, Button } from "antd";

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const StyledSelect = styled(Select)`
  min-width: 130px;

  .ant-select-selector {
    border: 1px solid #004d40;
    color: #004d40;
    border-radius: 6px;
    height: 38px !important;
    display: flex;
    align-items: center;
  }

  .ant-select-arrow {
    color: #004d40;
  }
`;

export const StyledRangePicker = styled(DatePicker.RangePicker)`
  height: 38px;
  border: 1px solid #004d40;
  border-radius: 6px;
  width: 220px;

  .ant-picker-input > input {
    color: #004d40;
  }

  .ant-picker-suffix {
    color: #004d40;
  }
`;

export const StyledInput = styled(Input.Search)`
  width: 200px;
  .ant-input {
    border: 1px solid #004d40;
    border-radius: 6px;
  }
  .ant-btn {
    background-color: #004d40;
    border: none;
  }
`;

export const StyledButton = styled(Button)`
  height: 38px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #004d40;
  border: 1px solid #004d40;
  background: none;

  svg {
    margin-right: 6px;
  }

  &:hover {
    background: #e0f2f1;
  }

  &.primary-btn {
    background-color: #004d40;
    color: white;
  }
`;
