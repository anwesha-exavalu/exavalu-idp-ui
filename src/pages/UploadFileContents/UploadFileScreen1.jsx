import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUploadContainer from "components/FileUploadContainer";
import DataExtractionScreen from "./ExtractedData";
import { Row, Col, Card, Breadcrumb } from "antd";
import * as pdfjsLib from "pdfjs-dist";
import ExtractedInfoTable from "./ExtractedInfoTable";
import { getStaticTextConfig } from "../../data/getStaticTextConfig";
import { useNavigate } from "react-router-dom";
import useLoader from "context/loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DashboradStyled } from "../../styles/pages/DasboardCM";
import { setExtractionProgress } from "../../features/Extraction-slice/extractionProgressSlice"
import tickmark from "../../assets/images/tickmark.png"
import BackgroundIcon from "../../assets/images/BackgroundIcon.png"
import spinnerbox from "../../assets/images/spinnerbox.png"

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  UploadHeader,
  UploadTitle,
  ProgressText,
} from "../../styles/pages/UploadFile";
import ChatPromptIcon from "../../assets/images/chat-prompt.png";
import ChatPropmpt from "../ChatPrompt";
import TreeMapView from "../../components/Chart/TreeMapView"
//import { sampleTree } from "../../data/sampleTree"
import timericon from "../../assets/images/timericon.png"
import { Spin } from "antd";

import { updateProgressState } from "../../features/progress-submission/ProgressSubmissionSlice";
//import FloatingExtractor from "../../pages/UploadFileContents/FloatingExtractionWidget";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UPLOAD_CONFIG = {
  enableFileTypeRestriction: true,
  allowedExtensions: [".pdf"],
  allowedMimeTypes: ["application/pdf"],
  restrictionErrorMessage:
    "Only PDF files are allowed. Please select a PDF file.",
  getUploadLabels: function () {
    if (
      this.enableFileTypeRestriction &&
      this.allowedExtensions.length === 1 &&
      this.allowedExtensions[0] === ".pdf"
    ) {
      return {
        formats: [".pdf"],
        label1: "Drag & Drop your PDF file here",
        label2: "or click to browse and select a PDF file",
      };
    }
    return {
      formats: this.allowedExtensions,
      label1: "Drag & Drop your file here",
      label2: "or click to browse and select a file",
    };
  },
};

const fileStorage = {
  files: new Map(),

  storeFile: function (fileId, fileData) {
    this.files.set(fileId, fileData);
  },

  getFile: function (fileId) {
    return this.files.get(fileId);
  },

  getAllFiles: function () {
    return Array.from(this.files.values());
  },

  removeFile: function (fileId) {
    this.files.delete(fileId);
  },
};

