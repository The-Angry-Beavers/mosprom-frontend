import { useEffect, useState } from "react";
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
import type { FieldType, Row } from "@/entity";
import {
  useAddTableRow,
  useDeleteTableRow,
  useUpdateTableRow,
} from "@/entity/table/api";
import { useParams } from "react-router-dom";

type Props = {
  rowsData: Row[];
  columnsData: FieldType[];
  name: string;
  canEdit: boolean;
};

export const TablePage = ({ columnsData, rowsData, name }: Props) => {
  const [rows, setRows] = useState(rowsData || []);
  const fields = columnsData;
  const { tableId } = useParams();
  const { mutate: addRow, isPending: isAdding } = useAddTableRow(
    Number(tableId) || 0
  );
  const { mutate: deleteRow, isPending: isDeleting } = useDeleteTableRow(
    Number(tableId) || 0
  );
  const { mutate: updateRow, isPending: isUpdating } = useUpdateTableRow(
    Number(tableId) || 0
  );
  const [messageApi, contextHolder] = message.useMessage();

  const [uploadedHeaders, setUploadedHeaders] = useState<string[]>([]);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);

  const handleExcelFile = (file: any, onSuccess?: () => void) => {
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
          for (let i = 0; i < rows?.length; i++) {
            const row = rows[i].map((x) => String(x || "").trim());
            if (row.length === 0) continue;

            const matches = row.filter((cell) =>
              expectedHeaders.some(
                (expected) => cell.toLowerCase() === expected.toLowerCase()
              )
            );

            if (matches.length >= 2) {
              foundHeaders = true;
              messageApi.open({
                type: "success",
                content: `Заголовки найдены на строке ${i + 1}`,
              });
              setUploadedHeaders(row);
              setUploadedData(rows?.slice(i + 1));
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

        onSuccess?.();
      } catch (err) {
        console.error(err);
        messageApi.open({
          type: "error",
          content: "Ошибка при чтении Excel файла",
        });
      }
    };

    reader.readAsArrayBuffer(f);
  };

//  useEffect(() => {
//    const handleDragOver = (e: DragEvent) => {
//      e.preventDefault();
//      if (
//        e.dataTransfer?.items &&
//        Array.from(e.dataTransfer.items).some(
//          (item) =>
//            item.kind === "file" &&
//            item.type.match(
//              /sheet|excel|officedocument\.spreadsheetml|spreadsheetml\.sheet/
//            )
//        )
//      ) {
//        setIsDragOver(true);
//      }
//    };

//    const handleDragLeave = () => setIsDragOver(false);

//    const handleDrop = (e: DragEvent) => {
//      e.preventDefault();
//      setIsDragOver(false);

//      const file = e.dataTransfer?.files?.[0];
//      if (file && /\.(xlsx|xls)$/i.test(file.name)) {
//        handleExcelFile(file);
//      } else {
//        messageApi.warning(
//          "Пожалуйста, перетащите Excel файл (.xlsx или .xls)"
//        );
//      }
//    };

//    window.addEventListener("dragover", handleDragOver);
//    window.addEventListener("dragleave", handleDragLeave);
//    window.addEventListener("drop", handleDrop);

