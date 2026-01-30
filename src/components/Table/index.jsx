import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import {
  TableContainer,
  TableContainerAlternative,
  Tabletitle,
  Tablesubtitle,
} from "styles/components/TableComponent";
import { InfoCircleOutlined } from "@ant-design/icons";


const TableComponent = ({
  title,
  subtitle,
  text,
  columns,
  data,
  isPagination = true,
  scroll = true,
  extraContentBefore,
  extraContentAfter,
  useAlternativeStyle = false,
  pagination,
  loading,
  onChange,
  showTooltip = false
}) => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (paginationConfig, filters, sorter) => {
    if (onChange) {
      onChange(paginationConfig, filters, sorter);
    } else {
      setTableParams({
        pagination: paginationConfig,
        filters,
        sorter,
      });
    }
  };

  const getPaginationConfig = () => {
    if (pagination) {
      return {
        ...pagination,
        size: "small",
      };
    }

    return {
      ...tableParams.pagination,
      size: "small",
    };
  };

  const Container = useAlternativeStyle
    ? TableContainerAlternative
    : TableContainer;

  return (
    <>
      <Container>
        <Tabletitle title={text} style={{ cursor: "pointer" }}>
          {title}
          {
            showTooltip ?
              <span>
                <Tooltip
                  title={text}
                  overlayInnerStyle={{
                    background: "#fff",
                    width: 350,
                    maxWidth: 400,
                   
                    whiteSpace: "normal",
                    color: '#006172',
                  }}
                  placement="top"
                >
                  <InfoCircleOutlined
                    style={{ marginLeft: 5, color: "#006172", fontSize: 13 }}
                  />
                </Tooltip>
              </span>
              : <></>
          }
        </Tabletitle>
        {subtitle && <Tablesubtitle>{subtitle}</Tablesubtitle>}
        {extraContentBefore && (
          <div className="extra-content-before">{extraContentBefore}</div>
        )}
        <Table
          columns={columns}
          dataSource={data}
          pagination={isPagination ? getPaginationConfig() : false}
          onChange={handleTableChange}
          loading={loading}
          scroll={scroll}
          rowKey="key"
        />
        {extraContentAfter && (
          <div className="extra-content-after">{extraContentAfter}</div>
        )}
      </Container>
    </>
  );
};

export default TableComponent;
