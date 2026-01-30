import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import PopupModal from "../../components/PopupModal";
import UploadDocumentScreen from "../../pages/UploadFileContents/UploadDocument";
import {
  getFilter,
  getWidgetTableData,
  handleDownloadTableData,
  excelDateToJSDate,
} from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setDataCount } from "../../features/data-count/dataCountSlice";
import { setNewDocuments } from "../../features/document-inventory/documentInventorySlice";
import { format } from "date-fns";
import { Col, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
export default function DocumentInventory({
  dataRows,
  scope,
  index,
  widgetStaticData,
  idKey,
}) {
  const documentInventoryTitle = widgetStaticData.title;
  const documentInventorySubtitle = widgetStaticData.subtitle;
  const newDocuments = useSelector(
    (state) => state.documentInventory.newDocuments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loadDocumentsFromSession = () => {
      try {
        const sessionData = sessionStorage.getItem("documentInventoryData");
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);

          dispatch(setNewDocuments(parsedData));
        }
      } catch (error) {
        console.error("Error loading documents from session storage:", error);

        sessionStorage.removeItem("documentInventoryData");
      }
    };

    loadDocumentsFromSession();
  }, [dispatch]);

  useEffect(() => {
    try {
      if (newDocuments.length > 0) {
        sessionStorage.setItem(
          "documentInventoryData",
          JSON.stringify(newDocuments)
        );
      } else {
        sessionStorage.removeItem("documentInventoryData");
      }
    } catch (error) {
      console.error("Error saving documents to session storage:", error);
    }
  }, [newDocuments]);

  const documentInventoryTableData = useMemo(() => {
    return getWidgetTableData(dataRows, scope, index, widgetStaticData);
  }, [dataRows, scope, index, widgetStaticData]);

  const documentInventoryColumns = documentInventoryTableData.columns;
  const originalDataSource = documentInventoryTableData.data;
  const documentInventoryDataSource = useMemo(() => {
    if (newDocuments.length > 0) {
      return [...newDocuments, ...originalDataSource];
    }
    return originalDataSource;
  }, [newDocuments, originalDataSource]);

  const [activeFilters, setActiveFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [, setSelectedRowData] = useState(null);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [docViewerContent, setDocViewerContent] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const requiredDocuments = documentInventoryDataSource.filter(
    (data) => data["Class"] == "Required"
  );
  const archivedDocuments = documentInventoryDataSource.filter(
    (data) => data["Class"] == "Archive"
  );

  useEffect(() => {
    setFilteredData(documentInventoryDataSource);
    dispatch(
      setDataCount({
        requiredDocuments: requiredDocuments.length,
        archivedDocuments: archivedDocuments.length,
        planRequiredDocuments: requiredDocuments.length,
        planArchivedDocuments: archivedDocuments.length,
      })
    );
  }, [
    documentInventoryDataSource,
    dispatch,
    requiredDocuments.length,
    archivedDocuments.length,
  ]);

  const filteringFields = widgetStaticData.filteringCriteria ?? [];
  const tools = widgetStaticData.toolbar ?? [];

  const handleFilterChange = (field, selectedValues) => {
    const newFilters = {
      ...activeFilters,
      [field]: selectedValues,
    };

    setActiveFilters(newFilters);

    let data = documentInventoryDataSource;
    if (searchTerm && searchTerm.trim() !== "") {
      data = data.filter((row) => {
        const rowValues = Object.values(row).join(" ").toLowerCase();
        return rowValues.includes(searchTerm.toLowerCase());
      });
    }


    const filtered = data.filter((row) =>
      Object.entries(newFilters).every(([key, values]) =>
        values.length === 0 ? true : values.includes(row[key])
      )
    );

    setFilteredData(filtered);
  };

  const formatDateValue = (value) => {
    if (!value || value === "-" || value === "") {
      return value;
    }

    try {
      let dateObj;
      if (typeof value === "number") {
        dateObj = excelDateToJSDate(value);
      } else {
        dateObj = new Date(value);
      }
      if (isNaN(dateObj.getTime())) {
        return value;
      }

      return format(dateObj, "MM/dd/yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return value;
    }
  };

  const handlePopupOpen = (rowData, columnType) => {
    debugRowData(rowData, "POPUP OPEN");
    setSelectedRowData(rowData);
    const documentDataForApi = {
      submission_id:
        rowData.submissionId ||
        rowData.id ||
        rowData["Document ID"] ||
        "default_submission_id",
      documentName: rowData["Document Short Name"] || "Unknown Document",
      documentId: rowData["Document ID"],
      template: rowData["Template"],
      status: rowData["Status"],
      category: rowData["Category"],
      type: rowData["Type"],
      effectiveDate: rowData["Effective Date"],
      clientSigned: rowData["Client Signed"],
      uploadDate: rowData["Upload Date"],
      lastModified: rowData["Last Modified"],
      fileSize: rowData["File Size"],
      version: rowData["Version"],
      complianceStatus: rowData["Compliance Status"],
      tags: rowData["Tags"],
      description: rowData["Description"],
      ...rowData,
    };

    const content = (
      <div style={{ padding: "0px" }}>
        <UploadDocumentScreen
          documentData={documentDataForApi}
          columnType={columnType}
          onClose={handlePopupClose}
          shouldFetchData={true}
          onApiDataFetched={handleApiDataFetched}
          // viewMode={false}
          enableAutoFetch={true}
        />
      </div>
    );

    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
    setSelectedRowData(null);
  };

  const handleApiDataFetched = (apiData) => { };

  const debugRowData = (rowData, actionType) => { };

  const handleDocViewerOpen = (rowData) => {
    debugRowData(rowData, "DOCUMENT VIEWER");
    const documentDataForApi = {
      submission_id:
        rowData.submissionId ||
        rowData.id ||
        rowData["Document ID"] ||
        "default_submission_id",
      documentName: rowData["Document Short Name"] || "Unknown Document",
      documentId: rowData["Document ID"],
      template: rowData["Template"],
      status: rowData["Status"],
      category: rowData["Category"],
      type: rowData["Type"],
      effectiveDate: rowData["Effective Date"],
      clientSigned: rowData["Client Signed"],
      uploadDate: rowData["Upload Date"],
      lastModified: rowData["Last Modified"],
      fileSize: rowData["File Size"],
      version: rowData["Version"],
      complianceStatus: rowData["Compliance Status"],
      tags: rowData["Tags"],
      description: rowData["Description"],
      ...rowData,
    };

    const content = (
      <div
        style={{
          padding: "0px",
          minHeight: "300px",
          width: "100%",
          overflow: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UploadDocumentScreen
          documentData={documentDataForApi}
          columnType="view"
          onClose={handleDocViewerClose}
          shouldFetchData={true}
          onApiDataFetched={handleApiDataFetched}
          viewMode={true}
          enableAutoFetch={true}
        />
      </div>
    );

    setDocViewerContent(content);
    setIsDocViewerOpen(true);
  };

  const handleDocViewerClose = () => {
    setIsDocViewerOpen(false);
    setDocViewerContent(null);
  };

  const filters = filteringFields.map((field) =>
    getFilter(documentInventoryDataSource, field, handleFilterChange)
  );

  const filteredColumns = documentInventoryColumns.filter(
    (col) => col.dataIndex !== "#"
  );
  const formattedColumns = filteredColumns.map((col, index) => {
    const fixedColumn = index < 3 ? { fixed: "left" } : {};

    const sorter = (a, b) => {
      const valA = a[col.dataIndex];
      const valB = b[col.dataIndex];

      if (!isNaN(valA) && !isNaN(valB)) {
        return Number(valA) - Number(valB);
      }

      if (
        !isNaN(new Date(valA).getTime()) &&
        !isNaN(new Date(valB).getTime())
      ) {
        return new Date(valA) - new Date(valB);
      }

      return String(valA).localeCompare(String(valB));
    };

    if (col.dataIndex == idKey) {
      return {
        ...col,
        hidden: true,
        ...fixedColumn,
      };
    }

    if (
      col.dataIndex === "Document Short Name" ||
      col.dataIndex === "Document ID" ||
      col.dataIndex === "Template"
    ) {
      return {
        ...col,
        ...fixedColumn,
        align:
          col.dataIndex === "Document ID" || col.dataIndex === "Template"
            ? "center"
            : "left",
        sorter,
        render: (text, record) => {
          const isClickable =
            col.dataIndex === "Document Short Name" ||
            col.dataIndex === "Document ID";
          const isNewDocument = newDocuments.some(
            (doc) => doc.id === record.id
          );
          const shouldEnablePopup = isClickable && isNewDocument;

          return (
            <a
              style={{
                color: isNewDocument ? "#006172" : "#006172",
                textDecoration: text === "-" ? "none" : "underline",
                cursor: isClickable ? "pointer" : "default",
                fontWeight: isNewDocument ? "normal" : "normal",
              }}
              onClick={
                shouldEnablePopup
                  ? () => {
                    handlePopupOpen(record, col.dataIndex);
                  }
                  : undefined
              }
            >
              {text}
            </a>
          );
        },
      };
    }

    if (
      col.dataIndex === "Client Signed" ||
      col.dataIndex === "Effective Date"
    ) {
      return {
        ...col,
        ...fixedColumn,
        sorter,
        render: (value, record) => {
          const isNewDocument = newDocuments.some(
            (doc) => doc.id === record.id
          );
          const formattedDate = formatDateValue(value);

          return (
            <span
              style={{
                color: isNewDocument ? "#212121" : "#212121",
                fontWeight: isNewDocument ? "normal" : "normal",
              }}
            >
              {formattedDate}
            </span>
          );
        },
      };
    }

    if (col.dataIndex === "Status") {
      return {
        ...col,
        ...fixedColumn,
        sorter,
        render: (text, record) => {
          const isNewDocument = newDocuments.some(
            (doc) => doc.id === record.id
          );

          if (text === "Expired" || text === "Pending Expiration") {
            return <span style={{ color: "#F15B5B" }}>{text}</span>;
          } else {
            return (
              <span
                style={{
                  color: isNewDocument ? "#212121" : "#212121",
                  fontWeight: isNewDocument ? "normal" : "normal",
                }}
              >
                {text}
              </span>
            );
          }
        },
      };
    }

    if (col.dataIndex === "Expiration Date") {
      return {
        ...col,
        ...fixedColumn,
        sorter,
        render: (value, row) => {
          const text = row["Status"];
          const isNewDocument = newDocuments.some((doc) => doc.id === row.id);
          const color =
            text === "Expired" || text === "Pending Expiration"
              ? "#212121"
              : isNewDocument
                ? "#212121"
                : "#212121";

          return (
            <span
              style={{ color, fontWeight: isNewDocument ? "normal" : "normal" }}
            >
              {value}
            </span>
          );
        },
      };
    }

    if (col.dataIndex === "#") {
      return {
        ...col,
        ...fixedColumn,
        render: (text, record) => {
          const isNewDocument = newDocuments.some(
            (doc) => doc.id === record.id
          );
          return (
            <span
              style={{
                color: isNewDocument ? "#006172" : "#006172",
                fontWeight: "normal",
              }}
            >
              {text}
            </span>
          );
        },
      };
    }

    return {
      ...col,
      ...fixedColumn,
      sorter,
    };
  });

  formattedColumns.push({
    title: "",
    key: "view",
    dataIndex: "view",
    render: (text, record) => {
      const isNewDocument = newDocuments.some((doc) => doc.id === record.id);
      return (
        <a
          style={{
            textDecoration: "underline",
            color: "#006172",
            cursor: "pointer",
          }}
          onClick={
            isNewDocument ? () => handleDocViewerOpen(record) : undefined
          }
        >
          View
        </a>
      );
    },
  });

  const handleResetFilters = () => {
    setActiveFilters({});
    setSearchTerm("");
    setFilteredData(documentInventoryDataSource);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    const filtered = documentInventoryDataSource.filter((row) => {
      const rowValues = Object.values(row).join(" ").toLowerCase();
      return rowValues.includes(term.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const handleDownload = () => {
    handleDownloadTableData(
      filteredData,
      formattedColumns,
      "Document - Inventory.xlsx"
    );
  };

  return (
    <>
      <Col span={24}>
        <DataTable
          columns={formattedColumns}
          data={filteredData}
          filters={filters}
          tools={tools}
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {documentInventoryTitle}
              <Tooltip 
               overlayInnerStyle={{
                      whiteSpace: "normal",
                      background: "white",
                      color: '#006172',
                      width: 380,
                      maxWidth: 400,
                    }}

              title=" Active documents in the inventory" placement="top">
                
                <InfoCircleOutlined   style={{
                        color: '#006172',
                        fontSize: '14px',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                      }} />
              </Tooltip>
            </span>
          }
          subtitle={documentInventorySubtitle}
          onSearchChange={handleSearchChange}
          onDownload={handleDownload}
          resetFilters={handleResetFilters}
          activeFilters={activeFilters}
          enableCascadingFilters={true}
          rawData={documentInventoryDataSource}
          filterFields={filteringFields}
          getFilterFunction={(data, field) =>
            getFilter(data, field, handleFilterChange)
          }
          searchTerm={searchTerm}
        />

        {/* PopupModal with UploadDocumentScreen component (handles both upload and view modes) */}
        <PopupModal
          open={isPopupOpen}
          onCancel={handlePopupClose}
          content={popupContent}
          icon={null}
          width={1200}
          centered={true}
          destroyOnClose={true}
        />

        {/* PopupModal with UploadDocumentScreen component for view mode */}
        <PopupModal
          open={isDocViewerOpen}
          onCancel={handleDocViewerClose}
          content={docViewerContent}
          icon={null}
          width={1000}
          centered={true}
          destroyOnClose={true}
        />
      </Col>
    </>
  );
}
