import styled from "styled-components";

export const TableContainer = styled.div`
  
  width: 100%;

  overflow-x: auto; 
 
  @media (max-width: 768px) {
    padding: 0;
  }

 
  
  .ant-table {
  // overflow-x: auto; 
    width: 643px; 
    width: 100%;
   
    
  }
  
  .ant-table-content table {

.ant-table-thead > tr > th {
  background-color: rgba(17, 123, 153, 0.05);

  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  color: #117B99;
  height: 32px;
  white-space: nowrap;
  box-shadow: none ;
  position: relative;
  text-align: center; 
}

.ant-table-thead > tr > th::before {
  display: none ;
}
.ant-table {
  border-collapse: collapse;
  border-spacing: 0 ;
}
.ant-table-thead > tr > th:first-child {
  border-top-left-radius: 4px;

}

.ant-table-thead > tr > th:last-child {
  border-top-right-radius: 4px;

}
.ant-table-thead > tr >  th:first-child {
      text-align: left;
    }


    }
    
    .ant-table-tbody > tr > td {
    
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
      color: var(--Highlighted-Text, #4A4A4B);
      font-style: normal;
   
    
      text-align: center; 
   
     
    }
    
    
    .ant-table-tbody > tr > td:first-child {
    //  white-space: nowrap;
      text-align: left;
    }
  
    .ant-table-tbody > tr:first-child > td {
      font-weight: 700;
    }
    
    
    .ant-table-tbody > tr:last-child > td {
      border-bottom: none ;
    }
  }
  

  .ant-pagination-next,
  .ant-pagination-prev {
   padding-right: 10px;
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
 .extra-content-before{
  font-size: 14px;
  font-style: normal;

  font-weight: 600;
   line-height: normal;
  text-align: left;
  color: #464255;
    margin-bottom: 20px;
  
    }
`;

export const Tabletitle = styled.h4`
  font-size: 16px;
  margin: 0px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0%;
  text-align: left;
  color: #464255;
  margin-bottom: 6px;
`;

export const Tablesubtitle = styled.div`
  font-size: 14px;
  margin: 0px;
  line-height: normal;
  letter-spacing: 0%;
  text-align: left;
   color: #383636ff;
  margin-bottom: 14px;
`;

export const TableContainerAlternative = styled(TableContainer)`
  padding: 14px 12px 14px 2px;
  //  .ant-table-wrapper {
  //     padding: 14px 20px 20px 28px;
  //     @media (max-width: 768px) {
  //       padding: 14px 16px 20px 16px;
  //     }

  //     @media (max-width: 480px) {
  //       padding: 14px 8px 20px 8px;
  //     }
  //   }
  .ant-table {
    width: 100%;
    max-width: 882px;

    .ant-table-content table {
      .ant-table-thead > tr > th {
        background-color: #f3f5f6;
        font-weight: 600;
        color: #00837a;
        border: none;
        height: 57px;
        font-size: 14px;
        text-align: center;
      }

      .ant-table-thead > tr > th:first-child {
        border-top-left-radius: 15px;
        // width: 175px;
        text-align: left;
      }

      .ant-table-thead > tr > th:last-child {
        border-top-right-radius: 15px;
      }

      .ant-table-tbody > tr > td {
        font-weight: 600;
        color: #4a4a4b;
        font-size: 14px;
        text-align: center;
        width: 840px;
        line-height: normal;
        border-bottom: 1px solid #aaad9b;
        border: 90%;
      }

      .ant-table-tbody > tr > td:first-child {
        text-align: left;
        white-space: nowrap;
        letter-spacing: 0.14px;
      }
    }
  }

  .extra-content-before {
    font-size: 14px;
    line-height: normal;
    font-style: normal;
    font-weight: 400;
    text-align: left;
    color: #4b4b4b;
    margin-bottom: 14px;
  }
`;

export const NonBoldFirstRowTableContainer = styled.div`
  .ant-table-tbody > tr:first-child > td {
    font-weight: 400;
  }
  .ant-table-thead > tr > th {
    font-size: 14px !important;
  }
`;


export const ActionItemTableContainer = styled.div`
  .ant-table-tbody > tr:first-child > td {
    font-weight: 400;
  }
  .ant-table-thead > tr > th {
    font-size: 14px !important;
  }

   .ant-table-thead > tr > th:nth-child(2),
  .ant-table-thead > tr > th:nth-child(3),
  .ant-table-thead > tr > th:nth-child(4),
  .ant-table-tbody > tr > td:nth-child(2),
  .ant-table-tbody > tr > td:nth-child(3),
  .ant-table-tbody > tr > td:nth-child(4) {
    width: 8% !important;
    max-width: 70px !important;
  }
  
  .ant-table-thead > tr > th:nth-child(1),
  .ant-table-tbody > tr > td:nth-child(1) {
    width: 12% !important;
  }

  

   .ant-table-tbody > tr:last-child > td {
    font-weight: 700;
  }

  .ant-table-thead > tr > th:nth-child(2),
  .ant-table-thead > tr > th:nth-child(3),
  .ant-table-thead > tr > th:nth-child(4),
  .ant-table-tbody > tr > td:nth-child(2),
  .ant-table-tbody > tr > td:nth-child(3),
  .ant-table-tbody > tr > td:nth-child(4) {
    background-color: #f3f5f6;
  }

  .ant-table-thead > tr:first-child > th {
  background-color: #f3f5f6 !important;
}

  .ant-table-tbody > tr:hover > td:nth-child(2),
  .ant-table-tbody > tr:hover > td:nth-child(3),
  .ant-table-tbody > tr:hover > td:nth-child(4) {
    background-color: #f3f5f6!important;
  }
`;