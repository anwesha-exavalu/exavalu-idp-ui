import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUploadContainer from "components/FileUploadContainer";
import DataExtractionScreen from "./ExtractedData";
import { Row, Col, Card, Breadcrumb } from "antd";
import pdfIcon from "../../assets/images/pdf-icon.png";
import * as pdfjsLib from "pdfjs-dist";
import ExtractedInfoTable from "./ExtractedInfoTable";
import { getStaticTextConfig } from "../../data/getStaticTextConfig";
import { useNavigate } from "react-router-dom";
import useLoader from "context/loader";
import { useSelector } from "react-redux";
import { DashboradStyled } from "../../styles/pages/DasboardCM";
import {
  UploadHeader,
  UploadTitle,
  ProgressText,
} from "../../styles/pages/UploadFile";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UPLOAD_CONFIG = {
  enableFileTypeRestriction: true,
  allowedExtensions: [".pdf"],
  allowedMimeTypes: ["application/pdf"],
  restrictionErrorMessage:
    "Only PDF files are allowed. Please select a PDF file.",
  getUploadLabels() {
    return {
      formats: [".pdf"],
      label1: "Drag & Drop your PDF file here",
      label2: "or click to browse and select a PDF file",
    };
  },
};

const fileStorage = {
  files: new Map(),
  storeFile(id, data) {
    this.files.set(id, data);
  },
  getFile(id) {
    return this.files.get(id);
  },
  removeFile(id) {
    this.files.delete(id);
  },
};

const UploadFileScreen = () => {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDetails, setUploadDetails] = useState(null);
  const [currentStoredFile, setCurrentStoredFile] = useState(null);
  const [showDataExtraction, setShowDataExtraction] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiExtractedData, setApiExtractedData] = useState(null);
  const [extractedElementsCount, setExtractedElementsCount] = useState(0);

  const user = useSelector((state) => state.user);
  const dataCount = useSelector((state) => state.dataCount);
  const firstname = user.firstname;
  const role = user.role;
  const staticText = getStaticTextConfig(firstname, dataCount);

  const validateFile = (fileToValidate) => {
    const fileName = fileToValidate.name.toLowerCase();
    const fileType = fileToValidate.type.toLowerCase();

    const hasValidExtension = UPLOAD_CONFIG.allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );
    const hasValidMimeType = UPLOAD_CONFIG.allowedMimeTypes.includes(fileType);

    if (!hasValidExtension || !hasValidMimeType) {
      return { isValid: false, error: UPLOAD_CONFIG.restrictionErrorMessage };
    }
    return { isValid: true };
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

  useEffect(() => resetComponentState, []);

  const handleStrIntelligenceNavigation = (e) => {
    e.preventDefault();
    resetComponentState();
    navigate("/str-intelligence", { replace: true });
  };

  const generateFileId = () =>
    `file_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const callExtractionAPI = async (submissionId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_AI_EXTRACT}/api/get_extracted_document`,
        {
        params: { submission_id: submissionId },
      }
      );
      setApiExtractedData(response.data);
      return response.data;
    } catch (error) {
      console.error("Extraction failed:", error);
      alert("Failed to extract data");
      setLoader(false);
      setIsProcessing(false);
      return null;
    }
  };

  const handleUpload = async (fileToUpload) => {
    const validation = validateFile(fileToUpload);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const fileId = generateFileId();
    setFile(fileToUpload);
    setUploading(true);
    setUploadProgress(0);
    setShowDataExtraction(false);
    setApiExtractedData(null);

    let pageCount = "N/A";
    try {
      const pdfData = await fileToUpload.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
      pageCount = pdfDoc.numPages;
    } catch (err) {
      console.warn("PDF page count failed");
    }

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload); // ✅ FIXED

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_AI_EXTRACT}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          },
        }
      );

      setUploading(false);
      setIsProcessing(true);
      setLoader(true);

      const extractedData = await callExtractionAPI(
        uploadRes.data.submission_id
      );
      if (!extractedData) return;

      const pdfUrl = extractedData.pdf_data?.startsWith("data:")
        ? extractedData.pdf_data
        : `data:application/pdf;base64,${extractedData.pdf_data}`;

      const fileData = {
        id: fileId,
        name: extractedData.filename || fileToUpload.name,
        type: "application/pdf",
        size: fileToUpload.size,
        data: pdfUrl,
        uploadCompleted: true,
        extractedData,
      };

      const details = {
        pages: pageCount,
        anomalies: 0,
        extractedElements: 0,
        missingElements: 0,
        successMessage:
          "Your file has been identified from the master documents inventory with no anomalies.",
      };

      fileData.uploadDetails = details;
      fileStorage.storeFile(fileId, fileData);

      setUploadDetails(details);
      setCurrentStoredFile(fileData);
      setShowDataExtraction(true);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setIsProcessing(false);
      setLoader(false);
    }
  };

  const handleDataFieldsCountChange = (count) => {
    setExtractedElementsCount(count);
    if (uploadDetails) {
      setUploadDetails({ ...uploadDetails, extractedElements: count });
    }
  };

  const uploadLabels = UPLOAD_CONFIG.getUploadLabels();

  return (
    <div style={{ marginTop: 40 }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a onClick={handleStrIntelligenceNavigation}>STR Intelligence</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Upload</Breadcrumb.Item>
      </Breadcrumb>

      <DashboradStyled>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <UploadHeader>
                <UploadTitle>
                  {staticText[role].widgets.uploadFile.title}
                </UploadTitle>
              </UploadHeader>

              {!file && (
                <FileUploadContainer
                  onFileUpload={handleUpload}
                  supportedFormats={uploadLabels.formats}
                  label1={uploadLabels.label1}
                  label2={uploadLabels.label2}
                />
              )}

              {file && (
                <>
                  <div style={{ marginTop: 20 }}>
                    <img src={pdfIcon} alt="pdf" width={24} />
                    <ProgressText>
                      {uploadProgress < 100
                        ? `${uploadProgress}% Uploading`
                        : isProcessing
                        ? "Processing..."
                        : "Completed"}
                    </ProgressText>
                  </div>

                  {showDataExtraction && currentStoredFile && (
                    <>
                      {/* <ExtractedInfoTable
                        extractedData={apiExtractedData}
                      /> */}
                      <DataExtractionScreen
                        uploadedFileName={currentStoredFile.name}
                        uploadedFileUrl={currentStoredFile.data}
                        storedFileData={currentStoredFile}
                        apiExtractedData={apiExtractedData}
                        onDataFieldsCountChange={
                          handleDataFieldsCountChange
                        }
                      />
                    </>
                  )}
                </>
              )}
            </Card>
          </Col>
        </Row>
      </DashboradStyled>
    </div>
  );
};

export default UploadFileScreen;
