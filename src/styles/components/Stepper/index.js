import { Card } from "antd";
import styled, { css } from "styled-components";
export const StepperContentCard = styled(Card)`
  .ant-card-head {
    background: #fafbfb;
    padding: 12px 16px;
  }

  .ant-card-head-title {
    color: #00837a;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    justify-content: flex-start;
    display: flex;
  }
`;

export const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9f9;
  border-radius: 9999px;
  padding: 12px 24px;
`;

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
`;

export const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: white;
  transition: all 0.2s ease;

  ${(props) =>
    props.completed &&
    css`
      background: #0f766e; /* green */
    `}

  ${(props) =>
    props.active &&
    css`
      background: #0f766e; /* teal */
    `}

  ${(props) =>
    !props.active &&
    !props.completed &&
    css`
      background: #9ca3af; /* gray */
    `}

  &:hover {
    transform: scale(1.1);
  }
`;

export const StepLabel = styled.span`
  margin: 0 12px;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;

  ${(props) =>
    props.active &&
    css`
      color: #0f766e;
    `}

  ${(props) =>
    !props.active &&
    css`
      color: #4b5563;
    `}
`;

export const Connector = styled.div`
  flex: 1;
  height: 2px;
  ${(props) =>
    props.completed
      ? css`
          background: #0f766e; /* green */
        `
      : css`
          background: #d1d5db; /* gray */
        `}
`;
