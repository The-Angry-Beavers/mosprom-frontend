import type { CreateTableDto, FieldType } from "@/entity";
import {
  Form,
  Input,
  Flex,
  Button,
  Row,
  Col,
  Select,
  type FormInstance,
} from "antd";
import css from "./createColumnsFields.module.scss";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  DeleteOutlined,
  HolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import cn from "classnames";

type Props = {
  nextStep: () => void;
  form: FormInstance<CreateTableDto>;
};

interface SortableColumnProps {
  id: number;
  onClick?: () => void;
  onHandleDelete?: () => void;
  isError?: boolean;
  isActive?: boolean;
  children?: React.ReactNode;
}

const templates = [
  {
    id: 1,
    name: "Имя",
    verbose_name: "Новая колонка",
    data_type: "string",
    is_nullable: false,
    default_value: "",
    choices: [],
  },
  {
    field_id: 1.2646618597126693,
    name: "Год",
    verbose_name: "Новая колонка",
    data_type: "datetime",
    is_nullable: false,
    default_value: "",
    choices: [],
  },
  {
    field_id: 2.687277815444042,
    name: "Зарплата",
    verbose_name: "Новая колонка",
    data_type: "int",
    is_nullable: false,
    default_value: "",
    choices: [],
  },
  {
    field_id: 3.419554773409049,
    name: "Позиция",
    verbose_name: "Новая колонка",
    data_type: "choice",
    is_nullable: false,
    default_value: "",
    choices: [
      {
        id: 0.5590639466103339,
        value: "junior",
      },
      {
        id: 1.097752450730912,
        value: "middle",
      },
      {
        id: 2.4632975908507264,
        value: "senior",
      },
    ],
  },
];

const SortableColumn: React.FC<SortableColumnProps> = ({
  id,
  onClick,
  onHandleDelete,
  isActive,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    border: "1px solid #d9d9d9",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    userSelect: "none",
  };

  return (
    <div
      className={css.field}
      ref={setNodeRef}
      style={{ ...style, border: isActive ? "1px solid #002664" : "" }}
      {...attributes}
    >
      <Flex style={{ width: "100%" }} justify="space-between">
        <Flex gap={10} onClick={onClick}>
          <HolderOutlined
            style={{ cursor: "grab", color: "#999" }}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
          />
          {children}
        </Flex>
        <DeleteOutlined
          className={css.field_delete}
          color="red"
          onClick={onHandleDelete}
        />
      </Flex>
    </div>
  );
};

