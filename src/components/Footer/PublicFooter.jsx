import React from "react";
import { PublicFooterStyled } from "../../styles/components/Header";
import feedbackicon from "../../assets/images/feedbackicon.png"
const PublicFooter = () => {
  return (
    <PublicFooterStyled>
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
              filter: "brightness(0) invert(1)",
            }}
          /> Share Feedback</a>
          <a href="/" className="footer-link">
            Terms & Conditions
          </a>
          <span className="separator">|</span>
          <a href="/" className="footer-link">
            Privacy Policy
          </a>
        </div>
      </div>
    </PublicFooterStyled>
  );
};

export default PublicFooter;