//    return () => {
//      window.removeEventListener("dragover", handleDragOver);
//      window.removeEventListener("dragleave", handleDragLeave);
//      window.removeEventListener("drop", handleDrop);
//    };
//  }, []);

  useEffect(() => {
    if (rowsData && rowsData.length) {
      setRows(rowsData);
    } else setRows([]);
  }, [rowsData]);

  const handleValueChangeLocal = (
    rowId: number,
    fieldId: number,
    newValue: any
  ) => {
    setRows((prevRows) =>
      prevRows.map((r) =>
        r.row_id === rowId
          ? {
              ...r,
              values: r.values.map((v) =>
                v.field_id === fieldId
                  ? { ...v, value: { value: newValue } }
                  : v
              ),
            }
          : r
      )
    );
  };

  const handleValueChangeServer = async (rowId: number) => {
    const row = rows.find((r) => r.row_id === rowId);
    if (!row) return;

    await updateRow({
      table_id: Number(tableId) || 0,
      updated_rows: [
        {
          row_id: row.row_id,
          new_values: row.values.map((v) => ({
            field_id: v.field_id,
            value: { value: String(v.value.value) },
          })),
        },
      ],
    });
  };

  const handleAddRow = async () => {
    const newRow = {
      values: fields.map((f) => ({
        field_id: f.field_id,
        data_type: f.data_type,
        value: { value: "" },
      })),
    };
    await addRow({ table_id: Number(tableId) || 0, rows: [newRow] });
  };

  const handleDeleteRow = async (id: number) => {
    await deleteRow({ table_id: Number(tableId) || 0, row_ids: [id] });
  };

  const handleImportConfirm = () => {
    const mapped = uploadedData
      .map((rowArr: any[], index: number) => ({
        row_id: rows?.length + index + 1,
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

          return {
            field_id: f.field_id,
            data_type: f.data_type,
            value: { value: String(parsedValue) },
          };
        }),
      }))
      .filter((item) => item.values.every((v) => !!v.value.value));
    addRow({ table_id: Number(tableId) || 0, rows: mapped });
    setIsMappingModalOpen(false);
    messageApi.open({
      type: "success",
      content: "Данные успешно импортированы",
    });
  };

  const renderEditor = (field: FieldType, row: Row) => {
    const cell = row.values.find((v) => v.field_id === field.field_id);
    const value = cell?.value?.value;
    switch (field.data_type) {
      case "int":
        return (
          <InputNumber
            value={value}
            onBlur={(v) => handleValueChangeServer(row.row_id)}
            onChange={(v) =>
              handleValueChangeLocal(row.row_id, field.field_id, v)
            }
            style={{ width: "100%" }}
          />
        );
      case "string":
        if (field.choices?.length) {
          return (
            <Select
              value={value}
              onChange={(v) => {
                handleValueChangeServer(row.row_id);
              }}
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
            onBlur={(e) => handleValueChangeServer(row.row_id)}
            onChange={(e) =>
              handleValueChangeLocal(row.row_id, field.field_id, e.target.value)
            }
          />
        );
      case "bool":
        return (
          <Checkbox
            checked={!!value}
            onChange={(e) => handleValueChangeServer(row.row_id)}
          />
        );
      case "datetime":
        return (
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(d) => handleValueChangeServer(row.row_id)}
            style={{ width: "100%" }}
          />
        );
      default:
        return <Input disabled value={value} />;
    }
  };

  const columns = [
    ...fields.map((field) => ({
      title: field.name,
      dataIndex: field.name,
      key: field.field_id,
      render: (_, row: Row) => renderEditor(field, row),
    })),
    {
      title: "Действия",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, row: Row) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(row.row_id)}
        />
      ),
    },
  ];

  const dataSource =
    rows?.map((r) => {
      const obj: Row & { [key: string]: string | number } = {
        key: r.row_id,
        id: r.row_id,
        ...r,
      };
      fields.forEach((field) => {
        const v = r.values.find((v) => v.field_id === field.field_id);
        obj[field.name] = v ? v.value?.value : "";
      });
      return obj;
    }) || [];

  return (
    <Flex vertical gap={20}>
      {contextHolder}
      <h1>{name}</h1>

      <Flex gap={8}>
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

                const expectedHeaders = fields.map((f) => f.name);

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
                    content:
                      "Ошибка: не удалось найти строки с заголовками. Excel не соответствует формату.",
                  });
                }

                onSuccess?.(null);
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
          <Button icon={<UploadOutlined />}>Загрузить Excel файл</Button>
        </Upload>
      </Flex>

      <Table
        dataSource={dataSource}
        //@ts-expect-error antd align type error
        columns={columns}
        pagination={false}
        loading={isAdding || isDeleting || isUpdating}
        bordered
      />
      <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddRow}>
        Добавить строку
      </Button>
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
                  label: f.name,
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