const UploadFileScreen = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDetails, setUploadDetails] = useState(null);
  const [currentStoredFile, setCurrentStoredFile] = useState(null);
  const [showDataExtraction, setShowDataExtraction] = useState(false);
  const [, setIsProcessing] = useState(false);
  const [apiExtractedData, setApiExtractedData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const dataCount = useSelector((state) => state.dataCount);
  const firstname = useSelector((state) => state.user.firstname);
  const staticText = getStaticTextConfig(firstname, dataCount);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const role = user.role;
  const { setLoader } = useLoader();
  const [extractedElementsCount, setExtractedElementsCount] = useState(0);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [activeTab, setActiveTab] = useState("mindmap");
  const [, setExtractionData] = useState(null);
  const [minddata, setMinddata] = useState({});
  const [headerData, setHeaderData] = useState({});

  const pfileName = useSelector((state) => state.progressSubmission.fileName);
  const psubmissionId = useSelector((state) => state.progressSubmission.submissionId);
  const pstatus = useSelector((state) => state.progressSubmission.status);
  const pprogress = useSelector((state) => state.progressSubmission.progress);
  const validateFile = (fileToValidate) => {
    if (!UPLOAD_CONFIG.enableFileTypeRestriction) {
      return { isValid: true, error: null };
    }

    const fileName = fileToValidate.name.toLowerCase();
    const fileType = fileToValidate.type.toLowerCase();

    const hasValidExtension = UPLOAD_CONFIG.allowedExtensions.some((ext) =>
      fileName.endsWith(ext.toLowerCase())
    );

    const hasValidMimeType = UPLOAD_CONFIG.allowedMimeTypes.some(
      (mimeType) => fileType === mimeType.toLowerCase()
    );

    if (!hasValidExtension || !hasValidMimeType) {
      return {
        isValid: false,
        error: UPLOAD_CONFIG.restrictionErrorMessage,
      };
    }

    return { isValid: true, error: null };
  };
  const resetComponentState = () => {
    setFile(null);
    setUploading(false);
    setUploadProgress(0);
    setUploadDetails(null);
    setCurrentStoredFile(null);
    setShowDataExtraction(false);
    setIsProcessing(false);
    setApiExtractedData(null);
    setExtractedElementsCount(0);
    setLoader(false);
  };

  const handleStrIntelligenceNavigation = (e) => {
    e.preventDefault();

    resetComponentState();

    navigate("/dashboard", { replace: true });
  };

  useEffect(() => {
    return () => {
      resetComponentState();
    };
  }, []);

  const handleDataFieldsCountChange = (count) => {
    setExtractedElementsCount(count);
    if (currentStoredFile) {
      const updatedFileData = {
        ...currentStoredFile,
        uploadDetails: {
          ...currentStoredFile.uploadDetails,
          extractedElements: count,
        },
      };
      fileStorage.storeFile(currentStoredFile.id, updatedFileData);
      setCurrentStoredFile(updatedFileData);
    }
  };

  const generateFileId = () => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleUpload = async (fileToUpload) => {
    const validation = validateFile(fileToUpload);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setFile(fileToUpload);
    setUploading(true);
    setUploadProgress(0);
    setUploadDetails(null);
    setShowDataExtraction(false);
    setIsProcessing(false);
    setApiExtractedData(null);

    let pageCount = 0;
    if (fileToUpload.type === "application/pdf") {
      try {
        const pdfData = await fileToUpload.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
        pageCount = pdfDoc.numPages;
      } catch (err) {
        console.error("Failed to read PDF pages", err);
      }
    }
    setUploadProgress(100); // ⬅ triggers useEffect
    dispatch(updateProgressState({ progress: 100 }));

    setUploading(false);
    setIsProcessing(true);
  };

  const extractionprogress = useSelector(
    (state) => state.extractionProgress.extractionProgress
  );
  const hasTriggeredRef = React.useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return; // avoid duplicate calls

    const isUploadDone = uploadProgress === 100;
    const isExtractionDone = extractionprogress === 100;
    const isFirstLoad = !file && isExtractionDone; // coming from another route

    if ((isUploadDone || isFirstLoad) && !apiExtractedData) {
      hasTriggeredRef.current = true;
      // triggerExtraction(file);
      const token = localStorage.getItem("token");
      //const submissionId = localStorage.getItem("submissionId");
      if (psubmissionId !== null && psubmissionId !== undefined) {
        fetchMindmapData(psubmissionId, token);
      }

    }
  }, [uploadProgress, extractionprogress, file]);

  useEffect(() => {
    if (extractedElementsCount > 0 && uploadDetails) {
      const updatedDetails = {
        ...uploadDetails,
        extractedElements: extractedElementsCount,
      };
      setUploadDetails(updatedDetails);
    }
  }, [extractedElementsCount]);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    if (uploadProgress === 100) {
      socketStartExtraction();
    }
  }, [uploadProgress]);


  const socketStartExtraction = async () => {
    try {
      const token = localStorage.getItem("token");
      const socket = new SockJS(`${import.meta.env.VITE_AI_EXTRACT}/ws`);
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, async () => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${import.meta.env.VITE_AI_EXTRACT}/api/v1/document-ingestion/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { submissionId, fileName } = response.data.data;

        dispatch(
          updateProgressState({
            submissionId,
            fileName,
          })
        );
        stompClient.subscribe(
          `/topic/ingestion-status/${submissionId}`,
          (message) => {
            const data = JSON.parse(message.body);

            setProgressData(data.progress);
            dispatch(updateProgressState({ status: data.status }));
            dispatch(setExtractionProgress(data.progress));
            setExtractionData(data);

            if (data.progress === 100) {
              fetchMindmapData(submissionId, token);
              stompClient.disconnect();
              console.log(" Socket disconnected")

            }
          }
        );
      });

      return stompClient;

    } catch (error) {
      console.error("❌ Error starting extraction:", error);
    }
  };


  const fetchMindmapData = async (submissionId, token) => {
    try {
      //setLoader(true)
      setLoading(true);
      setLoadingText("Drawing Mindmap...");
      const response = await axios.get(
        `${import.meta.env.VITE_AI_EXTRACT}/api/v1/document-ingestion/extract-document/${submissionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mindmapData = response.data?.data.mindmap;
      const validateData = response.data?.data.validate;
      const headerInformation = response.data?.data.mindmap.headerInformation;
      setHeaderData(headerInformation)
      setApiExtractedData(validateData)
      setMinddata(mindmapData);
      const pdfdata = response.data?.data;
      if (pdfdata) {

        let pdfUrl = pdfdata.pdf_data?.startsWith("data:")
          ? pdfdata.pdf_data
          : pdfdata.pdf_data
            ? `data:application/pdf;base64,${pdfdata.pdf_data}`
            : null;

        const fileData = {
          id: generateFileId(),
          name: pfileName || "",
          type: "application/pdf",
          //size: fileInput?.size,
          data: pdfUrl,
          uploadCompleted: true,

        };

        fileStorage.storeFile(fileData.id, fileData);
        setCurrentStoredFile(fileData);
        setShowDataExtraction(true);
        //setLoader(false);
        setLoading(false);
      }

      return mindmapData;
    } catch (err) {
      //setLoader(false)
      setLoading(false);
      console.error("❌ Mindmap fetch failed:", err);
      return null;
    }
  };





  const renderUploadCard = () => {
    if (!file && extractionprogress !== 100) return null;
    if (pprogress === 100 || extractionprogress === 100) {
      return (
        <p
          style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#212121",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              src={tickmark}
              alt="success"
              style={{ color: '#00802B' }}
            />
          </span>

          <span style={{ color: '#00802B', fontSize: '14px' }}>File uploaded successfully</span>
        </p>
      );
    }

    return (
      <div
        style={{
          border: "1px solid #00837A",
          borderRadius: "8px",
          padding: "12px",
          background: "#FAFBFC",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* <img src={pdfIcon} alt="PDF" style={{ width: 24, height: 24 }} /> */}
            <span style={{ fontSize: "16px", color: "#212121", fontWeight: "600" }}>
              Uploading File... <span style={{ fontSize: "14px", color: "#4A4A4B", fontWeight: "600" }}>{file?.name}</span>
            </span>
          </div>
          <ProgressText>{`${uploadProgress}%`}</ProgressText>
        </div>

        <div style={{ height: "12px", borderRadius: "8px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${uploadProgress}%`,
              background: "#00796b",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>

        <p style={{ fontSize: "13px", color: "#444", textAlign: "left" }}>
          <img
            src={BackgroundIcon}
            alt="info"
            style={{ width: "12px", height: "12px", marginRight: "4px" }}
          />In progress.. this may take a few seconds
        </p>
      </div>
    );
  };



  const ExtractionCard = (progress) => {
    if (progress === undefined || progress === null) return null;

    return (
      <div
        style={{
          border: "1px solid #00837A",
          borderRadius: "8px",
          padding: "12px",
          background: "#FAFBFC",
          marginTop: "10px",
        }}
      >
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

            {(progress === 100 || extractionprogress === 100) ? (
              <>
                {/* SUCCESS HEADER (full width, no side padding) */}
                <div
                  style={{
                    background: "#E1F3EB",
                    borderRadius: "6px 6px 0 0",

                    /* FULL WIDTH FIX */
                    marginLeft: "-12px",
                    marginRight: "-12px",
                    marginTop: "-12px",
                    height: '34px',
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontWeight: 600,
                      paddingLeft: '12px',
                      fontSize: "15px",
                      color: "#00802B",
                    }}
                  >
                    <img src={tickmark} alt="success" />
                    <span>File extracted successfully</span>
                  </div>
                </div>

                {/* FILE NAME */}
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#212121",
                    textAlign: "left",
                    wordBreak: "break-word",
                  }}
                >
                  {pfileName}
                </div>
              </>
            ) : (
              <>
                {/* EXTRACTING HEADER (full width, no side padding) */}
                <div
                  style={{
                    background: "#E1F3EB",
                    borderRadius: "6px 6px 0 0",

                    /* FULL WIDTH FIX */
                    marginLeft: "-12px",
                    marginRight: "-12px",
                    marginTop: "-12px",
                    height: '34px',
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 14px",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#006172",
                    }}
                  >
                    Extracting File...
                  </div>
                </div>

                {/* FILE NAME BELOW */}
                {/* ROW: File name (left) + Status (right) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* LEFT: FILE NAME */}
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#212121",
                      textAlign: "left",
                      wordBreak: "break-word",
                      flex: 1,
                      paddingRight: "10px",
                    }}
                  >
                    {pfileName}
                  </div>

                  {/* RIGHT: STATUS */}
                  <span style={{ fontSize: "14px", color: "#132e32ff", whiteSpace: "nowrap" }}>
                    {pstatus} {extractionprogress === 100 ? "" : `${progress}%`}
                  </span>
                </div>

              </>
            )}
          </div>

          {/* STATUS RIGHT SIDE */}

        </div>

        {/* PROGRESS BAR — hidden if progress 100 */}
        {extractionprogress === 100 ? '' : (
          <div
            style={{
              height: "12px",
              background: "#E0E0E0",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "8px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#00796B",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
        )}

        {/* FOOTER MESSAGE */}
        {(progress === 100 || extractionprogress === 100) ? (
          <p style={{ fontSize: "13px", color: "#444", textAlign: "left" }}>
            <img
              src={BackgroundIcon}
              alt="infotab"
              style={{ width: "12px", height: "12px", marginRight: "4px" }}
            />
            Mind Map & Validation are now ready&nbsp;
          </p>
        ) : (
          <p className="loading-text">
            <img src={spinnerbox} alt="loading" className="hourglass-spin" />
            <span className="loading-message">

              Extraction may take a few minutes. It will continue in the background, so you can navigate to other pages...
              {/* <span className="dot-animate">...</span> */}
            </span>
          </p>


        )}
      </div>
    );
  };



  const uploadLabels = UPLOAD_CONFIG.getUploadLabels();
  const handleChatPropmptClick = () => {
    setShowChatWindow(true);
  };
  const handleUploadTextClick = () => {
    setShowChatWindow(false);
  };
  const isValidateDisabled =
    !apiExtractedData ||
    (Array.isArray(apiExtractedData) && apiExtractedData.length === 0) ||
    (typeof apiExtractedData === "object" && Object.keys(apiExtractedData).length === 0);

  return (
    <div style={{ marginTop: "40px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a
            href="#"
            style={{ color: "#00837A" }}
            onClick={handleStrIntelligenceNavigation}
          >
            Dashboard
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span
            style={{ color: "black", cursor: "pointer", fontWeight: 600 }}
            onClick={handleUploadTextClick}
          >
            Upload
          </span>
        </Breadcrumb.Item>
        {showChatWindow && (
          <Breadcrumb.Item>
            <span
              style={{ color: "black", cursor: "pointer", fontWeight: 600 }}
              onClick={handleChatPropmptClick}
            >
              Chat
            </span>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>

      <>
        {showChatWindow ? (
          <ChatPropmpt />
        ) : (
          <Spin spinning={loading} tip={loadingText} size="large" style={{ color: '#212121', fontWeight: 600 }}>
            <DashboradStyled>
              <Row gutter={[16, 16]} className="dashboard-row">
                <Col xs={24} xl={24} lg={24} md={24}>
                  <Card className="dashboard-card">
                    <UploadHeader style={{ marginTop: "-20" }}>
                      <UploadTitle>
                        {staticText[role].widgets.uploadFile.title}
                      </UploadTitle>
                    </UploadHeader>

                    <div style={{ position: "relative", minHeight: "150px" }}>
                      {(pprogress === null || pprogress === 0) && (
                        <div
                          style={{
                            opacity: uploading ? 0 : 1,
                            transition: "opacity 0.5s ease",
                          }}
                        >
                          <FileUploadContainer
                            onFileUpload={handleUpload}
                            supportedFormats={uploadLabels.formats}
                            label1={uploadLabels.label1}
                            label2={uploadLabels.label2}
                          />
                        </div>
                      )}


                      <>

                        {(pprogress == 100 || extractionprogress === 100) && renderUploadCard()}
                        {(uploadProgress === 100 || extractionprogress > 0 || progressData > 0) &&
                          ExtractionCard(extractionprogress || 0)}


                        {showDataExtraction && currentStoredFile && (
                          <div style={{ marginTop: "20px" }}>
                            <ExtractedInfoTable extractedData={headerData} />
                          </div>
                        )}
                      </>

                    </div>
                  </Card>
                </Col>
              </Row>
              {/*  */}
              <>
                <Row gutter={[16, 16]} className="dashboard-row">
                  <Col xs={24} xl={24} lg={24} md={24}>
                    {extractionprogress === 100 ? (
                      // showDataExtraction && currentStoredFile ? (
                      <>
                        <Card className="dashboard-card">
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                minHeight: "48px",
                              }}
                            >
                              {activeTab === "mindmap" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <div style={{ fontSize: "16px", fontWeight: 600, color: "#212121" }}>
                                    {pfileName}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "13px",
                                      color: "#737791",
                                      fontWeight: 400,
                                      marginBottom: "20px",
                                    }}
                                  >
                                    Document structure and legal plan provisions
                                  </div>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <div style={{ fontSize: "16px", fontWeight: 600, color: "#212121" }}>
                                    Extracted data comparison with PDF document
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "13px",
                                      color: "#737791",
                                      fontWeight: 400,
                                    }}
                                  >
                                    Facilitate human validation of AI-extracted plan provisions
                                  </div>
                                  <div style={{
                                    fontSize: "14px",
                                    color: "#006172",
                                    fontWeight: 600,
                                    marginBottom: "20px",
                                  }}> Please review the key information from the document before committing
                                    the data to the plan documents inventory.</div>
                                </div>
                              )}

                              <div className="switch-container">
                                <button
                                  className={`switch-btn ${activeTab === "mindmap" ? "active" : ""}`}
                                  onClick={() => setActiveTab("mindmap")}
                                >
                                  Mind Map
                                </button>

                                <button
                                  disabled={isValidateDisabled}
                                  className={`switch-btn ${activeTab === "validate" ? "active" : ""} ${isValidateDisabled ? "disabled-btn" : ""
                                    }`}
                                  onClick={() => !isValidateDisabled && setActiveTab("validate")}
                                >
                                  Validate
                                </button>
                              </div>
                            </div>

                            {activeTab === "mindmap" && <TreeMapView data={minddata} />}
                            {activeTab === "validate" && (
                              <DataExtractionScreen
                                key={currentStoredFile.id}
                                uploadedFile={null}
                                uploadedFileName={pfileName}
                                uploadedFileUrl={currentStoredFile.data}
                                storedFileData={currentStoredFile}
                                apiExtractedData={apiExtractedData}
                                onDataFieldsCountChange={handleDataFieldsCountChange}
                              />
                            )}
                          </div>
                        </Card>
                        <div className="chatbot-float">
                          <img src={ChatPromptIcon} alt="chat-prompt" onClick={handleChatPropmptClick} />
                        </div>
                      </>
                      // ) : null
                    ) : (
                      <Card className="dashboard-card">
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#737791",
                            textAlign: "center",
                            padding: "50px 0",
                          }}
                        >
                          <span><img
                            src={timericon}
                            alt="timerinfo"
                            style={{ width: "12px", height: "12px", marginRight: "4px" }}
                          /> Mind Map & Validation will appear <b>here</b> once extraction is complete
                          </span>   </div>
                      </Card>
                    )}
                  </Col>
                </Row>

              </>
              {/* )} */}
            </DashboradStyled>
          </Spin>
        )}
      </>
    </div>
  );
};

export default UploadFileScreen;
