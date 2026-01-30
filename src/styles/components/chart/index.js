import styled from "styled-components";
export const CustomStyled = styled.div`
  .custom-select .ant-select-selection-item {
    color: #006172 !important;
    font-size: 13px;
    font-weight: 600;
  }
  .ant-select-arrow {
    color: #006172 !important;
  }
`;

export const ProgressbarStyled = styled.div`
  .ant-progress-line .ant-progress-bg {
    height: 28px !important;
    border-radius: 22px;
  }
  .ant-progress-line .ant-progress-outer {
    height: 28px !important;
  }
  /* Make the percentage appear inside the bar */
  .custom-progress .ant-progress-text {
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -50%);
    transform: translate(-50%, -60%);
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
  .custom-progress .ant-progress-inner {
    height: 24px;
    border-radius: 12px;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: left;
  }
`;
  
export const MindMapStyled = styled.div`
/* ------- WRAPPER ------- */

.tree-container-wrapper {
  position: relative;
}

/* ------- DOWNLOAD BUTTON WRAPPER ------- */
.download-btn-wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
}

/* ------- DOWNLOAD BUTTON ------- */
.download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #0d9488;
  background: white;
  color: #0d9488;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.download-icon {
  font-size: 18px;
}
  .expand-collapse-container {
  position: absolute;
  bottom: 140px;
  right: 35px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 20;
}

.expand-btn,
.collapse-btn {
  width: 27px;
  height: 27px;
  font-size: 18px;
  border-radius: 50%;
 border: 0.44px solid #4A4A4B66;
  background: #fff;
  box-shadow: 0px 2.5px 6.88px 0px #0000000A;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

/* Rotate collapse icon ↓ */
.collapse-btn {
  transform: rotate(-180deg);
}


/* ------- ZOOM PANEL ------- */
.zoom-panel {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 45px;
  overflow: hidden;
  border: 0.44px solid #4A4A4B66;
  background: #fff;
  box-shadow: 0px 2.5px 6.88px 0px #0000000A;
  z-index: 10;
}

/* ------- BUTTON SHARED ------- */
.zoom-btn {
  width: 50px;
  height: 45px;
  border: none;
  outline: none;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
}

/* Divider line between + and - */
.zoom-divider {
  position: relative;
}

.zoom-divider::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 80%;
  height: 1px;
  background: #ccc;
  transform: translateX(-50%);
}


/* ------- SVG AREA ------- */
.map-svg {
  width: 100%;
  height: 100vh;
  background: #FAFAFB;
  border-radius: 24px;
  border: 1px solid #ccc;
  cursor: default !important;   /* normal cursor */
}

/* When dragging */
.map-svg.grabbing {
  cursor: pointer !important;
}

  `;