import React from "react";
import { Tabletitle } from "../../styles/components/DataTable";
import { Col, Row } from "antd";
import {
  LeftSection,
  RightSection,
  ToolbarContainer,
} from "../../styles/components/Toolbar/toolbarStyles";
import ToolsSectionWithSearchTerm from "./../ToolbarWithSearchTerm/ToolsSectionWithSearchTerm";

export default function DataTableHeaderWithSearchTerm({
  title,
  subtitle,
  filters,
  tools,
  onDownload,
  onSearchChange,
  onNewProposalClick,
  filteredDataLength = 0,
  searchTerm = "",
}) {
  const showCompactToolbar = filters.length === 0 && tools.length > 0;

  return (
    <Tabletitle style={{ marginLeft: "-25px", marginBottom: "-10px" }}>
      <Row gutter={[8, 8]} align="middle" wrap>
        <Col xs={24} style={{ marginLeft: 0, paddingLeft: 0 }}>
          {showCompactToolbar ? (
            <ToolbarContainer>
              <LeftSection>
                <span
                  style={{ fontSize: 14, fontWeight: 600, color: "#212121" }}
                >
                  {title}
                </span>
              </LeftSection>
              <RightSection>
                <ToolsSectionWithSearchTerm
                  tools={tools}
                  onDownload={onDownload}
                  onSearchChange={onSearchChange}
                  onNewProposalClick={onNewProposalClick}
                  filteredDataLength={filteredDataLength}
                  searchTerm={searchTerm}
                />
              </RightSection>
            </ToolbarContainer>
          ) : (
            <ToolbarContainer>
              <LeftSection>
                <span
                  style={{ fontSize: 15, fontWeight: 600, color: "#212121" }}
                >
                  {title}
                </span>
              </LeftSection>
            </ToolbarContainer>
          )}
        </Col>

        {subtitle && (
          <Col xs={24}>
            <ToolbarContainer>
              <LeftSection>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#212121",
                    marginLeft: -5,
                    marginTop: -15,
                  }}
                >
                  {subtitle}
                </span>
              </LeftSection>
            </ToolbarContainer>
          </Col>
        )}
      </Row>
    </Tabletitle>
  );
}
