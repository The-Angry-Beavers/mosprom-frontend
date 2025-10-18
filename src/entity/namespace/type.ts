import type { TableType } from "../table";

export type NamespaceType = {
  id: number;
  name: string;
  description: string;
  tables: TableType[];
};
