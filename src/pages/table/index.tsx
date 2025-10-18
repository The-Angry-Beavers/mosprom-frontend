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
  Upload,
  Modal,
  Space,
} from "antd";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

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
        data_type: "int",
        is_nullable: true,
        default_value: "",
        choices: [],
      },
	   {
        id: 2,
        name: "age2",
        verbose_name: "Возраст222",
        data_type: "string",
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
  const [messageApi, contextHolder] = message.useMessage();


  const [uploadedHeaders, setUploadedHeaders] = useState<string[]>([]);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);


  const pushHistory = useCallback(
    (newRows: any) => {
      setHistory((prev) => [...prev, JSON.parse(JSON.stringify(rows))]);
      setRedoStack([]);
      setRows(newRows);
    },
    [rows]
  );

  const undo = useCallback(() => {
    if (history.length === 0)
      return messageApi.open({ type: "info", content: "Нечего отменять" });
    const prev = history[history.length - 1];
    setRedoStack((r) => [JSON.parse(JSON.stringify(rows)), ...r]);
    setHistory((h) => h.slice(0, -1));
    setRows(prev);
  }, [history, rows]);

  const redo = useCallback(() => {
    if (redoStack.length === 0)
      return messageApi.open({ type: "info", content: "Нечего вернуть" });
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

  const handleImportConfirm = () => {
    const mapped = uploadedData.map((rowArr: any[], index: number) => ({
      id: rows.length + index + 1,
      values: fields.map((f) => {
        const excelHeader = Object.keys(mapping).find(
          (key) => mapping[key] === f.name
        );
        const colIndex = uploadedHeaders.indexOf(excelHeader || "");
        const rawValue =
          colIndex !== -1 ? rowArr[colIndex] ?? "" : f.default_value ?? "";

        let parsedValue = rawValue;
        if (f.data_type === "int" || f.data_type === "float")
          parsedValue = Number(rawValue) || 0;
        if (f.data_type === "bool")
          parsedValue =
            rawValue === true ||
            rawValue === "true" ||
            rawValue === "1" ||
            rawValue === "да";
        if (f.data_type === "datetime" && rawValue)
          parsedValue = dayjs(rawValue).toISOString();

        return { field_id: f.id, type: f.data_type, value: parsedValue };
      }),
    }));

    pushHistory([...rows, ...mapped]);
    setIsMappingModalOpen(false);
    messageApi.open({
      type: "success",
      content: "Данные успешно импортированы",
    });
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

  const dataSource = rows.map((r) => {
    const obj: any = { key: r.id, id: r.id, values: r.values };
    fields.forEach((f) => {
      const v = r.values.find((v: any) => v.field_id === f.id);
      obj[f.name] = v ? v.value : null;
    });
    return obj;
  });

  return (
    <Flex vertical gap={20}>
      {contextHolder}
      <h1>Название таблицы!</h1>

      <Flex gap={8}>
        <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddRow}>
          Добавить строку
        </Button>

        <Upload
          accept=".xlsx,.xls"
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            const f = file as File;
            const reader = new FileReader();

            reader.onload = (e) => {
              try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });

                let foundHeaders = false;
                const allSheets = workbook.SheetNames.map((sheetName) => {
                  const sheet = workbook.Sheets[sheetName];
                  const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                  return { sheetName, rows: json };
                });

                const expectedHeaders = fields.map((f) => f.verbose_name);

                for (const { rows } of allSheets) {
                  for (let i = 0; i < rows.length; i++) {
                    const row = rows[i].map((x: any) => String(x || "").trim());
                    if (row.length === 0) continue;

                    const matches = row.filter((cell) =>
                      expectedHeaders.some(
                        (expected) =>
                          cell.toLowerCase() === expected.toLowerCase()
                      )
                    );

                    if (matches.length >= 2) {
                      foundHeaders = true;
                      messageApi.open({
                        type: "success",
                        content: `Заголовки найдены на строке ${i + 1}`,
                      });
                      setUploadedHeaders(row);
                      setUploadedData(rows.slice(i + 1));
                      setIsMappingModalOpen(true);
                      break;
                    }
                  }
                  if (foundHeaders) break;
                }

                if (!foundHeaders) {
                  messageApi.open({
                    type: "error",
                    content: "Не удалось найти строки с заголовками в Excel",
                  });
                }

                onSuccess && onSuccess(null as any);
              } catch (err) {
                console.error(err);
                messageApi.open({
                  type: "error",
                  content: "Ошибка при чтении Excel файла",
                });
              }
            };

            reader.readAsArrayBuffer(f);
          }}
        >
          <Button icon={<UploadOutlined />}>Загрузить Excel</Button>
        </Upload>
      </Flex>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />

      <Modal
        open={isMappingModalOpen}
        title="Сопоставление колонок"
        onOk={handleImportConfirm}
        onCancel={() => setIsMappingModalOpen(false)}
        okText="Импортировать"
        cancelText="Отмена"
        width={600}
      >
        <p>
          Найдены колонки Excel. Выберите, какие поля из шаблона им
          соответствуют:
        </p>
        <Flex vertical gap={8}>
          {uploadedHeaders.map((h) => (
            <Space key={h} align="center">
              <b style={{ width: 160 }}>{h}</b>
              <span>→</span>
              <Select
                placeholder="Выберите поле"
                allowClear
                value={mapping[h]}
                onChange={(v) =>
                  setMapping((prev) => ({ ...prev, [h]: v || "" }))
                }
                options={fields.map((f) => ({
                  label: f.verbose_name,
                  value: f.name,
                }))}
                style={{ width: 250 }}
              />
            </Space>
          ))}
        </Flex>
      </Modal>
    </Flex>
  );
};
