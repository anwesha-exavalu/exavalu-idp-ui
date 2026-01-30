import React from "react";
import {
  ActionButton,
  StyledSearch,
} from "../../styles/components/Toolbar/toolbarStyles";
import {
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ToolsSectionWithSearchTerm({
  tools,
  onSearchChange,
  onDownload,
  onOfferCompare,
  onNewProposalClick,
  filteredDataLength,
  searchTerm,
}) {
  console.log(searchTerm);
  const navigate = useNavigate();
  const TOOL_COMPONENTS = {
    search: (
      <StyledSearch
        key="search"
        value={searchTerm}
        placeholder="Search"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearchChange?.(e.target.value)}
        allowClear
      />
    ),

    upload: (
      <ActionButton
        key="upload"
        icon={<UploadOutlined />}
        onClick={() => navigate("/upload-file")}
      >
        Upload File
      </ActionButton>
    ),

    download: (
      <ActionButton
        onClick={onDownload}
        key="download"
        icon={<DownloadOutlined />}
      >
        Export Table
      </ActionButton>
    ),
    offerCompare: (
      <ActionButton onClick={onOfferCompare} key="offerCompare">
        Compare
      </ActionButton>
    ),
    newProposal: (
      <ActionButton onClick={onNewProposalClick} key="newProposal">
        New Plan Proposal
      </ActionButton>
    ),
  };

  return (
    <>
      {filteredDataLength !== 0 && (
        <span style={{ display: "block" }}>
          {filteredDataLength} row(s) fetched
        </span>
      )}

      {tools.map((tool) => TOOL_COMPONENTS[tool] ?? null)}
    </>
  );
}
