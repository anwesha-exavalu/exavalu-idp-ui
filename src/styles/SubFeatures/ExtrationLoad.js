import styled from "styled-components";

export const ExtractionLoaderStyled = styled.div`
.clockwise-spin .ant-spin-dot {
  animation: clockwise 1s infinite linear !important;
}

@keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg); /* negative = clockwise */
  }
}
  `;
