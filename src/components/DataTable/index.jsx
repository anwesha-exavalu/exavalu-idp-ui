import { Table } from "antd";
import { TableContainer } from "../../styles/components/DataTable";
import Toolbar from "../Toolbar";
import DataTableHeader from "./DataTableHeader";
import { useMemo } from "react";

const DataTable = ({
  columns,
  data,
  filters,
  tools,
  title,
  subtitle,
  onSearchChange,
  onDownload,
  resetFilters,
  activeFilters,
  enableCascadingFilters = false,
  rawData = null,
  filterFields = [],
  getFilterFunction = null,
  onNewProposalClick,
  filteredDataLength = 0,
}) => {
  const cascadingFilters = useMemo(() => {
    if (
      !enableCascadingFilters ||
      !rawData ||
      !filterFields ||
      !getFilterFunction ||
      !activeFilters
    ) {
      return filters;
    }

    return filterFields.map((field) => {
      const otherFilters = Object.fromEntries(
        Object.entries(activeFilters).filter(([key]) => key !== field)
      );

      const dataForThisFilter = rawData.filter((row) =>
        Object.entries(otherFilters).every(([key, values]) =>
          values.length === 0 ? true : values.includes(row[key])
        )
      );

      return getFilterFunction(dataForThisFilter, field);
    });
  }, [
    rawData,
    activeFilters,
    filterFields,
    getFilterFunction,
    enableCascadingFilters,
    filters,
  ]);

  const finalFilters = enableCascadingFilters ? cascadingFilters : filters;

  return (
    <TableContainer>
      <DataTableHeader
        title={title ?? ""}
        subtitle={subtitle ?? ""}
        filters={finalFilters ?? []}
        tools={tools ?? []}
        onDownload={onDownload ?? ""}
        onSearchChange={onSearchChange ?? ""}
        onNewProposalClick={onNewProposalClick ?? ""}
        filteredDataLength={filteredDataLength}
      />
      <div className="ant-table-wrapper">
        {finalFilters?.length > 0 && (
          <Toolbar
            filters={finalFilters ?? []}
            tools={tools ?? []}
            onSearchChange={onSearchChange ?? ""}
            onDownload={onDownload ?? ""}
            resetFilters={resetFilters ?? ""}
            activeFilters={activeFilters ?? ""}
            onNewProposalClick={onNewProposalClick ?? ""}
            filteredDataLength={filteredDataLength}
          />
        )}

        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
          size="middle"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      </div>
    </TableContainer>
  );
};

export default DataTable;
