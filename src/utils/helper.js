import * as XLSX from "xlsx";
export function toTitleCase(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatRole = (role) => {
  if (!role) return "";
  if (role.toLowerCase() === "projectmanager") return "Project Manager";
  if (role.toLowerCase() === "productmanager") return "Product Manager";
  if (role.toLowerCase() === "clientmanager") return "Client Manager";
  if (role.toLowerCase() === "admin") return "Admin";
  return role
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getFilter = (data, label, onChangeHandler) => {
  const options = Array.from(new Set(data.map((item) => item[label])))
    .filter((val) => val !== undefined && val !== null)
    .map((val) => ({
      label: val,
      value: val,
    }));

  return {
    label,
    options,
    onChange: (selectedValues) => onChangeHandler(label, selectedValues),
  };
};

export const getWidgetChartData = (rows, scope, index, widget) => {
  const matchingRow = rows?.find(
    (row) => row[`${scope}_key`] === widget?.widgetKeysInJSON[index]
  );
  return matchingRow?.[`${scope}_data`] || [];
};

export const getWidgetTableData = (rows, scope, index, widget) => {
  const matchingRow = rows.find(
    (row) => row[`${scope}_key`] === widget?.widgetKeysInJSON[index]
  );

  const hasAnyData =
    Array.isArray(matchingRow?.[`${scope}_data`]) &&
    matchingRow[`${scope}_data`].length > 0;

  if (hasAnyData) {
    const rawData = matchingRow?.[`${scope}_data`];

    if (!rawData || !Array.isArray(rawData)) return { data: [], columns: [] };

    const columns = Object.keys(rawData[0]).map((key) => ({
      title: key,
      dataIndex: key,
      key: key.toLowerCase().replace(/\s+/g, "_"),
      render: (value) =>
        typeof value === "number" ? value.toLocaleString() : value,
    }));

    const data = rawData.map((item, index) => ({ ...item, key: index }));

    return { data, columns };
  } else {
    return { data: [], columns: [] };
  }
};

export const getTotalData = (rows, scope, index, widget) => {
  const matchingRow = rows.find(
    (row) => row[`${scope}_key`] === widget?.widgetKeysInJSON[index]
  );
  const hasAnyData =
    Array.isArray(matchingRow?.[`${scope}_data`]) &&
    matchingRow[`${scope}_data`].length > 0;
  if (hasAnyData) {
    return matchingRow?.[`${scope}_data`] || [];
  } else {
    return [];
  }
};

export const getWidgetCardData = (rows, scope, index, widget) => {
  const matchingRow = rows.find(
    (row) => row[`${scope}_key`] === widget?.widgetKeysInJSON[index]
  );
  const rawData = matchingRow?.[`${scope}_data`];

  if (!rawData || !Array.isArray(rawData)) return [];
  return rawData;
};
export const handleDownloadTableData = (
  data,
  columns,
  filename = "table-data.xlsx"
) => {
  const exportData = data.map((row) => {
    const rowData = {};
    columns.forEach((col) => {
      if (col.dataIndex && col.title) {
        rowData[col.title] = row[col.dataIndex];
      }
    });
    return rowData;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};

export function filterDatasetById(dataset, scope, id, idKeys) {
  if (!Array.isArray(dataset)) return [];

  if (!id || !idKeys) return dataset;

  const keysArray = Array.isArray(idKeys) ? idKeys : [idKeys];

  const filtered = dataset.map((section) => {
    const scopeKey = section?.[`${scope}_key`] ?? null;
    const scopeData = Array.isArray(section?.[`${scope}_data`])
      ? section[`${scope}_data`]
      : [];

    const newData = scopeData.filter((item) => {
      if (!item || typeof item !== "object") return false; // safeguard
      return keysArray.some((key) => {
        if (!key) return false;
        const matchingKey = Object.keys(item || {}).find(
          (k) => k?.trim().toLowerCase() === key?.trim().toLowerCase()
        );
        return matchingKey && item[matchingKey] === id;
      });
    });

    return {
      [`${scope}_key`]: scopeKey,
      [`${scope}_data`]: newData,
    };
  });

  const hasAnyData = filtered.some(
    (section) =>
      Array.isArray(section?.[`${scope}_data`]) &&
      section[`${scope}_data`].length > 0
  );

  if (!hasAnyData) {
    return [
      {
        [`${scope}_key`]: "No Data",
        [`${scope}_data`]: [],
      },
    ];
  }

  return filtered;
}

export const scrollToComponent = (ref) => {
  ref.current?.scrollIntoView({ behaviour: "smooth" });
};
export function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  // Create date in local timezone instead of UTC
  return new Date(
    date_info.getUTCFullYear(),
    date_info.getUTCMonth(),
    date_info.getUTCDate()
  );
}
export const dataFilteredByProduct = (selectedProduct, data) => {
  let filteredData = data;
  if (
    selectedProduct &&
    selectedProduct !== "All Products" &&
    data[0]?.["Product Offer Name"]
  ) {
    filteredData = data.filter(
      (item) => item["Product Offer Name"] === selectedProduct
    );
  }
  return filteredData;
};

export const filterAndAggregateData = (
  data,
  selectedProduct,
  groupBy = [],
  numericFields = []
) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  if (
    selectedProduct &&
    selectedProduct !== "All Products" &&
    data[0]?.["Product Offer Name"]
  ) {
    return data.filter(
      (item) => item["Product Offer Name"] === selectedProduct
    );
  }

  if (
    !Array.isArray(groupBy) ||
    groupBy.length === 0 ||
    numericFields.length === 0
  ) {
    return data;
  }

  const aggregated = data.reduce((acc, item) => {
    const key = groupBy.map((field) => item[field]).join("|");

    if (!acc[key]) {
      acc[key] = {};
      groupBy.forEach((field) => {
        acc[key][field] = item[field];
      });

      numericFields.forEach((field) => {
        acc[key][field] = 0;
      });
    }
    numericFields.forEach((field) => {
      let val = item[field];

      if (typeof val === "string") {
        val = val.replace(/[$,]/g, "");
        val = isNaN(val) || val === "-" ? 0 : Number(val);
      }

      acc[key][field] += Number(val) || 0;
    });

    return acc;
  }, {});

  return Object.values(aggregated);
};
export const filterAndAverageData = (
  data,
  selectedProduct,
  groupBy = [],
  numericFields = [],
  averageFields = []
) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  if (
    selectedProduct &&
    selectedProduct !== "All Products" &&
    data[0]?.["Product Offer Name"]
  ) {
    return data.filter(
      (item) => item["Product Offer Name"] === selectedProduct
    );
  }

  if (
    !Array.isArray(groupBy) ||
    groupBy.length === 0 ||
    (numericFields.length === 0 && averageFields.length === 0)
  ) {
    return data;
  }

  const aggregated = data.reduce((acc, item) => {
    const key = groupBy.map((field) => item[field]).join("|");

    if (!acc[key]) {
      acc[key] = {};
      groupBy.forEach((field) => {
        acc[key][field] = item[field];
      });
      [...numericFields, ...averageFields].forEach((field) => {
        acc[key][field] = 0;
      });
      acc[key]._count = 0;
    }

    [...numericFields, ...averageFields].forEach((field) => {
      let val = item[field];

      if (typeof val === "string") {
        val = val.replace(/[$,]/g, "");
        val = isNaN(val) || val === "-" ? 0 : Number(val);
      }

      acc[key][field] += Number(val) || 0;
    });

    acc[key]._count += 1;

    return acc;
  }, {});

  return Object.values(aggregated).map((item) => {
    if (item._count > 0) {
      averageFields.forEach((field) => {
        item[field] = item[field] / item._count;
      });
    }
    delete item._count;
    return item;
  });
};
export const formatCurrencyValue = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";

  if (num >= 1e9) {
    return { value: `$${(num / 1e9).toFixed(1)}B`, unit: "Billion" };
  } else if (num >= 1e6) {
    return { value: `$${(num / 1e6).toFixed(1)}M`, unit: "Million" };
  } else if (num >= 1e3) {
    return { value: `$${(num / 1e3).toFixed(1)}K`, unit: "Thousands" };
  }
  return { value: `$${num.toLocaleString()}`, unit: "" };
};

export const convertTextCamelToReadable = (text) => {
  if (!text) return "";
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/^./, (str) => str.toUpperCase());
};
export const convertTextCamelToNormalCase = (str) => {
  const formatted = str.replace(/([A-Z])/g, " $1").trim();

  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
