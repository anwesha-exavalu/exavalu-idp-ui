import styled from "styled-components";

export const OfferContainer = styled.div`
  background: transparent;
  padding: 0;

  .offer-header {
    color: #006172;
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    padding: 10px 16px;
    border-radius: 6px 6px 0 0;
  }

  .background-info {
    padding: 16px 10px;

    .info-row {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 6px 0;
      gap: 16px;

      .info-key {
        font-weight: 400;
        color: #515050;
        text-transform: capitalize;
        min-width: 150px;
      }

      .info-value {
        color: #006172;
        font-weight: 600;
        font-size: 14px;
        text-align: left;
      }
    }
  }
`;
