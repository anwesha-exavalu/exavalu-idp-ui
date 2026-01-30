import React from "react";
import { PrivateFooterStyled } from "../../styles/components/Header";
import feedbackicon from "../../assets/images/feedbackicon.png"
const PrivateFooter = () => {
  return (
    <PrivateFooterStyled>
      <div className="footersection">
        <div className="left-section">
        </div>

        <div className="right-section">
          <a className="footer-link"> <img
              src={feedbackicon}
              alt="Feedback"
              style={{
                width: 16,
                height: 16,
                marginRight: 6,
                verticalAlign: "middle",
              }}
            /> Share Feedback</a>
          <a className="footer-link">Terms & Conditions</a>
          <span className="separator">|</span>
          <a className="footer-link">Privacy Policy</a>
        </div>
      </div>
    </PrivateFooterStyled>
  );
};

export default PrivateFooter;
