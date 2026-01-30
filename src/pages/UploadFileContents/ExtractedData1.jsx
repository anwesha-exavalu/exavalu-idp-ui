import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Spin, Modal, Select, Collapse, Checkbox, Input, Table } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  DownloadOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import {
  StyledContainer,
  PDFScrollContainer,
  PDFContainer,
  PDFCanvasWrapper,
  HighlightBox,
  ZoomControls,
  ZoomButton,
  ZoomSlider,
  ZoomPercentage,
  PageIndicator,
  ExtractedDataContainer,
  LoadingContainer,
  LoadingText,
  CardHeaderStyle,
  CardTitleStyle,
  HeaderButton,
  CardBodyStyle,
  ExtractedDataBodyStyle,
  ConfidenceLabel,
  RejectModalContainer,
  RejectIcon,
  RejectTitle,
  RejectMessage,
  RejectButton,
  ActionButtonsSection,
  ActionButtonsRow,
  PrimaryActionButton,
  PDFTitleSection,
  PDFPageInfo,
  SuccessModalContainer,
  SuccessIcon,
  SuccessTitle,
  SuccessMessage,
  SuccessButton,
} from "../../styles/pages/DataExtractionStyle";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const DataExtractionScreen = ({
  uploadedFile,
  uploadedFileName,
  uploadedFileUrl,
  storedFileData,
  apiExtractedData,
  onDataFieldsCountChange,
  hideActionButtons = false,
  viewMode = false,
}) => {
  const [currentPdfPath, setCurrentPdfPath] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataFields, setTotalDataFields] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [naturalPageSize, setNaturalPageSize] = useState({
    width: 0,
    height: 0,
  });
  const [highlightBox, setHighlightBox] = useState(null);
  const [, setSelectedItemKey] = useState(null);
  const [renderedPages, setRenderedPages] = useState({});
  const [isDataExtracting, setIsDataExtracting] = useState(false);
  const [showExtractedData, setShowExtractedData] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDataNotAccurateModal, setShowDataNotAccurateModal] = useState(false);
  const [textractData, setTextractData] = useState([]);
  const { Panel } = Collapse;
  const { Option } = Select;
  const containerRef = useRef(null);
  const pdfScrollRef = useRef(null);
  const extractedDataScrollRef = useRef(null);
  const pdfDocRef = useRef(null);
  const renderTasksRef = useRef({});
  const pagesContainerRef = useRef(null);
  const DPI_SCALE = 2;
  const CONFIDENCE_THRESHOLD = 70;
  const [rowEdits, setRowEdits] = useState({});
  const tableRows = [];
  const [searchText, setSearchText] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState("all");



  //const navigate = useNavigate();
  const formatConfidenceScore = (score) => {
    if (score === null || score === undefined) return null;
    return Math.round(score);
  };


  const countDataFields = (data) => {
    let count = 0;
    const countDetails = {
      mainFields: 0,
      subFields: 0,
      arrayItems: 0,
      totalProcessed: 0,
    };

    if (!data || !Array.isArray(data)) {
      return 0;
    }
    const countFieldsRecursively = (
      obj,
      path = "",
      depth = 0,
      parentType = "root"
    ) => {
      if (!obj || typeof obj !== "object") {
        return;
      }

      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (key === "page") {
          return;
        }

        if (value && typeof value === "object" && !Array.isArray(value)) {
          const hasValue = Object.prototype.hasOwnProperty.call(value, "value");
          const hasChecked = Object.prototype.hasOwnProperty.call(
            value,
            "checked"
          );
          const hasConfidence = Object.prototype.hasOwnProperty.call(
            value,
            "confidence_score"
          );
          const hasBoundingBox = Object.prototype.hasOwnProperty.call(
            value,
            "bounding_box"
          );
          const hasLine = Object.prototype.hasOwnProperty.call(value, "line");
          if (
            hasValue ||
            hasChecked ||
            hasConfidence ||
            hasBoundingBox ||
            hasLine
          ) {
            count++;
            countDetails.totalProcessed++;
            if (depth === 1 || (depth === 2 && parentType === "section")) {
              countDetails.mainFields++;
            } else {
              countDetails.subFields++;
            }
            if (hasValue && Array.isArray(value.value)) {
              value.value.forEach((arrayItem, arrayIndex) => {
                if (arrayItem && typeof arrayItem === "object") {
                  countFieldsRecursively(
                    arrayItem,
                    `${currentPath}[${arrayIndex}]`,
                    depth + 1,
                    "array_item"
                  );
                  countDetails.arrayItems++;
                }
              });
            }
            const standardProps = [
              "value",
              "checked",
              "confidence_score",
              "bounding_box",
              "line",
            ];
            const nestedFields = Object.entries(value).filter(
              ([nestedKey]) => !standardProps.includes(nestedKey)
            );

            if (nestedFields.length > 0) {
              nestedFields.forEach(([nestedKey, nestedValue]) => {
                if (nestedValue && typeof nestedValue === "object") {
                  countFieldsRecursively(
                    { [nestedKey]: nestedValue },
                    currentPath,
                    depth + 1,
                    "nested"
                  );
                }
              });
            }
          } else {
            countFieldsRecursively(value, currentPath, depth + 1, "container");
          }
        } else if (Array.isArray(value)) {
          value.forEach((arrayItem, arrayIndex) => {
            if (arrayItem && typeof arrayItem === "object") {
              countFieldsRecursively(
                arrayItem,
                `${currentPath}[${arrayIndex}]`,
                depth + 1,
                "direct_array_item"
              );
            }
          });
        }
      });
    };
    data.forEach((pageData, pageIndex) => {
      if (!pageData || typeof pageData !== "object") {
        return;
      }

      countFieldsRecursively(pageData, `page${pageIndex + 1}`, 0, "page");
    });
    return count;
  };


  const parseApiResponse = (apiData) => {
    try {
      if (apiData && typeof apiData === "object" && apiData.results) {
        let parsedResults;
        if (typeof apiData.results === "string") {
          try {
            let jsonString = apiData.results;
            if (jsonString.includes('\\"')) {
              const firstParse = JSON.parse(jsonString);
              if (typeof firstParse === "string") {
                parsedResults = JSON.parse(firstParse);
              } else {
                parsedResults = firstParse;
              }
            } else {
              parsedResults = JSON.parse(jsonString);
            }
          } catch (parseError) {
            console.error("Error parsing JSON string:", parseError);
            return [];
          }
        } else {
          parsedResults = apiData.results;
        }

        if (Array.isArray(parsedResults)) {
          return parsedResults.filter(
            (item) => item !== null && item !== undefined
          );
        } else if (
          typeof parsedResults === "object" &&
          parsedResults !== null
        ) {
          return [parsedResults];
        }
      }

      if (Array.isArray(apiData)) {
        return apiData.filter((item) => item !== null && item !== undefined);
      }

      if (typeof apiData === "object" && apiData !== null && !apiData.results) {
        return [apiData];
      }
      return [];
    } catch (error) {
      console.error("Error parsing API response:", error);
      return [];
    }
  };

  const getPdfMapping = () => {
    const mapping = {};
    if (typeof window !== "undefined" && window.fileStorage) {
      const allFiles = window.fileStorage.getAllFiles();
      allFiles.forEach((file) => {
        if (file.name && file.data && file.type === "application/pdf") {
          mapping[file.name] = file.data;
        }
      });
    }
    return mapping;
  };

  const getPdfSource = () => {
    if (storedFileData && storedFileData.data) {
      return storedFileData.data;
    }
    if (uploadedFileUrl) {
      return uploadedFileUrl;
    }
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    if (uploadedFileName) {
      const pdfMapping = getPdfMapping();
      if (pdfMapping[uploadedFileName]) {
        return pdfMapping[uploadedFileName];
      }
    }
    if (
      typeof window !== "undefined" &&
      window.fileStorage &&
      uploadedFileName
    ) {
      const allFiles = window.fileStorage.getAllFiles();
      const matchingFile = allFiles.find(
        (file) => file.name === uploadedFileName
      );
      if (matchingFile && matchingFile.data) {
        return matchingFile.data;
      }
    }
    return null;
  };
  useEffect(() => {
    if (
      onDataFieldsCountChange &&
      typeof onDataFieldsCountChange === "function"
    ) {
      onDataFieldsCountChange(totalDataFields);
    }
  }, [totalDataFields, onDataFieldsCountChange]);
  const hasValidBoundingBox = (bbox) => {
    return (
      bbox &&
      typeof bbox === "object" &&
      (bbox.left !== undefined || bbox.Left !== undefined) &&
      (bbox.top !== undefined || bbox.Top !== undefined) &&
      (bbox.width !== undefined || bbox.Width !== undefined) &&
      (bbox.height !== undefined || bbox.Height !== undefined) &&
      (bbox.width > 0 || bbox.Width > 0) &&
      (bbox.height > 0 || bbox.Height > 0)
    );
  };

  const normalizeBoundingBox = (bbox) => {
    if (!bbox) return null;
    return {
      Left: bbox.Left || bbox.left || 0,
      Top: bbox.Top || bbox.top || 0,
      Width: bbox.Width || bbox.width || 0,
      Height: bbox.Height || bbox.height || 0,
    };
  };

  useEffect(() => {
    const pdfSource = getPdfSource();

    if (pdfSource) {
      setCurrentPdfPath(pdfSource);
      setIsDataExtracting(true);
      setShowExtractedData(false);

      let dataToUse = [];
      if (apiExtractedData) {
        dataToUse = parseApiResponse(apiExtractedData);
      }

      setTextractData(dataToUse);

      const totalFields = countDataFields(dataToUse);
      setTotalDataFields(totalFields);
      if (dataToUse.length > 0) {
        setTimeout(() => {
          setIsDataExtracting(false);
          setShowExtractedData(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsDataExtracting(false);
          setShowExtractedData(true);
        }, 3000);
      }
    } else {
      //console.warn('No PDF source available');
    }
  }, [
    uploadedFileName,
    uploadedFileUrl,
    uploadedFile,
    storedFileData,
    apiExtractedData,
  ]);

  useEffect(() => {
    if (apiExtractedData) {
      const normalizedData = parseApiResponse(apiExtractedData);
      setTextractData(normalizedData);
      const totalFields = countDataFields(normalizedData);
      setTotalDataFields(totalFields);

      if (onDataFieldsCountChange && totalFields > 0) {
        onDataFieldsCountChange(totalFields);
      }

      if (normalizedData.length > 0) {
        setIsDataExtracting(false);
        setShowExtractedData(true);
      }
    }
  }, [apiExtractedData, onDataFieldsCountChange]);

  const renderAllPDFPages = async () => {
    if (!pdfDocRef.current || !containerRef.current) return;
    Object.values(renderTasksRef.current).forEach((task) => {
      if (task && task.cancel) {
        task.cancel();
      }
    });
    renderTasksRef.current = {};

    try {
      const currentScale = baseScale * zoomLevel;
      const newRenderedPages = {};

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdfDocRef.current.getPage(pageNum);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false });
        const viewport = page.getViewport({ scale: currentScale * DPI_SCALE });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        const displayWidth = viewport.width / DPI_SCALE;
        const displayHeight = viewport.height / DPI_SCALE;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        canvas.style.display = "block";
        canvas.style.marginBottom = "10px";
        canvas.style.border = "1px solid #e8e8e8";
        canvas.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        canvas.style.backgroundColor = "white";
        canvas.style.imageRendering = "auto";
        canvas.dataset.pageNumber = pageNum;

        const renderTask = page.render({
          canvasContext: context,
          viewport,
          intent: "display",
        });
        renderTasksRef.current[pageNum] = renderTask;

        try {
          await renderTask.promise;
          newRenderedPages[pageNum] = {
            canvas,
            viewport,
            pageHeight: displayHeight,
            pageWidth: displayWidth,
            displayScale: currentScale,
          };
        } catch (error) {
          console.log("error", error)
          // if (error.name !== "RenderingCancelledException") {
          // }
        }
      }

      setRenderedPages(newRenderedPages);
    } catch (error) {
      console.error("Error rendering PDF:", error);
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      if (!currentPdfPath) return;
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: currentPdfPath,
          cMapUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/cmaps/",
          cMapPacked: true,
        });
        const pdf = await loadingTask.promise;
        pdfDocRef.current = pdf;
        setTotalPages(pdf.numPages);
        const page = await pdf.getPage(1);
        const naturalWidth = page.view[2];
        const naturalHeight = page.view[3];
        setNaturalPageSize({ width: naturalWidth, height: naturalHeight });
        const container = containerRef.current;
        if (!container) return;
        const { width: clientWidth } = container.getBoundingClientRect();
        const availableWidth = clientWidth - 20;
        const calculatedBaseScale = availableWidth / naturalWidth;
        setBaseScale(calculatedBaseScale);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [currentPdfPath]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !naturalPageSize.width) return;
      const { width: clientWidth } =
        containerRef.current.getBoundingClientRect();
      const availableWidth = clientWidth - 20;
      const calculatedBaseScale = availableWidth / naturalPageSize.width;
      setBaseScale(calculatedBaseScale);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      Object.values(renderTasksRef.current).forEach((task) => {
        if (task && task.cancel) {
          task.cancel();
        }
      });
      renderTasksRef.current = {};
    };
  }, [naturalPageSize.width]);

  useEffect(() => {
    if (baseScale && pdfDocRef.current && totalPages > 0) {
      const timeoutId = setTimeout(() => {
        renderAllPDFPages();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [zoomLevel, baseScale, totalPages]);

  useEffect(() => {
    if (pagesContainerRef.current && Object.keys(renderedPages).length > 0) {
      pagesContainerRef.current.innerHTML = "";

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const pageData = renderedPages[pageNum];
        if (pageData) {
          pagesContainerRef.current.appendChild(pageData.canvas);
        }
      }
    }
  }, [renderedPages, totalPages]);

  const scrollToHighlight = (bbox, targetPage) => {
    const normalizedBbox = normalizeBoundingBox(bbox);
    if (!normalizedBbox || !pdfScrollRef.current || !renderedPages[targetPage])
      return;
    const currentScale = baseScale * zoomLevel;
    const pageData = renderedPages[targetPage];
    if (!pageData) return;
    let cumulativeHeight = 0;
    for (let i = 1; i < targetPage; i++) {
      const prevPageData = renderedPages[i];
      if (prevPageData) {
        cumulativeHeight += prevPageData.pageHeight + 20;
      }
    }
    const canvasWidth = naturalPageSize.width * currentScale;
    const canvasHeight = naturalPageSize.height * currentScale;
    const left = normalizedBbox.Left * canvasWidth;
    const top = normalizedBbox.Top * canvasHeight;
    const boxWidth = normalizedBbox.Width * canvasWidth;
    const boxHeight = normalizedBbox.Height * canvasHeight;
    const highlightCenterX = left + boxWidth / 2;
    const highlightCenterY = top + boxHeight / 2;
    const absoluteHighlightY = cumulativeHeight + highlightCenterY;
    const scrollContainer = pdfScrollRef.current;
    const containerRect = scrollContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const scrollLeft = Math.max(0, highlightCenterX + 10 - containerWidth / 2);
    const scrollTop = Math.max(
      0,
      absoluteHighlightY + 10 - containerHeight / 2
    );
    scrollContainer.scrollTo({
      left: scrollLeft,
      top: scrollTop,
      behavior: "smooth",
    });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleZoomSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setZoomLevel(value);
  };

  //const handleExportData = () => { };
  const handleExportData = () => {
    const updatedJson = buildUpdatedExtractedJson();

    const downloadData = {
      fileName: uploadedFileName || "extracted_data",
      extractedData: updatedJson,
      timestamp: new Date().toISOString(),
      totalPages,
      totalDataFields,
    };

    const blob = new Blob(
      [JSON.stringify(downloadData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${downloadData.fileName}_updated.json`;
    link.click();
    URL.revokeObjectURL(url);
  };


  const handleDownload = () => {

  };

  const handleSaveToDocumentInventory = () => {
    const updatedJson = buildUpdatedExtractedJson();

    console.log("UPDATED JSON", updatedJson);
    setShowSuccessModal(true);
  };

  const handleViewTestAccuracy = () => {
    setShowSuccessModal(false);
  };
  const handleDataNotAccurateClose = () => {
    setShowDataNotAccurateModal(false);
  };
  // const handleDataNotAccurate = () => {
  //   setShowDataNotAccurateModal(true);
  // };

  const handleDataNotAccurateContinue = () => {
    setShowDataNotAccurateModal(false);
    window.location.reload();

  };
  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowDataNotAccurateModal(false);
  };

  useEffect(() => {
    const detectCurrentPage = () => {
      if (!pdfScrollRef.current || Object.keys(renderedPages).length === 0)
        return;
      const scrollContainer = pdfScrollRef.current;
      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;
      const centerPoint = scrollTop + containerHeight / 2;
      let cumulativeHeight = 0;
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const pageData = renderedPages[pageNum];
        if (pageData) {
          const pageHeight = pageData.pageHeight + 10;

          if (
            centerPoint >= cumulativeHeight &&
            centerPoint < cumulativeHeight + pageHeight
          ) {
            setCurrentPage(pageNum);
            break;
          }
          cumulativeHeight += pageHeight;
        }
      }
    };

    const scrollContainer = pdfScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", detectCurrentPage);
      detectCurrentPage();
      return () => {
        scrollContainer.removeEventListener("scroll", detectCurrentPage);
      };
    }
  }, [renderedPages, totalPages]);

  const renderHighlightBox = () => {
    if (
      !highlightBox ||
      Object.keys(renderedPages).length === 0 ||
      !highlightBox.page
    )
      return null;

    const targetPage = highlightBox.page;
    const pageData = renderedPages[targetPage];

    if (!pageData) return null;

    let cumulativeHeight = 0;
    for (let i = 1; i < targetPage; i++) {
      const prevPageData = renderedPages[i];
      if (prevPageData) {
        cumulativeHeight += prevPageData.pageHeight + 10;
      }
    }

    const currentScale = baseScale * zoomLevel;
    const canvasWidth = naturalPageSize.width * currentScale;
    const canvasHeight = naturalPageSize.height * currentScale;

    const left = highlightBox.Left * canvasWidth;
    const top = highlightBox.Top * canvasHeight;
    const boxWidth = highlightBox.Width * canvasWidth;
    const boxHeight = highlightBox.Height * canvasHeight;
    const absoluteTop = cumulativeHeight + top;

    const highlightColor = highlightBox.confidenceScore;

    const dynamicStyle = {
      left: `${left - 4}px`,
      top: `${absoluteTop - 4}px`,
      width: `${boxWidth + 8}px`,
      height: `${boxHeight + 8}px`,
      borderColor: highlightColor,
      backgroundColor: `${highlightColor}20`,
    };

    return <HighlightBox style={dynamicStyle} />;
  };

  const handleClickHighlight = (
    itemKey,
    boundingBox,
    page,
    confidenceScore
  ) => {
    setSelectedItemKey(itemKey);

    const normalizedBbox = normalizeBoundingBox(boundingBox);

    if (hasValidBoundingBox(normalizedBbox)) {
      setHighlightBox({
        ...normalizedBbox,
        page: page,
        confidenceScore: confidenceScore,
      });
      setTimeout(() => scrollToHighlight(normalizedBbox, page), 200);
    } else {
      setHighlightBox(null);
    }
  };



  const renderZoomControls = () => (
    <ZoomControls>
      <PageIndicator>
        {currentPage}/{totalPages}
      </PageIndicator>
      <ZoomButton
        onClick={handleZoomOut}
        disabled={zoomLevel <= 0.25}
        title="Zoom Out"
      >
        <MinusOutlined />
      </ZoomButton>
      <ZoomSlider
        type="range"
        min="0.25"
        max="4"
        step="0.25"
        value={zoomLevel}
        onChange={handleZoomSliderChange}
        title={`Zoom: ${Math.round(zoomLevel * 100)}%`}
      />
      <ZoomButton
        onClick={handleZoomIn}
        disabled={zoomLevel >= 4}
        title="Zoom In"
      >
        <PlusOutlined />
      </ZoomButton>
      <ZoomPercentage>{Math.round(zoomLevel * 100)}%</ZoomPercentage>
    </ZoomControls>
  );
  const setValueByPath = (obj, path, overrideValue) => {
    const keys = path.split(".");
    let curr = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) return;
      curr = curr[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (!curr[lastKey]) return;

    // 🔹 Ensure it's an object
    if (typeof curr[lastKey] !== "object") {
      curr[lastKey] = {
        originalValue: curr[lastKey],
      };
    }

    // 🔹 Preserve extracted data
    if ("value" in curr[lastKey]) {
      curr[lastKey].overrideValue = overrideValue;
    } else if ("text" in curr[lastKey]) {
      curr[lastKey].overrideValue = overrideValue;
    } else {
      curr[lastKey].overrideValue = overrideValue;
    }

    // 🔹 Metadata
    curr[lastKey].reviewed = true;
    curr[lastKey].isOverridden = true;
  };

  // const setValueByPath = (obj, path, newValue) => {
  //   const keys = path.split(".");
  //   let curr = obj;

  //   for (let i = 0; i < keys.length - 1; i++) {
  //     if (!curr[keys[i]]) return;
  //     curr = curr[keys[i]];
  //   }

  //   const lastKey = keys[keys.length - 1];

  //   if (curr[lastKey]) {
  //     if ("value" in curr[lastKey]) {
  //       curr[lastKey].value = newValue;
  //     } else if ("text" in curr[lastKey]) {
  //       curr[lastKey].text = newValue;
  //     } else {
  //       curr[lastKey] = newValue;
  //     }

  //     // Optional metadata

  //      curr[lastKey].reviewed = true;
  //     // curr[lastKey].overridden = true;
  //   }
  // };

  const buildUpdatedExtractedJson = () => {
    //clone original extracted data
    const updatedData = structuredClone(textractData);

    Object.entries(rowEdits).forEach(([rowKey, edit]) => {
      if (!edit.review || !edit.overrideValue) return;

      const row = tableRows.find((r) => r.key === rowKey);
      if (!row) return;

      const pageIndex = updatedData.findIndex(
        (p, idx) => (p.page || idx + 1) === row.page
      );
      if (pageIndex === -1) return;

      const pageObj = updatedData[pageIndex];
      const sectionObj = pageObj[row.section];
      if (!sectionObj) return;

      // override value back
      setValueByPath(sectionObj, row.fieldPath, edit.overrideValue);
    });

    return updatedData;
  };


  const renderPDFPreview = () => (
    <PDFScrollContainer ref={pdfScrollRef} className="pdf-scroll-container">
      <PDFContainer ref={containerRef}>
        <PDFCanvasWrapper>
          <div ref={pagesContainerRef} />
          {renderHighlightBox()}
        </PDFCanvasWrapper>
      </PDFContainer>
    </PDFScrollContainer>
  );



  const renderExtractedDataContent = () => {
    if (isDataExtracting) {
      return (
        <LoadingContainer>
          <Spin size="large" />
          <LoadingText>Extracting data...</LoadingText>
        </LoadingContainer>
      );
    }

    if (!showExtractedData) {
      return <div />;
    }

    if (!textractData || textractData.length === 0) {
      return (
        <LoadingContainer>
          <LoadingText>No data available to display</LoadingText>
        </LoadingContainer>
      );
    } // Recursive helper to traverse nested objects
    const renderDataStructure = (data, path = "", page = 1, section = "") => {
      if (!data || typeof data !== "object") return;

      Object.entries(data).forEach(([key, value], index) => {
        const fieldPath = path ? `${path}.${key}` : key;

        // Leaf node with actual value
        if (value && typeof value === "object" && ("value" in value || "text" in value)) {
          const rawConfidence = value.confidence_score ?? null;
          tableRows.push({
            key: `${page}-${section}-${fieldPath}-${index}`,
            section,
            field: key,
            fieldPath,
            value: value.value || value.text || "-",
            confidence: rawConfidence,
            confidencePercent:
              rawConfidence !== null ? formatConfidenceScore(rawConfidence) : "-",
            boundingBox: value.bounding_box || null,
            page,
            review: rowEdits?.[`${page}-${section}-${fieldPath}-${index}`]?.review || false,
            overrideValue:
              rowEdits?.[`${page}-${section}-${fieldPath}-${index}`]?.overrideValue || "",
          });

          return;
        }

        // Nested object
        if (value && typeof value === "object" && !Array.isArray(value)) {
          renderDataStructure(value, fieldPath, page, section);
        }
      });
    };

    // Traverse all pages and sections
    textractData.forEach((pageData, pageIndex) => {
      if (!pageData || typeof pageData !== "object") return;

      const pageNumber = pageData.page || pageIndex + 1;

      Object.entries(pageData).forEach(([sectionKey, sectionData]) => {
        if (sectionKey === "page" || typeof sectionData !== "object") return;

        renderDataStructure(sectionData, "", pageNumber, sectionKey);
      });
    });
    const getHighlightColor = (confidenceScore) => {
      const score = Number(confidenceScore);
      if (!score || score < CONFIDENCE_THRESHOLD) {
        return "#FF0000"; // red for low confidence
      }
      return "#1890ff"; // blue for good confidence
    };
    const handleReviewChange = (checked, record) => {
      setRowEdits((prev) => ({
        ...prev,
        [record.key]: {
          review: checked,
          overrideValue: checked ? record.value : "",
        },
      }));
    };

    const handleOverrideChange = (val, record) => {
      setRowEdits((prev) => ({
        ...prev,
        [record.key]: {
          ...prev[record.key],
          overrideValue: val,
        },
      }));
    };
    const columns = [
      {
        title: "Document Provision Reference",
        dataIndex: "field",
        width: "20%",
        render: (_, record) => {
          if (record.isSection) {
            return {
              children: record.title,
              props: { colSpan: 5 },
            };
          }
          return record.field;
        },
      },
      {
        title: "Extracted Value",
        width: "20%",
        render: (_, record) =>
          record.isSection ? { props: { colSpan: 0 } } : record.value,
      },
      {
        title: "Confidence Level",
        width: "10%",
        align: "center",
        render: (_, record) =>
          record.isSection ? { props: { colSpan: 0 } } : (
            <ConfidenceLabel style={{ color: getHighlightColor(record.confidencePercent) }}>
              {record.confidencePercent}%
            </ConfidenceLabel>
          ),
      },
      {
        title: "Review",
        width: "8%",
        align: "center",
        render: (_, record) =>
          record.isSection ? { props: { colSpan: 0 } } : (
            <Checkbox
              checked={record.review}
              onChange={(e) =>
                handleReviewChange(e.target.checked, record)
              }
              onClick={(e) => e.stopPropagation()}
            />
          ),
      },
      {
        title: "Override Value",
        width: "20%",
        render: (_, record) =>
          record.isSection ? { props: { colSpan: 0 } } : (
            <Input
              disabled={!record.review}
              value={record.overrideValue}
              placeholder="Override value"
              onChange={(e) =>
                handleOverrideChange(e.target.value, record)
              }
              onClick={(e) => e.stopPropagation()}
            />
          ),
      },
    ];
    const confidenceFilterMatch = (row) => { if (confidenceFilter === "all") return true; const score = Number(row.confidencePercent); if (isNaN(score)) return false; switch (confidenceFilter) { case "below_50": return score < 50; case "50_75": return score >= 50 && score < 75; case "75_80": return score >= 75 && score < 80; case "80_85": return score >= 80 && score < 85; case "85_90": return score >= 85 && score < 90; case "90_above": return score >= 90; default: return true; } };
    const filteredRows = tableRows.filter((row) => {
      const text = String(searchText?.toLowerCase() || "");

      const matchesSearch =
        !searchText ||
        String(row.field)?.toLowerCase().includes(text) ||
        String(row.value)?.toLowerCase().includes(text) ||
        String(row.overrideValue)?.toLowerCase().includes(text) ||
        String(row.confidencePercent)?.toLowerCase().includes(text);
        const matchesConfidence = confidenceFilterMatch(row);

      return matchesSearch && matchesConfidence;
    });

    // const filteredRows = tableRows.filter((row) => {
    //   if (!searchText) return true;

    //   const text = String(searchText.toLowerCase());

    //   return (
    //     //String(row.section)?.toLowerCase().includes(text) ||
    //     String(row.field)?.toLowerCase().includes(text) ||
    //     String(row.value)?.toLowerCase().includes(text) ||
    //     String(row.overrideValue)?.toLowerCase().includes(text) ||
    //     String(row.confidencePercent)?.toLowerCase().includes(text)
    //   );
    // });

    return (
      <ExtractedDataContainer
        ref={extractedDataScrollRef}
        className="extracted-data-scroll-container"
      >
        <Table
          bordered
          size="small"
          pagination={false}
          rowKey="key"
          dataSource={filteredRows}
          columns={columns}
          onRow={(record) => ({
            onClick: () =>
              handleClickHighlight(
                record.key,
                record.boundingBox,
                record.page,
                record.confidence
              ),
          })}
        />


      </ExtractedDataContainer>
    );
  };


  const renderExtractedDataCard = () => (

    <Card
      title={
        <Row justify="space-between" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={24} lg={4}>
            <CardTitleStyle>Extracted Data</CardTitleStyle>
            {/* <PDFPageInfo>Total data extracted: {totalDataFields}</PDFPageInfo> */}
          </Col>
          <Col
            xs={24}
            sm={12}
            md={24}
            lg={20}
            style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
          >
            <Select
              value={confidenceFilter}
              style={{ width: 200 }}
              onChange={setConfidenceFilter}
            >
              <Select.Option value="all">All Confidence %</Select.Option>
              <Select.Option value="below_50">Below 50%</Select.Option>
              <Select.Option value="50_75">50% - 75%</Select.Option>
              <Select.Option value="75_80">75% - 80%</Select.Option>
              <Select.Option value="80_85">80% - 85%</Select.Option>
              <Select.Option value="85_90">85% - 90%</Select.Option>
              <Select.Option value="90_above">90% & Above</Select.Option>
            </Select>

            <Input
              placeholder="Search extracted data"
              allowClear
              style={{ width: 220 }}
              onChange={(e) => setSearchText(e.target.value)}
            />


            <HeaderButton onClick={handleExportData}>
              <ExportOutlined /> Export Data
            </HeaderButton>
          </Col>
        </Row>
      }
      headStyle={CardHeaderStyle}
      bodyStyle={{
        ...ExtractedDataBodyStyle,
        paddingBottom: "0px",
      }}
    >
      {renderExtractedDataContent()}
    </Card>
  );

  // Success Modal Component
  const renderSuccessModal = () => (
    <Modal
      open={showSuccessModal}
      onCancel={handleModalClose}
      footer={null}
      centered
      width={490}
      height={227}
      closable={false}
      bodyStyle={{
        textAlign: "center",
      }}
      style={{
        borderRadius: "12px",
      }}
    >
      <SuccessModalContainer>
        <SuccessIcon>
          <CheckCircleOutlined
            style={{
              fontSize: "42px",
              color: "#006172",
            }}
          />
        </SuccessIcon>

        <SuccessTitle>Success!</SuccessTitle>

        <SuccessMessage>
          The document has been approved and is sent to the
          <br />
          IDP feedback system
        </SuccessMessage>

        <SuccessButton onClick={handleViewTestAccuracy}>Continue</SuccessButton>
      </SuccessModalContainer>
    </Modal>
  );
  //Reject Modal
  const renderDataNotAccurateModal = () => (
    <Modal
      open={showDataNotAccurateModal}
      onCancel={handleDataNotAccurateClose}
      footer={null}
      centered
      width={490}
      closable={false}
      bodyStyle={{
        textAlign: "center",
      }}
      style={{
        borderRadius: "12px",
      }}
    >
      <RejectModalContainer>
        <RejectIcon>
          <CloseCircleOutlined
            style={{
              fontSize: "42px",
              color: "#d32f2f",
            }}
          />
        </RejectIcon>

        <RejectTitle>Rejected!</RejectTitle>

        <RejectMessage>
          The document has been flagged as inaccurate
          <br />

        </RejectMessage>

        <RejectButton onClick={handleDataNotAccurateContinue}>
          Continue
        </RejectButton>
      </RejectModalContainer>
    </Modal>
  );
  // New component to render action buttons in separate rows
  const renderActionButtons = () => {
    if (hideActionButtons) {
      return null;
    }

    return (
      <ActionButtonsSection>
        {/* Primary Action Buttons Row */}
        <ActionButtonsRow>
          <Col xs={12} sm={12} md={12} lg={12}>
            <PrimaryActionButton onClick={handleSaveToDocumentInventory}>
              Save
            </PrimaryActionButton>
          </Col>
        </ActionButtonsRow>
        {/* <ActionButtonsRow>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SecondaryActionButton onClick={handleDataNotAccurate}>
              Data Not Accurate
            </SecondaryActionButton>
          </Col>
        </ActionButtonsRow> */}
      </ActionButtonsSection>
    );
  };

  const renderPDFCard = () => (
    <Card
      title={
        <Row justify="space-between" align="middle" gutter={[8, 8]}>
          <Col xs={6} sm={6} md={8} lg={2}>
            <PDFTitleSection>
              <CardTitleStyle>Documents</CardTitleStyle>
              <PDFPageInfo>Total Pages: {totalPages || 0}</PDFPageInfo>
            </PDFTitleSection>
          </Col>
          <Col xs={10} sm={10} md={24} lg={8}>
            {/* Zoom Controls with responsive width */}
            <div>{renderZoomControls()}</div>
          </Col>
          <Col xs={8} sm={8} md={24} lg={6}>
            {/* Download button */}
            <HeaderButton onClick={handleDownload}>
              <DownloadOutlined /> Download
            </HeaderButton>
          </Col>
        </Row>
      }
      headStyle={CardHeaderStyle}
      bodyStyle={CardBodyStyle}
    >
      {renderPDFPreview()}
    </Card>
  );

  if (viewMode) {
    return (
      <StyledContainer>
        <Row
          gutter={[16, 8]}
          align="middle"
          justify="space-between"
          style={{ paddingRight: 16 }}
        >
          {/* Title for view mode */}
          <Col span={24}>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#212121",
                  marginBottom: 20,
                }}
              >
                Document Preview
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          {/* Show only PDF in view mode */}
          <Col xs={24} xl={24} lg={24} md={24}>
            {renderPDFCard()}
          </Col>
        </Row>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <Row
        gutter={[16, 8]}
        align="middle"
        justify="space-between"
        style={{ paddingRight: 16 }}
      >
        {/* Title & Subtitle */}
        <Col span={24}>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#212121",
                marginBottom: 20,
              }}
            >
              Extracted data comparison with PDF document
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col xs={24} xl={14} lg={14} md={14}>
          {renderExtractedDataCard()}
        </Col>
        <Col xs={24} xl={10} lg={10} md={10}>
          {renderPDFCard()}
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col xs={24} xl={10} lg={10} md={10}>
          {renderActionButtons()}
        </Col>
      </Row>
      {renderSuccessModal()}
      {renderDataNotAccurateModal()}
    </StyledContainer>
  );
};

export default DataExtractionScreen;
