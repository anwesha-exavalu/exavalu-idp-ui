import styled from "styled-components";

export const FloatingWidgetStyled = styled.div`
.extractor-container {
  position: fixed;
  top: 75px;
  right: 10px;
  font-family: "Inter", sans-serif;
  z-index: 9999;
}
  .done-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.tick-icon {
  width: 10px;
  height: 10px;
}

.done-status {
  display: flex;
  align-items: center;
  gap: 4px;
}

.done-text-label {
  font-size: 14px;
  font-weight: 600;
  color: #00837A;
}

.tap-to-open {
  font-size: 12px;
  color: #4A4A4B;
  cursor: pointer;
  //text-decoration: underline;
}


/* ---------------- EXPANDED CARD ---------------- */
.expanded-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  gap: 20px;
  width: 420px;
  animation: fadeUp .3s ease;
}

.arrow {
  font-size: 18px;
  cursor: pointer;
  color: #0F605A;
}

.expanded-main {
  flex: 1;
}

.file-name {
  font-size: 12px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
  text-align: left;
}

.line-progress {
  width: 100%;
  height: 8px;
  background: #e6e6e6;
  border-radius: 6px;
  overflow: hidden;
}

.line-fill {
  height: 100%;
  background: #0F605A;
}

.status-text {
  font-size: 13px;
  margin-top: 6px;
  color: #444;
}

.status-text .percent {
  font-weight: 600;
  color: #0F605A;
}

.open-btn {
  padding: 6px 18px;
  border-radius: 8px;
  border: 1px solid #0F605A;
  background: #ffffff;
  color: #0F605A;
  cursor: pointer;
  font-size: 14px;
}
  .collapsed-progress {
  display: flex;
  align-items: center;
  gap: 6px;
}

.percent-text {
  font-size: 14px;
  font-weight: 600;
  color: #0F605A;
}


/* ---------------- COLLAPSED CARD ---------------- */
.collapsed-card {
  display: flex;
  align-items: center;
  width:130px;
  height:54px;
  background: #ffffff;
  padding: 14px 18px;
  border-radius: 12px;
  gap: 16px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  animation: fadeUp .3s ease;
}

.circle-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
}

.ring-bg {
  opacity: 0.4;
}

.ring-fill {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-linecap: round;
}

.circle-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #0F605A;
}

/* Animation */
@keyframes fadeUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

`;