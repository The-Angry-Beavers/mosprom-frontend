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
  field_id: number;
  name: string;
  verbose_name: string;
  data_type: ChoiceType;
  is_nullable: boolean;
  default_value: string;
  choices: {
    id: number;
    value: ChoiceType;
  }[];
};

export type GetRowType = {
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

export interface AddRowData {
  table_id: number;
  rows: Row[];
}

export interface DeleteRowData {
  table_id: number;
  row_ids: number[];
}

export interface UpdateRowData {
  table_id: number;
  updated_rows: {
	row_id: number;
	new_values: {
	  field_id: number;
	  value: Value;
	}[];
  }[];
}

export interface RowType {
  total: number;
  rows: Row[];
}

export interface Row {
  row_id: number;
  values: Value2[];
}

interface Value2 {
  field_id: number;
  data_type: string;
  value: Value;
}

interface Value {
  value: string | number;
}

export type UpdateTableDto = {
  name: string;
  verbose_name: string;
  description: string;
  namespace_id: number;
};

export type CreateTableDto = {
  name: string;
  fields: FieldType[];
  verbose_name: string;
  description: string;
};

export type ChoiceType = 'int' | 'string' | 'datetime' | 'bool' | 'choice';