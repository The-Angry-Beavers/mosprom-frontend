export type TableType = {
  id: number;
  name: string;
  verbose_name: string;
  description: string;
  namespace_id: number;
  last_modified_at: string;
  fields: FieldType[];
};

export type FieldType = {
  id: number;
  name: string;
  verbose_name: string;
  data_type: string;
  is_nullable: boolean;
  default_value: string;
  choices: string[];
};

export type RowType = {
  limit: number;
  offset: number;
  filter_params: {
    field_id: number;
    value: string;
  }[];
  ordering_params: {
    field_id: number;
    ascending: boolean;
  }[];
};

export type UpdateTableDto = {
  name: string;
  verbose_name: string;
  description: string;
  namespace_id: number;
};

export type CreateTableType = {
  namespace: string;
  name: string;
  file?: File;
};
