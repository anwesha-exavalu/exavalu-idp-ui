import styled from "styled-components";
import { Select, Button, Checkbox } from "antd";

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const StyledSelect = styled(Select)`
  width: 80px;
  
  .ant-select-selector {
    height: 32px !important;
    border: 1px solid #1890ff;
    border-radius: 6px;
    transition: all 0.3s ease;
    background-color: #f0f8ff;
  }
  
  &:hover .ant-select-selector {
    border-color: #40a9ff;
    background-color: #e6f4ff;
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    background-color: #f0f8ff;
  }

  .ant-select-selection-placeholder {
    color: #006172 !important;
    font-weight: 500;
  }

  .ant-select-selection-item {
    color: #006172 !important;
    font-weight: 500;
  }
`;

export const FilterLabel = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;


export const ActiveFiltersCount = styled.span`
  background: #1890ff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;


export const FilterButton = styled(Button)`
  border: 1px solid #006172;
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;
  color: #006172;
  font-size: 12px;
  font-weight: 600;
  
   &.primary {
    background-color: #00837A;
    border-color: #00837A;
    color: white;
    
    &:hover {
      background-color: #006b63;
      border-color: #006b63;
    }
  }
  
  &.refresh {
    background-color: #0780771A;
  }
`;

export const DropdownContainer = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 12px;
  min-width: 280px;
`;

export const ScrollableContent = styled.div`
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 12px;
  padding-right: 4px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #CACACA;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #CACACA;
  }
  
  scrollbar-width: thin;
  scrollbar-color:  #f1f1f1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #000000;
  padding-top: 12px;
  gap: 8px;
`;

export const CheckboxItem = styled.div`
  margin-bottom: 8px;
  padding: 4px 0;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;
export const FilterCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    background-color: #D1D1D166;
    border-color: #0000004F;
    border-radius: 3px;
    width: 18px;
    height: 18px;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #439F6E;
    border-color: #439F6E;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #ffffff;
    border-width: 2px;
  }

  &:hover .ant-checkbox-inner {
    border-color: #d9d9d9;
  }

  @media (max-width: 576px) {
    .ant-checkbox-inner {
      width: 14px;
      height: 12px;
    }
  }
`;