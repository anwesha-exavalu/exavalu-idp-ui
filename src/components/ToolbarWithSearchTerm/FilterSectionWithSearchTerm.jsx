import React from "react";
import {
  ActionButton,
  SelectWrapper,
} from "../../styles/components/Toolbar/toolbarStyles";
import { Select, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function FilterSectionWithSearchTerm({
  filters,
  resetFilters,
  activeFilters,
}) {
  const formatLabel = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <Tooltip title="Reset Filters">
        <ActionButton
          onClick={resetFilters}
          className="reset-btn"
          icon={<ReloadOutlined />}
        ></ActionButton>
      </Tooltip>
      {filters.map((filter) => (
        <SelectWrapper key={filter.key || filter.label}>
          <Select
            style={{ width: "137px" }}
            placeholder={formatLabel(filter.label)}
            onChange={filter.onChange}
            value={activeFilters?.[filter.label]}
          >
            {filter.options.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </SelectWrapper>
      ))}
    </>
  );
}
