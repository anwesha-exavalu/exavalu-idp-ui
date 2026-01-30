import styled from "styled-components";

export const UploadWrapper = styled.div`
  .ingest-container {
    background: #fff;
    border-radius: 8px;
    font-family: "Inter", sans-serif;
  }

  /* Top processing banner */
  .processing-bar {
    display: flex;
    gap: 6px;
    align-items: center;
    background: #f2faf7;
    border: 1px solid #a1e0c9;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 16px;
  }

  .processing-icon {
    color: #28a17e;
    margin-right: 10px;
    font-size: 16px;
  }

  .processing-text {
    color: #007660;
    font-weight: 500;
    font-size: 14px;
  }

  .save-btn {
    background: #eaf5f4; 
    color: #007660;
    border: #00837A;
     border: 1px solid #00837A;
    cursor: not-allowed;
  }
    .save-btn.active {
      color: #007660;
       border: 1px solid #00837A;
      cursor: pointer;
    }

  .top-actions {
    display: flex;
    justify-content: space-between; /* title left, buttons right */
    align-items: center; /* vertically centered */
    margin-bottom: 24px;
  }

   .action-buttons {
    display: flex;
    gap: 10px; /* space between Save and Next */
  }

  .h3-text {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0; /* remove default h3 spacing */
  }

    .next-btn {
    background: #eaf5f4; 
    color: #b4b4b4;
    border: 1px solid #00837A;
    cursor: not-allowed;
    transition: background 0.3s ease, color 0.3s ease;
    }

  .next-btn.active {
    background: #006172;
    color: #ffffff;
    cursor: pointer;
  }

  .ingest-body {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  .upload-section {
    flex: 1;
  }

  .upload-box {
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    background-color: #fafafa;
    padding: 30px 20px 40px;
    cursor: pointer;
    transition: border 0.2s ease;
    height:  auto;
  }

  .upload-icon {
    width: 64px;
    height: 54px;
    margin-bottom: 16px;
  }

  .upload-text {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .upload-btn {
    width: 100px;
    height: 28px;
    background: #0780771F;
    border: none;
    color: #006172;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    cursor: pointer;
    padding: 0;
    font-family: "Inter", sans-serif;
    border: 1px solid #00837A;
    border-radius: 4px;
     margin-top: 12px;     
}

  .info-section {
    margin-top: 50px;
    background: #f8fefe;
    border-radius: 6px;
    padding: 8px 8px;
    text-align: left;
    width: 90%;
    height: 150px;
    margin-inline: auto;
  }

  .info-title {
    font-weight: 600;
    margin-bottom: 8px;
  }

  .info-list {
    padding-left: 18px;
    font-size: 14px;
    color: #333;
  }

  .file-status-section {
    flex: 1;
    max-width: 480px;
  }

  .file-table {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
  }

  .file-table th {
    background: #f8fefe;
    text-align: left;
    padding: 12px 16px;
    font-weight: 500;
    color: #006172;
    font-size: 15px;
    border-bottom: 1px solid #d9d9d9;
  }

  .file-table td {
    padding: 14px 16px;
    border-bottom: 1px solid #eaeaea;
    vertical-align: middle;
  }

  .file-table tr:last-child td {
    border-bottom: none;
  }

  /* Row content alignment */
  .file-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .file-icon {
    color: #006172;
    font-size: 18px;
    flex-shrink: 0;
  }

  .file-name {
  display: inline-flex;
  align-items: center;
  width: 220px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-base {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
  max-width: 200px; /* controls how much space the name takes */
}

.text-limit{
font-size: 12px;
color: #4B4B4B;
}

  .file-icon-placeholder {
  width: 18px; 
  flex-shrink: 0;
}

  .file-name::after {
    content: attr(data-ext);
    color: #666;
  }

  /* Alignment for status column */
  .status-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
  }

  .upload-progress-row {
    display: flex;
    align-items: center;
    gap: 30px;
    width: 120px;
  }

  .progress-bar {
    flex: 1;
    width: 100%;
  }

  .cancel-icon {
    color: #AFAFAF;
    cursor: pointer;
    font-size: 15px;
  }

  .failed-row {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .status-text {
    color: #03A300;
    font-weight: 500;
  }

  .delete-icon {
    color: #999;
    cursor: pointer;
    margin-left: 10px;
    font-size: 15px;
  }

  .failed-text {
    color: #d93025;
    font-weight: 500;
  }

  .retry-icon {
    color: #d93025;
    cursor: pointer;
    margin-left: 22px;
    font-size: 15px;
  }

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.file-icon.processing {
  animation: spin 1s linear infinite;
}

 /* Review Screen Styles */
.missing-data-banner {
  display: grid;
  grid-template-columns: auto 1fr; /* icon column + text column */
  align-items: flex-start;
  background: #f6fbf7;
  border: 1px solid #0E833D;
  border-radius: 6px;
  padding: 14px 16px;
  margin-bottom: 20px;
  column-gap: 12px; /* space between icon and text */
}

.warning-icon {
  font-size: 18px;
  color: #507c49;
  margin-bottom: 0px;
  margin-top: 8px;
}

.banner-text {
  color: #294736;
}

.banner-title {
  font-weight: 600;
  font-size: 15px;
  margin: 0 0 4px 0;
  line-height: 1.4;
  text-align: left;
}

.banner-subtitle {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  text-align: left;
}

  .provide-btn {
    background: #006172;
    color: #ffffff;
    border: none;
    font-weight: 500;
    cursor: pointer;
  }
`;
