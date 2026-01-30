import React, { useState } from "react";
import { FloatingWidgetStyled } from "../../styles/pages/FloatingWidget";
import { useNavigate } from "react-router-dom";
import tickmark from "../../assets/images/tickmark.png"
import { useSelector } from "react-redux";
import { resetExtractionProgress } from "../../features/Extraction-slice/extractionProgressSlice";

export default function FloatingExtractor({ data }) {
  const navigate = useNavigate();
  const floatingExtractordata = localStorage.getItem("floatingExtractorOpened");
  if (!data || Number(data?.extractionProgress) === 0 || Number(floatingExtractordata) === 1) return null;

  const [collapsed, setCollapsed] = useState(true);
  const progress = Number(data?.extractionProgress) || 0;
  const { fileName } = useSelector((state) => state.progressSubmission);
  const handleOpen = () => {
    navigate("/upload-file");
    if (progress === 100) {
      localStorage.setItem("floatingExtractorOpened", 1);
    }
    resetExtractionProgress()
  };


  return (
    <FloatingWidgetStyled>
      <div className="extractor-container">
        {!collapsed ? (
          <div className="expanded-card">
            <div className="arrow" onClick={() => setCollapsed(true)}>❯</div>

            <div className="expanded-main">
              <div className="file-name">{fileName}</div>

              {progress < 100 ? (
                <>
                  <div className="line-progress">
                    <div className="line-fill" style={{ width: progress + "%" }}></div>
                  </div>
                  <div className="status-text">
                    Extracting file… <span className="percent">{progress}%</span>
                  </div>
                </>
              ) : (
                <div
                  className="status-text success"
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  Extraction Complete – <span className="percent">100%</span>
                </div>

              )}
            </div>

            <button className="open-btn" onClick={handleOpen}>Open</button>
          </div>
        ) : (
          <div className="collapsed-card" onClick={handleOpen}>
            <div className="arrow" onClick={(e) => { e.stopPropagation(); setCollapsed(false) }}>❮</div>



            {progress < 100 ? (
              <div className="collapsed-progress">
                <svg className="ring" width="26" height="26">
                  <circle
                    className="ring-bg"
                    stroke="#D6D6D6"
                    strokeWidth="3"
                    fill="transparent"
                    r="11"
                    cx="13"
                    cy="13"
                  />
                  <circle
                    className="ring-fill"
                    stroke="#0F605A"
                    strokeWidth="3"
                    fill="transparent"
                    r="11"
                    cx="13"
                    cy="13"
                    strokeDasharray={2 * Math.PI * 11}
                    strokeDashoffset={2 * Math.PI * 11 * (1 - progress / 100)}
                  />
                </svg>

                <span className="percent-text">{progress}%</span>
              </div>
            ) : (
              <div className="done-text">
                <div className="done-status">
                  <img src={tickmark} alt="success" className="tick-icon" />
                  <span className="done-text-label">Done</span>
                </div>
                <span
                  className="tap-to-open"
                  onClick={handleOpen}
                >
                  Tap to open
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </FloatingWidgetStyled>
  );

}
