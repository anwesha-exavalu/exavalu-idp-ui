import {
  ToolbarContainer,
  LeftSection,
  RightSection,
} from "../../styles/components/Toolbar/toolbarStyles";
import FilterSection from "./FilterSection";
import ToolsSection from "./ToolsSection";

const Toolbar = ({
  filters,
  tools,
  onSearchChange,
  onDownload,
  resetFilters,
  activeFilters,
  onNewProposalClick,
  filteredDataLength,
}) => {
  return (
    <ToolbarContainer>
      <LeftSection>
        <FilterSection
          filters={filters}
          resetFilters={resetFilters}
          activeFilters={activeFilters}
        />
      </LeftSection>

      <RightSection>
        <ToolsSection
          tools={tools}
          onSearchChange={onSearchChange}
          onDownload={onDownload}
          onNewProposalClick={onNewProposalClick}
          filteredDataLength={filteredDataLength}
        />
      </RightSection>
    </ToolbarContainer>
  );
};

export default Toolbar;
