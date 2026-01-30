// ../../styles/components/CommentPopup.js
import styled from "styled-components";

export const CommentPopupWrapper = styled.div`
 
    .ant-modal {
      top: 20%;
    }

  .custom-modal .ant-modal-body {
    min-height: 310px;
    display: flex;
    flex-direction: column;
    gap: 19px;
  }

  .custom-modal .header-section { display: flex; gap: 8px; align-items: center; }
  .custom-modal .header-icon { font-size: 20px; color: #00837A; width: 23px; height: 20px; }


  .header-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header-icon {
    font-size: 20px !important;
    color: #00837a !important;
    width: 23px !important;
    height: 20px !important;
  }
  .header-title {
    font-weight: 600;
    font-size: 16px;
    color: #212121;
  }

  /* Pertains To */
  .pertains-to {
    display: flex;
    gap: 50px;
    align-items: center;
  }

  .pertains-label {
    font-size: 12px;
    color: #4a4a4b;
  }
  .pertains-value {
    font-size: 13px;
    color: #212121;
  }


  .select-channel {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .channel-label {
    font-size: 12px;
    color: #4a4a4b;
  }
  .channel-select {
    flex: 1;
    width: 380px;
  }
  .channel-select .ant-select-selector {
    color: #006172 !important;
    height: 32px !important;
    border-radius: 6px !important;
    border: 0.5px solid #00837a !important;
    display: flex;
    align-items: center;
  }

  .channel-select .ant-select-arrow {
    color: #00837a;
    margin-right: 8px;
    font-size: 16px; 
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 210px;
    overflow-y: auto;
    padding-right: 8px;
  }
  .comment-item {
    display: flex;
    gap: 3px;
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
  }
  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin-right: 12px;
    object-fit: cover;
  }
  .comment-content {
    flex: 1;
  }
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .comment-name {
    font-weight: 600;
    font-size: 12px;
    color: #4a4a4b;
  }
  .comment-role {
    font-size: 11px;
    color: #4a4a4b;
  }
  .comment-time {
    font-size: 11px;
    color: rgba(74, 74, 75, 0.8);
  }
  .comment-text {
    font-size: 12px;
    color: #4a4a4b;
    margin-top: 6px;
    margin-left: -50px;
  }

  .comment-input,
  .comment-input .ant-input {
    border-radius: 11px !important;
    border: 0.5px solid rgba(33, 33, 33, 0.5) !important;
    background: #f6f6f6 !important;
    padding: 10px 13px !important;
    font-size: 12px !important;
    color: #212121 !important;
  }

  .footer-section {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
    margin-top: 0px;
  }
  .cancel-btn {
    font-weight: 600;
    font-size: 13px;
    color: #006172 !important;
  }
  .submit-btn {
    background: #006172 !important;
    border-radius: 4px !important;
    height: 30px !important;
    padding: 6px 15px !important;
    border: none !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
