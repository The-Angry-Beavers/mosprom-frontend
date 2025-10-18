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
  data_type: ChoiceType;
  is_nullable: boolean;
  default_value: string;
  choices: {
    id: number;
    value: ChoiceType;
  }[];
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

export type CreateTableDto = {
  name: string;
  fields: FieldType[];
  verbose_name: string;
  description: string;
};

export type ChoiceType = 'int' | 'string' | 'datetime' | 'bool' | 'choice';