import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Breadcrumb, Spin } from "antd";
import ExtractedInfoTable from "../../pages/UploadFileContents/ExtractedInfoTable";
import DataExtractionScreen from "../../pages/UploadFileContents/ExtractedData";
import TreeMapView from "../../components/Chart/TreeMapView";
import { DashboradStyled } from "../../styles/pages/DasboardCM";
import ChatPropmpt from "../../pages/ChatPrompt/index"
import ChatPromptIcon from "../../assets/images/chat-prompt.png";
import { useNavigate } from "react-router-dom";

export default function DocumentInventoryViewer() {
    const { documentInventoryId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState(null);
    const [currentStoredFile, setCurrentStoredFile] = useState(null);
    const [headerData, setHeaderData] = useState(null);
    const [minddata, setMinddata] = useState(null);
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [apiExtractedData, setApiExtractedData] = useState(null);
    const [submissionId, setSubmissionId] = useState(null);
    const [documentinventoryid, setDocumentinventoryid] = useState(null);
    const [activeTab, setActiveTab] = useState("validate");

    useEffect(() => {
        fetchDocument();
    }, [documentInventoryId]);


    const fetchDocument = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/document-inventory/${documentInventoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data.data;
            setApiData(data);
            const generateFileId = () => {
                return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            };
            const pdfdata = data;
            let pdfUrl = pdfdata.pdf_data?.startsWith("data:")
                ? pdfdata.pdf_data
                : pdfdata.pdf_data
                    ? `data:application/pdf;base64,${pdfdata.pdf_data}`
                    : null;

            const fileData = {
                id: generateFileId(),
                name: data.documentShortName || "",
                type: "application/pdf",
                //size: fileInput?.size,
                data: pdfUrl,
                uploadCompleted: true,

            };
            setCurrentStoredFile(fileData);

            setHeaderData(data.mindmap.headerInformation || {});
            setMinddata(data.mindmap || {});
            setApiExtractedData(data.validate || []);
            setSubmissionId(data.submissionId)
            setDocumentinventoryid(data.documentInventoryId)

        } catch (error) {
            console.error("Failed to load document inventory", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Spin size="large" tip="Loading document..." />
            </div>
        );
    }

    const handleStrIntelligenceNavigation = (e) => {
        e.preventDefault();

        navigate("/dashboard");
    };
    const handleChatPropmptClick = () => {
        setShowChatWindow(true);
    };
    const handleUploadTextClick = () => {
        setShowChatWindow(false);
    };

    return (
        <>
            {currentStoredFile && (
                <DashboradStyled>
                    <div style={{ marginTop: 40 }}>
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
                                    Validate
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

                        {showChatWindow ? (
                            <ChatPropmpt data={submissionId} />
                        ) : (
                            <>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <Card>
                                            <ExtractedInfoTable extractedData={headerData} />
                                        </Card>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className="dashboard-row">
                                    <Col xs={24}>
                                        <Card className="dashboard-card">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    minHeight: "48px",
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontSize: 16, fontWeight: 600 }}>
                                                        {apiData.documentShortName}
                                                    </div>
                                                    <div style={{ fontSize: 13, color: "#737791" }}>
                                                        Extracted data comparison with PDF document
                                                    </div>
                                                </div>

                                                <div className="switch-container">
                                                    <button
                                                        className={`switch-btn ${activeTab === "validate" ? "active" : ""
                                                            }`}
                                                        onClick={() => setActiveTab("validate")}
                                                    >
                                                        Validate
                                                    </button>

                                                    <button
                                                        className={`switch-btn ${activeTab === "mindmap" ? "active" : ""
                                                            }`}
                                                        onClick={() => setActiveTab("mindmap")}
                                                    >
                                                        Mind Map
                                                    </button>
                                                    
                                                </div>
                                                <div className="chatbot-float">
                                                    <img src={ChatPromptIcon} alt="chat-prompt" onClick={handleChatPropmptClick} />
                                                </div>
                                            </div>

                                            {activeTab === "mindmap" && (
                                                <TreeMapView data={minddata} />
                                            )}

                                            {activeTab === "validate" && (
                                                <DataExtractionScreen
                                                    uploadedFile={null}
                                                    uploadedFileName={apiData.documentShortName}
                                                    uploadedFileUrl={currentStoredFile?.data}
                                                    storedFileData={currentStoredFile}
                                                    apiExtractedData={apiExtractedData}
                                                    documentinventoryid={documentinventoryid}
                                                />
                                            )}
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </div>
                </DashboradStyled>
            )}
        </>

    );
}
