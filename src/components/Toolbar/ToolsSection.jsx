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
import { resetExtractionProgress } from "../../features/Extraction-slice/extractionProgressSlice"
import { useDispatch, useSelector } from "react-redux";
import { resetProgressState } from "../../features/progress-submission/ProgressSubmissionSlice";
//import axios from "axios";
export default function ToolsSection({
  tools,
  onSearchChange,
  onDownload,
  onOfferCompare,
  onNewProposalClick,
  filteredDataLength,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const extractionProgress = useSelector(
    (state) => state.extractionProgress.extractionProgress
  );
  const isUploadDisabled =
    extractionProgress > 0 && extractionProgress < 100;

  const submissionId = useSelector((state) => state.progressSubmission.submissionId);
  const TOOL_COMPONENTS = {
    search: (
      <StyledSearch
        key="search"
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
        disabled={isUploadDisabled}
        onClick={() => {
          dispatch(resetExtractionProgress());
          dispatch(resetProgressState());

          // const submissionskip = [
          //   "ac1e746519d0454ca6fec7fe6a4c9e83",
          //   "5ef4443b36d948e7a7ec333cda038f5d",
          //   "dd101fbe92d74c3b878323332bb8949f",
          // ];

          localStorage.setItem("floatingExtractorOpened", 0);

          // if (submissionId && !submissionskip.includes(submissionId)) {
          //   const response = axios.post(
          //     `${import.meta.env.VITE_AI_QUERY}/chatbox/delete?submission_id=${submissionId}`
          //   );

          //   console.log("response", response);
          // }
          navigate("/upload-file");
        }}
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
