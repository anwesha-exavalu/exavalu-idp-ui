import styled from "styled-components";

export const CustomCheckboxWrapper = styled.div`
  .ant-checkbox .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 2px solid #008078;
    background-color: #fff;
    position: relative;
  }

  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #008078;
    background-color: none;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fff;
    border-color: #008078;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 0px;
    width: 7px;
    height: 10px;
    border: 0.5px solid #008078;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;