export const CreateColumnsFields = ({ nextStep, form }: Props) => {
  const [columns, setColumns] = useState<FieldType[]>(
    form.getFieldValue("fields") || []
  );
  const [selectField, setSelectField] = useState<FieldType | null>(
    columns[0] || null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    if (columns.length === 1) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
      setColumns((prev) => {
        const oldIndex = prev.findIndex((f) => f.field_id === active.id);
        const newIndex = prev.findIndex((f) => f.field_id === over.id);
        const newOrder = arrayMove(prev, oldIndex, newIndex);
        form.setFieldsValue({ fields: newOrder });
        return newOrder;
      });
    }
  };

  const handleChoiceDragEnd = (event: any) => {
    const field = columns.find((f) =>
      f.choices.find((c) => c.id === event.active.id)
    );

    if (!field) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = field.choices.findIndex((f) => f.id === active.id);
      const newIndex = field.choices.findIndex((f) => f.id === over.id);
      const newOrder = arrayMove(field.choices, oldIndex, newIndex);

      const updatedField = { ...field, choices: newOrder };
      const updatedColumns = columns.map((f) =>
        f.field_id === updatedField.field_id ? updatedField : f
      );

      setSelectField(updatedField);
      setColumns(updatedColumns);
      form.setFieldsValue({ fields: updatedColumns });
    }
  };

  const handleAddColumn = () => {
    const newField: FieldType = {
      field_id: columns.length + Math.random(),
      name: "Новая колонка",
      verbose_name: "Новая колонка",
      data_type: "string",
      is_nullable: false,
      default_value: "",
      choices: [],
    };
    const newList = [...columns, newField];
    setColumns(newList);
    form.setFieldsValue({ fields: newList });
    setSelectField(newField);
  };

  const handleDeleteColumn = (id: number) => {
    const newList = columns.filter((f) => f.field_id !== id);
    setColumns(newList);
    form.setFieldsValue({ fields: newList });
    setSelectField(null);
  };

  const handleFieldChange = <K extends keyof FieldType>(
    key: K,
    value: FieldType[K]
  ) => {
    if (!selectField) return;
    const updatedField = { ...selectField, [key]: value };
    setSelectField(updatedField);

    const updatedColumns = columns.map((col) =>
      col.field_id === updatedField.field_id ? updatedField : col
    );
    setColumns(updatedColumns);
    form.setFieldsValue({ fields: updatedColumns });
  };

  const handleDeleteChoice = (col: number) => {
    if (!selectField) return;
    const newChoices = [...selectField.choices].filter((c) => c.id !== col);
    handleFieldChange("choices", newChoices as FieldType["choices"]);
  };

  const handleAddChoice = () => {
    if (!selectField) return;

    const newChoices = [
      ...selectField.choices,
      { id: selectField.choices.length + Math.random(), value: "" },
    ];
    handleFieldChange("choices", newChoices as FieldType["choices"]);
  };

  const handleChoiceChange = (id: number, value: string) => {
    if (!selectField) return;

    const newChoices = selectField.choices.map((c) =>
      c.id === id ? { ...c, value } : c
    );

    handleFieldChange("choices", newChoices as FieldType["choices"]);
  };

  return (
    <div className={css.createColumnsFields}>
      <Row gutter={60}>
        <Col span={12}>
          <p className={css.title}>
            <span>
              {form.getFieldValue("verbose_name")}
              <br />
            </span>
            <p style={{ fontSize: "1rem", fontWeight: 300 }}>
              {form.getFieldValue("description")}
            </p>
          </p>
        </Col>

        <Col span={12}>
          <Form.Item<CreateTableDto>>
            <Select placeholder="Выберите шаблон">
              <Select.Option
                value={0}
                label="Создать новый шаблон"
                onChange={(e) =>
                  form.setFieldValue(
                    "fields",
                    e.target.value ? templates[e.target.value - 1] : []
                  )
                }
              >
                + Создать новый шаблон
              </Select.Option>
              <Select.Option value={1}>Сохранённый шаблон 1</Select.Option>
              <Select.Option value={2}>Сохранённый шаблон 2</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <hr className={css.separator} />
      <Row gutter={60}>
        <Col span={12}>
          <Form.List name="fields">
            {() => (
              <div className="">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={columns.map((col) => col.field_id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {columns.map((col) => {
                      return (
                        <SortableColumn
                          isActive={selectField?.field_id === col.field_id}
                          onClick={() => setSelectField(col)}
                          onHandleDelete={() =>
                            handleDeleteColumn(col.field_id)
                          }
                          key={col.field_id}
                          id={col.field_id}
                          children={
                            <div
                              className={cn(css.field_name)}
                              style={{ flex: 1 }}
                            >
                              {col.name}
                            </div>
                          }
                        />
                      );
                    })}
                  </SortableContext>
                </DndContext>
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddColumn}
                  style={{ marginTop: 8 }}
                  className={css.add_button}
                >
                  Добавить столбец
                </Button>
              </div>
            )}
          </Form.List>
        </Col>
        <Col span={12}>
          {selectField && (
            <div className={css.fieldEditor}>
              <Form.Item
                label="Название столбца"
                name={[
                  "fields",
                  `${columns.findIndex(
                    (c) => c.field_id === selectField.field_id
                  )}`,
                  "name",
                ]}
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите название столбца",
                  },
                ]}
              >
                <Input
                  value={selectField.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Тип данных">
                <Select
                  value={selectField.data_type}
                  onChange={(v) => handleFieldChange("data_type", v)}
                >
                  <Select.Option value="string">Строка</Select.Option>
                  <Select.Option value="int">Число</Select.Option>
                  <Select.Option value="bool">Логическое</Select.Option>
                  <Select.Option value="choice">Выбор</Select.Option>
                  <Select.Option value="datetime">Дата</Select.Option>
                </Select>
              </Form.Item>

              {selectField?.data_type === "choice" && (
                <Form.List
                  name={[
                    "fields",
                    `${columns.findIndex(
                      (c) => c.field_id === selectField.field_id
                    )}`,
                    "choices",
                  ]}
                >
                  {() => (
                    <div className={css.choices}>
                      <p style={{ marginBottom: "8px" }}>Варианты</p>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleChoiceDragEnd}
                      >
                        <SortableContext
                          items={selectField.choices.map((col) => col.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <Flex gap={10} vertical>
                            {selectField.choices.map((choice, index) => {
                              return (
                                <SortableColumn
                                  id={choice.id}
                                  key={choice.id}
                                  onHandleDelete={() =>
                                    handleDeleteChoice(choice.id)
                                  }
                                >
                                  <Input
                                    value={choice.value}
                                    onChange={(e) =>
                                      handleChoiceChange(
                                        choice.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </SortableColumn>
                              );
                            })}
                          </Flex>
                        </SortableContext>
                      </DndContext>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddChoice}
                        style={{ marginTop: 8 }}
                        className={css.add_button}
                      >
                        Добавить вариант
                      </Button>
                    </div>
                  )}
                </Form.List>
              )}
            </div>
          )}
        </Col>
      </Row>
      <Flex gap={20} justify="flex-end">
        <Form.Item>
          <Button onClick={nextStep} block size="large">
            Назад
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            size="large"
            htmlType="submit"
            disabled={
              form.getFieldsValue().fields?.filter((col) => !col?.name).length >
              0
            }
          >
            Создать
          </Button>
        </Form.Item>
      </Flex>
    </div>
  );
};
