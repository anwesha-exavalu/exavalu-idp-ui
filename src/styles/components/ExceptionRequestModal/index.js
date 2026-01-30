import styled from "styled-components";

export const ExceptionRequestModalWrraper = styled.div`
  .exception-modal {
    top: 140px !important;
    left: 16px !important;
  }

  .exception-modal .ant-modal-body {
    background: #fff;
    padding: 0px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .modal-header-icon {
    font-size: 22px;
    color: #ffae00;
    margin-top: 2px;
    line-height: 1;
  }
  .modal-header-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #212121;
    line-height: 1;
  }


  .pertains-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .label-text {
    font-size: 12px;
    color: #4a4a4b;
    white-space: nowrap;
  }
  .value-text {
    font-size: 13px;
    color: #212121;
  }

  .form-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
    
  .channel-select {
    flex: 1;
    width: 380px;
  }
  .channel-select .ant-select-selector {
    color: #006172 !important;
    height: 32px !important;
    border-radius: 6px !important;
    border: 1px solid #00837a !important;
    display: flex;
    align-items: center;
  }

  .channel-select .ant-select-arrow {
    color: #00837a;
    font-weight: 2000;
    margin-right: 8px;
    font-size: 16px; 
  }

  .channel-select.small {
    width: 120px;
  }
    
  .input {
    height: 32px;
    border-radius: 6px;
    border: 1px solid #00837a;
    padding: 0 11px;
  }

  .textarea {
    margin-top: 6px;
    width: 100%;
    height: 87px;
    background: #f6f6f6;
    border: 0.5px solid rgba(33, 33, 33, 0.5);
    border-radius: 11px;
    padding: 10px 13px;
    resize: none;
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
  .footer-btn-cancel {
    font-size: 13px;
    font-weight: 600;
    color: #006172;
    padding: 0;
  }
  .footer-btn-submit {
    background: #006172;
    border: none;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 15px;
    border-radius: 4px;
    height: 30px;
    color: #ffffff;
  }

  .exceptions-box {
    margin-top: 10px;
    padding: 10px;
    background: #f6f7f8;
    border-radius: 8px;
    max-height: 350px;
    box-sizing: border-box;
    position: relative;
  }

  .exceptions-header {
    font-size: 14px;
    color: #212121;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 3;
    padding: 6px 0;
    margin: 0;
  }

  .exceptions-list {
    max-height: 2300px;;
    padding-right: 6px;
    margin-top: 8px;
  }

  .exceptions-list-wrapper {
    margin-top: 2px;
    overflow-y: auto;
    max-height: 230px;
  }

  .exception-card {
    margin-top: 20px;
    padding: 10px;
    background: rgba(247, 158, 63, 0.133);
    border-radius: 6px;
    box-sizing: border-box;
  }

  .exception-row {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .exception-icon {
  position: relative;
  margin-left: 12px;
  margin-top: 4px;
}

  .exception-label {
    font-size: 12px;
    color: #4a4a4b;
  }

  .exception-value {
    font-size: 14px;
    font-weight: 600;
    color: #4a4a4b;
  }

  .exception-comments {
    font-size: 14px;
    color: #000;
    white-space: pre-wrap;
  }

  .ant-row {
    margin-bottom: 0;
  }
`;

export const ParticipantExceptionsViewModalWrraper = styled.div`
  .exception-modal {
    top: 140px !important;
    left: 16px !important;
  }

  .exception-modal .ant-modal-body {
    background: #fff;
    padding: 0px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .modal-header-icon {
    font-size: 22px;
    color: #ffae00;
    margin-top: 2px;
    line-height: 1;
  }
  .modal-header-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #212121;
    line-height: 1;
  }


  .pertains-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .label-text {
    font-size: 12px;
    color: #4a4a4b;
    white-space: nowrap;
  }
  .value-text {
    font-size: 13px;
    color: #212121;
  }

  .form-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
    
  .channel-select {
    flex: 1;
    width: 380px;
  }
  .channel-select .ant-select-selector {
    color: #006172 !important;
    height: 32px !important;
    border-radius: 6px !important;
    border: 1px solid #00837a !important;
    display: flex;
    align-items: center;
  }

  .channel-select .ant-select-arrow {
    color: #00837a;
    font-weight: 2000;
    margin-right: 8px;
    font-size: 16px; 
  }

  .channel-select.small {
    width: 120px;
  }
    
  .input {
    height: 32px;
    border-radius: 6px;
    border: 1px solid #00837a;
    padding: 0 11px;
  }

  .textarea {
    margin-top: 6px;
    width: 100%;
    height: 87px;
    background: #f6f6f6;
    border: 0.5px solid rgba(33, 33, 33, 0.5);
    border-radius: 11px;
    padding: 10px 13px;
    resize: none;
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
  .footer-btn-cancel {
    font-size: 13px;
    font-weight: 600;
    color: #006172;
    padding: 0;
  }
  .footer-btn-submit {
    background: #006172;
    border: none;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 15px;
    border-radius: 4px;
    height: 30px;
    color: #ffffff;
  }

  .exceptions-box {
    margin-top: 10px;
    padding: 10px;
    background: #f6f7f8;
    border-radius: 8px;
    max-height: 450px;
    box-sizing: border-box;
    position: relative;
  }

  .exceptions-header {
    font-size: 14px;
    color: #212121;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 3;
    padding: 6px 0;
    margin: 0;
  }

  .exceptions-list {
    max-height: 2300px;;
    padding-right: 6px;
    margin-top: 8px;
  }

  .exceptions-list-wrapper {
    margin-top: 2px;
    overflow-y: auto;
    max-height: 400px;
  }

  .exception-card {
    margin-top: 20px;
    padding: 10px;
    background: rgba(247, 158, 63, 0.133);
    border-radius: 6px;
    box-sizing: border-box;
  }

  .exception-row {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .exception-icon {
  position: relative;
  margin-left: 12px;
  margin-top: 4px;
}

  .exception-label {
    font-size: 12px;
    color: #4a4a4b;
  }

  .exception-value {
    font-size: 14px;
    font-weight: 600;
    color: #4a4a4b;
  }

  .exception-comments {
    font-size: 14px;
    color: #000;
    white-space: pre-wrap;
  }

  .ant-row {
    margin-bottom: 0;
  }
`;
