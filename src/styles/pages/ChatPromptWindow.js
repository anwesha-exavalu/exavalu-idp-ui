import styled from "styled-components";

export const ChatPromptWindowStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;
  background: linear-gradient(90deg, #ffffff 0%, #e8faf8 50%, #ccf4f2 100%);

  /* CHAT AREA */
  .chat-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  overflow-y: auto;
}


  /* ROW WRAPPER (left/right align) */
  .message-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 18px;
    width: 100%;
  }

  .message-row.left {
    justify-content: flex-start;
  }

  .message-row.right {
    justify-content: flex-end;
  }

  /* MESSAGE LOGOS */
  .chat-logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    box-shadow: 0px 1px 4.5px 0px #00000066;

    margin: 5px 10px;
  }

  /* MESSAGE BUBBLE */
  .message-bubble {
    max-width: 70%;
    padding: 6px 12px;
    border-radius: 14px;
    position: relative;
    font-size: 15px;
    line-height: 1.2;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  /* LEFT (BOT) BUBBLE */
  .message-bubble.left {
    background: #ffffff;
    border: 1px solid #e5f4f4;
    color: #212121;
  }

  /* RIGHT (USER) BUBBLE */
  .message-bubble.right {
    background: #ffffff;
    border: 1px solid #e5f4f4;
    box-shadow: 0px 2px 3.5px 4px #0780770d;
    color: #212121;
  }

  /* EDIT ICON */
  .edit-icon {
    cursor: pointer;
    margin-left: 10px;
    opacity: 0;
    transition: 0.2s;
    font-size: 14px;
  }

  .message-bubble.right:hover .edit-icon {
    opacity: 1;
  }
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




export const PromptBar = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  .chat-input {
    width: 100%;
    line-height: 12px;
    border-radius: 12px;
    padding: 12px 70px 12px 20px; /* ← extra right padding for button */
    font-size: 16px;

    border: 1px solid #e6f7f7;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 8px 16px rgba(0, 150, 150, 0.12);
    backdrop-filter: blur(5px);

    &:focus {
      border-color: #8de5e0 !important;
      box-shadow: 0px 0px 0px 3px rgba(140, 230, 230, 0.3);
    }
  }

  .chat-input::placeholder {
    padding-top: 4px;
  }

  .send-btn {
    position: absolute;
    right: 12px;
    top: 50%;
  transform: translateY(-50%);
    height:40px;
    padding: 0px 20px;
    border-radius: 10px;
    border: 1px solid #b2eaea;
    background: linear-gradient(135deg, #eaffff, #c8f7f4);
    color: #004d4d;
    font-weight: 500;
    z-index: 10;

    &:hover {
      background: linear-gradient(135deg, #dfffff, #b6f0ec);
      border-color: #8ee5dd;
    }
  }
`;


