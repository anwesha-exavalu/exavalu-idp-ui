import {
  ToolbarContainer,
  LeftSection,
  RightSection,
} from "../../styles/components/Toolbar/toolbarStyles";
import ToolsSectionWithSearchTerm from "./ToolsSectionWithSearchTerm";
import FilterSectionWithSearchTerm from "./FilterSectionWithSearchTerm";

const ToolbarWithSearchTerm = ({
  filters,
  tools,
  onSearchChange,
  onDownload,
  resetFilters,
  activeFilters,
  onNewProposalClick,
  filteredDataLength,
  searchTerm,
}) => {
  return (
    <ToolbarContainer>
      <LeftSection>
        <FilterSectionWithSearchTerm
          filters={filters}
          resetFilters={resetFilters}
          activeFilters={activeFilters}
        />
      </LeftSection>

      <RightSection>
        <ToolsSectionWithSearchTerm
          tools={tools}
          onSearchChange={onSearchChange}
          onDownload={onDownload}
          onNewProposalClick={onNewProposalClick}
          filteredDataLength={filteredDataLength}
          searchTerm={searchTerm}
        />
      </RightSection>
    </ToolbarContainer>
  );
};

export default ToolbarWithSearchTerm;
