import type { CreateTableType, FieldType } from '@/entity';
import {
  Form,
  Input,
  Flex,
  Button,
  Row,
  Col,
  Select,
  type FormInstance,
} from 'antd';
import css from './createColumnsFields.module.scss';
import { CSS } from '@dnd-kit/utilities';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  DeleteOutlined,
  HolderOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import cn from 'classnames';

type Props = {
  nextStep: () => void;
  form: FormInstance<CreateTableType>;
};

interface SortableColumnProps {
  item: FieldType;
  onClick?: () => void;
  onHandleDelete?: () => void;
  isError?: boolean;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  item,
  onClick,
  onHandleDelete,
  isError,
}) => {
  const { id, verbose_name } = item;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: 8,
    background: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
  };

  return (
    <div className={css.field} ref={setNodeRef} style={style} {...attributes}>
      <Flex style={{ width: '100%' }} justify="space-between">
        <Flex gap={10} onClick={onClick}>
          <HolderOutlined
            style={{ cursor: 'grab', color: '#999' }}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            className={cn(css.field_name, { [css.field_error]: isError })}
            style={{ flex: 1 }}
          >
            {verbose_name}
          </div>
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
    form.getFieldValue('fields') || []
  );
  const [selectField, setSelectField] = useState<FieldType | null>(null);

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
        const oldIndex = prev.findIndex((f) => f.id === active.id);
        const newIndex = prev.findIndex((f) => f.id === over.id);
        const newOrder = arrayMove(prev, oldIndex, newIndex);
        form.setFieldsValue({ fields: newOrder });
        return newOrder;
      });
    }
  };

  const handleAddColumn = () => {
    const newField: FieldType = {
      id: columns.length,
      name: 'Новая колонка',
      verbose_name: 'Новая колонка',
      data_type: 'string',
      is_nullable: false,
      default_value: '',
      choices: [],
    };
    const newList = [...columns, newField];
    setColumns(newList);
    form.setFieldsValue({ fields: newList });
    setSelectField(newField);
  };

  const handleDeleteColumn = (id: number) => {
    const newList = columns.filter((f) => f.id !== id);
    setColumns(newList);
    form.setFieldsValue({ fields: newList });
    setSelectField(null);
    console.log(form.getFieldsValue());
  };

  const handleFieldChange = <K extends keyof FieldType>(
    key: K,
    value: FieldType[K]
  ) => {
    if (!selectField) return;
    const updatedField = { ...selectField, [key]: value };
    setSelectField(updatedField);

    const updatedColumns = columns.map((col) =>
      col.id === updatedField.id ? updatedField : col
    );
    setColumns(updatedColumns);
    form.setFieldsValue({ fields: updatedColumns });
  };

  const handleAddChoice = () => {
    if (!selectField) return;

    const newChoices = [...selectField.choices, ''];
    handleFieldChange('choices', newChoices as FieldType['choices']);
  };

  const handleChoiceChange = (index: number, value: string) => {
    if (!selectField) return;

    const newChoices = [...selectField.choices];
    newChoices[index] = value;

    handleFieldChange('choices', newChoices as FieldType['choices']);
  };

  return (
    <div className={css.createColumnsFields}>
      <Row gutter={60}>
        <Col span={12}>
          <p className={css.title}>
            <span>namespace</span>/<span>tablename</span>
          </p>
        </Col>

        <Col span={12}>
          <Form.Item<CreateTableType> name="namespace">
            <Select
              placeholder="Выберите Выберите шаблон"
              style={{ width: 300, marginBottom: 0 }}
            >
              <Select.Option value="Шаблон 1">Шаблон 1</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
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
                    items={columns.map((col) => col.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {columns.map((col, index) => {
                      return (
                        <SortableColumn
                          onClick={() => setSelectField(col)}
                          onHandleDelete={() => handleDeleteColumn(col.id)}
                          key={col.id}
                          item={col}
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
                  Добавить поле
                </Button>
              </div>
            )}
          </Form.List>
        </Col>
        <Col span={12}>
          {selectField && (
            <div className={css.fieldEditor}>
              <Form.Item
                label="Имя поля"
                name={[
                  'fields',
                  `${columns.findIndex((c) => c.id === selectField.id)}`,
                  'name',
                ]}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста введите имя поля',
                  },
                ]}
              >
                <Input
                  value={selectField.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Отображаемое имя">
                <Input
                  value={selectField.verbose_name}
                  onChange={(e) =>
                    handleFieldChange('verbose_name', e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Тип данных">
                <Select
                  value={selectField.data_type}
                  onChange={(v) => handleFieldChange('data_type', v)}
                >
                  <Select.Option value="string">string</Select.Option>
                  <Select.Option value="number">number</Select.Option>
                  <Select.Option value="boolean">boolean</Select.Option>
                  <Select.Option value="select">select</Select.Option>
                </Select>
              </Form.Item>

              {selectField?.data_type === 'select' && (
                <Form.List
                  name={[
                    'fields',
                    `${columns.findIndex((c) => c.id === selectField.id)}`,
                    'choices',
                  ]}
                >
                  {() => (
                    <div className={css.choices}>
                      <p>Выборы</p>
                      <Flex gap={10} vertical>
                        {selectField.choices.map((choice, index) => {
                          return (
                            <Input
                              key={index}
                              value={choice}
                              onChange={(e) =>
                                handleChoiceChange(index, e.target.value)
                              }
                            />
                          );
                        })}
                      </Flex>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddChoice}
                        style={{ marginTop: 8 }}
                        className={css.add_button}
                      >
                        Добавить выбор
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
          <Button block type="primary" size="large" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Flex>
    </div>
  );
};
