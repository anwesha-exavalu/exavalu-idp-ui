import styled from "styled-components";
import { Radio } from "antd";

export const CustomRadio = styled(Radio)`
  .ant-radio-inner {
    width: 20px;
    height: 20px;
    border: 2px solid #00857a !important;
    background-color: transparent !important;
  }

  .ant-radio-inner::after {
    width: 12px;
    height: 12px;
    background-color: #00857a !important;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0); !important; 
    margin: 0;
    opacity: 1;
  }
    

  .ant-radio-checked .ant-radio-inner::after {
    width: 12px; /* bigger inner circle */
    height: 12px;
    background-color: #00857a !important;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1) !important; 
    margin: 0;
    opacity: 1;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: #00857a !important;
    background-color: transparent !important;
  }

  .ant-radio-wrapper:hover .ant-radio-inner {
    border-color: #00857a !important;
  }
`;
