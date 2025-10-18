import { useCallback, useEffect, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Checkbox,
  Button,
  Flex,
  message,
} from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const initialTablerows = {
  total: 1,
  rows: [
    {
      id: 1,
      values: [{ field_id: 0, type: "int", value: 42 }],
    },
  ],
};

const initialTablecolumns = [
  {
    id: 0,
    name: "test_table",
    fields: [
      {
        id: 0,
        name: "age",
        verbose_name: "Возраст",
        data_type: "int", // int | float | string | bool | datetime
        is_nullable: true,
        default_value: "",
        choices: [],
      },
      {
        id: 1,
        name: "status",
        verbose_name: "Статус",
        data_type: "string",
        choices: ["Active", "Inactive"],
      },
      {
        id: 2,
        name: "is_admin",
        verbose_name: "Админ",
        data_type: "bool",
      },
      {
        id: 3,
        name: "birthday",
        verbose_name: "Дата рождения",
        data_type: "datetime",
      },
    ],
  },
];

export const TablePage = () => {
  const [rows, setRows] = useState(initialTablerows.rows);
  const fields = initialTablecolumns[0].fields;
  const [history, setHistory] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);

  const pushHistory = useCallback(
    (newRows: any) => {
      setHistory((prev) => [...prev, JSON.parse(JSON.stringify(rows))]);
      setRedoStack([]); // очистка redo при новом действии
      setRows(newRows);
    },
    [rows]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return message.info("Нечего отменять");
    const prev = history[history.length - 1];
    setRedoStack((r) => [JSON.parse(JSON.stringify(rows)), ...r]);
    setHistory((h) => h.slice(0, -1));
    setRows(prev);
  }, [history, rows]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return message.info("Нечего вернуть");
    const next = redoStack[0];
    setHistory((h) => [...h, JSON.parse(JSON.stringify(rows))]);
    setRedoStack((r) => r.slice(1));
    setRows(next);
  }, [redoStack, rows]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && e.code === "KeyZ") {
        e.preventDefault();
        undo();
      }
      if (isCtrl && e.code === "KeyY") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const handleValueChange = (rowId: number, fieldId: number, newValue: any) => {
    const newRows = rows.map((r) =>
      r.id === rowId
        ? {
            ...r,
            values: r.values.map((v) =>
              v.field_id === fieldId ? { ...v, value: newValue } : v
            ),
          }
        : r
    );
    pushHistory(newRows);
  };

  const handleAddRow = () => {
    const newRowId = Math.max(0, ...rows.map((r) => r.id)) + 1;
    const newRow = {
      id: newRowId,
      values: fields.map((f) => ({
        field_id: f.id,
        type: f.data_type,
        value:
          f.data_type === "bool"
            ? false
            : f.data_type === "datetime"
            ? null
            : f.default_value || "",
      })),
    };
    pushHistory([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    pushHistory(rows.filter((r) => r.id !== id));
  };

  const renderEditor = (field: any, row: any) => {
    const cell = row.values.find((v: any) => v.field_id === field.id);
    const value = cell?.value;

    switch (field.data_type) {
      case "int":
        return (
          <InputNumber
            value={value}
            onChange={(v) => handleValueChange(row.id, field.id, v)}
            style={{ width: "100%" }}
          />
        );
      case "string":
        if (field.choices?.length) {
          return (
            <Select
              value={value}
              onChange={(v) => handleValueChange(row.id, field.id, v)}
              options={field.choices.map((c: string) => ({
                label: c,
                value: c,
              }))}
              style={{ width: "100%" }}
            />
          );
        }
        return (
          <Input
            value={value}
            onChange={(e) =>
              handleValueChange(row.id, field.id, e.target.value)
            }
          />
        );
      case "bool":
        return (
          <Checkbox
            checked={!!value}
            onChange={(e) =>
              handleValueChange(row.id, field.id, e.target.checked)
            }
          />
        );
      case "datetime":
        return (
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(d) =>
              handleValueChange(row.id, field.id, d ? d.toISOString() : null)
            }
            style={{ width: "100%" }}
          />
        );
      default:
        return <Input disabled value={value} />;
    }
  };

  const columns = [
    ...fields.map((field) => ({
      title: field.verbose_name || field.name,
      dataIndex: field.name,
      key: field.id,
      render: (_: any, row: any) => renderEditor(field, row),
    })),
    {
      title: "Действия",
      key: "actions",
      align: "center",
      width: 100,
      render: (_: any, row: any) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(row.id)}
        />
      ),
    },
  ];

  //todo типизация
  const dataSource = rows.map((r) => {
    const obj: any = { key: r.id, id: r.id, values: r.values };
    fields.forEach((f) => {
      const v = r.values.find((v: any) => v.field_id === f.id);
      obj[f.name] = v ? v.value : null;
    });
    return obj;
  });

  return (
    <Flex vertical>
      <h1>Название таблицы!</h1>
      <Flex vertical gap={20}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
        />

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAddRow}
          block={false}
        >
          Добавить строку
        </Button>
      </Flex>
    </Flex>
  );
};
