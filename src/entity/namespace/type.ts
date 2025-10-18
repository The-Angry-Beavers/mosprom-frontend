import type { TableType } from '../table';

export type NamespaceType = {
  id: number;
  name: string;
  description: string;
  tables: TableType[];
};

export type CreateTableDto = {
  name: string;
  description: string;
};
