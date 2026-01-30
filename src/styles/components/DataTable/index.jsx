import styled from "styled-components";
export const TableContainer = styled.div`
  border: 1px solid #ececec;
  margin: 20px 0 20px;
  border-radius: 10px;
  overflow: hidden;

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: #fafafa !important;
  }

  box-shadow: 0 4px 12px rgba(7, 128, 119, 0.12);

  @media (max-width: 768px) {
    margin: 16px -8px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    margin: 12px -8px;
    border-radius: 4px;
  }

  .ant-table-wrapper {
    padding: 6px 8px 8px 14px;

    @media (max-width: 768px) {
      padding: 4px 6px 6px 10px;
    }

    @media (max-width: 480px) {
      padding: 2px 4px 4px 6px;
    }
  }

  .ant-table {
    overflow: auto;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    @media (max-width: 480px) {
      font-size: 11px;
    }
  }

  .ant-table-thead > tr > th {
    background-color: #f3f5f6 !important;

    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    color: #006172 !important;

    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 16px;
      padding: 8px 6px;
    }

    @media (max-width: 480px) {
      font-size: 11px;
      line-height: 14px;
      padding: 6px 4px;
    }
  }

  .ant-table-tbody > tr > td {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;

    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 18px;
      padding: 8px 6px;
    }

    @media (max-width: 480px) {
      font-size: 11px;
      line-height: 16px;
      padding: 6px 4px;
    }
  }

  .ant-pagination-next,
  .ant-pagination-prev {
    @media (max-width: 480px) {
      span {
        padding: 6px 12px;
        font-size: 12px;
      }

      span::after,
      span:after {
        font-size: 12px;
        padding-right: 6px;
      }

      button:before {
        width: 20px;
        height: 12px;
        top: 6px;
      }
    }
  }

  .ant-pagination-next {
    span {
      background-color: white;
      display: inline;
      padding: 10px 20px;
      border: 1px solid #212121;
      border-radius: 6px;

      @media (max-width: 768px) {
        padding: 8px 16px;
      }
    }
    span::after {
      color: #00837a;
      content: "Next";
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      padding-right: 10px;

      @media (max-width: 768px) {
        font-size: 12px;
        padding-right: 8px;
      }
    }
    button {
      position: relative;
      margin-left: 5px;
    }
    button:before {
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M9.19531 5.07542L1.39178 5.07542M1.39178 5.07542L5.39884 8.87588M1.39178 5.07542L5.39884 1.12415' stroke='%2300837A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 30px;
      height: 10px;
      display: block;
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
      right: 0px;
      background-position: center;
      top: 8px;
      right: 5px;
      transform: rotate(180deg);

      @media (max-width: 768px) {
        width: 24px;
        height: 12px;
        top: 6px;
      }
    }
    svg {
      display: none;
    }
  }

  .ant-pagination-prev {
    button {
      position: relative;
      margin-right: 10px;
    }
    button:before {
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M0.80469 5.07542H8.60822M8.60822 5.07542L4.60116 1.12415M8.60822 5.07542L4.60116 8.87588' stroke='%2300837A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 30px;
      height: 10px;
      display: block;
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
transform: rotate(180deg);
      top: 8px;
      left: 5px;

      @media (max-width: 768px) {
        width: 24px;
        height: 12px;
        top: 6px;
      }
    }

    span {
      background-color: white;
      display: inline;
      padding: 10px 20px;
      border: 1px solid #212121;
      border-radius: 6px;

      @media (max-width: 768px) {
        padding: 8px 16px;
      }
    }

    span:after {
      color: #00837a;
      content: "Prev";
      font-size: 13px;
      font-weight: 600;
      padding-left: 10px;

      line-height: 18px;
      background-color: white;

      @media (max-width: 768px) {
        font-size: 12px;
        padding-left: 8px;
      }
    }

    svg {
      display: none;
    }
  }
`;

export const Tabletitle = styled.h4`
  all: unset; /* resets all default h4 styles */
  display: block;
  background: #fff;

  font-size: 24px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.2px;
  text-align: left;
  color: #000;
  padding: 8px 52px;

  @media (max-width: 1024px) {
    font-size: 20px;
    padding: 8px 40px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 8px 24px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 8px 16px;
    line-height: 20px;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 4px;
  padding: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .ant-select {
    .ant-select-selector {
      border: 1px solid #d9d9d9;
      border-radius: 6px;

      height: 34px;
      width: 134px;
      padding: 0 16px;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        width: 100%;
        min-width: 120px;
      }

      @media (max-width: 480px) {
        height: 40px;
        padding: 0 12px;
        font-size: 13px;
      }
    }
  }

  .ant-input-search {
    .ant-input {
      border-radius: 6px;
 
      height: 34px;
      padding: 0 16px;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: 480px) {
        height: 40px;
        padding: 0 12px;
        font-size: 13px;
      }
    }

    .ant-input-search-button {
      border-radius: 0 6px 6px 0;
      background-color: 
         #1890ff
      border-color: #1890ff
      height: 34px;
      padding: 0 16px;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: 480px) {
        height: 40px;
        padding: 0 12px;
        font-size: 13px;
      }
    }
  }

  .ant-picker {
    border-radius: 6px;
  
    font-size: 14px;

    @media (max-width: 768px) {
      width: 100%;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  .reset-btn,
  .download-btn {
    background-color: ${(props) =>
      props.className?.includes("reset") ? "rgb(231, 227, 227)" : "#fff"};
    border: 1px solid #d9d9d9;
    border-radius: 6px;

    font-weight: 500;
    color: #656;
    height: 34px;
    padding: 0 16px;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 8px;
    }

    @media (max-width: 480px) {
      height: 40px;
      padding: 0 12px;
      font-size: 13px;
    }

    &:hover {
         border-color: 
        #1890ff;
        color: #1890ff
    }
  }

  .reset-btn {
    background-color: rgb(231, 227, 227);
  }

  .download-btn {
    background-color: #fff;
  }

  @media (max-width: 1200px) {
    .ant-row {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .ant-col {
      width: 100% !important;
      margin-bottom: 8px;
    }

    .ant-select,
    .ant-input-search,
    .ant-picker {
      min-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .ant-row {
      gap: 8px;
    }
  }
`;
