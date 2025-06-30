import type { ColumnsType } from "antd/es/table";
import type { IProduct } from "@/types/Product";
import { formatDate } from "@/utils/date";

export const PRODUCT_COLUMNS: ColumnsType<IProduct> = [
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Barcode",
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Last Update",
    dataIndex: "lastUpdateTime",
    key: "lastUpdateTime",
    render: (val: string) => formatDate(val, { format: 'datetime' }),
  },
];
