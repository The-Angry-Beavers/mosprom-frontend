import { Form } from "antd";
import { useEffect, useState } from "react";
import { CreateBaseFields } from "./ui/create-base-fields";
import { CreateColumnsFields } from "./ui/create-columns-fields";
import { useCreateTable, type CreateTableDto } from "@/entity";
import { v4 as uuidv4 } from "uuid";
import { useMovetoTable } from "@/entity/namespace";
import { useParams } from "react-router-dom";

export const CreateTableForm = ({
  namespace,
  handleClose,
  onNotify,
}: {
  namespace: string;
  handleClose?: () => void;
  onNotify?: () => void;
}) => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm<CreateTableDto>();
  const { namespaceId } = useParams();
  const [isReset, setIsReset] = useState(false);
  const { mutate: moveToTable } = useMovetoTable();

  const handleCallback = (table_id: number) => {
    if (!table_id) return;
    moveToTable({ table_id, target_namespace_id: Number(namespaceId) || 0 });
    onNotify?.();
  };

  const { mutate } = useCreateTable(handleCallback);

  const onFinish = (values: CreateTableDto) => {
    console.log("✅ Result:", values);
    form.resetFields();
    setStep(0);
    const convertDataTypesToString = (
      table: CreateTableDto
    ): CreateTableDto => ({
      ...table,
      fields: table.fields.map((f) => ({
        ...f,
		default_value: f.data_type === "choice" ? "string" : f.data_type,
        data_type: "string",
        choices: f.choices.map((c) => ({ ...c })),
      })),
    });
    mutate({
      ...convertDataTypesToString(values),
      name: uuidv4(),
    });
    handleClose?.();

    setIsReset(true);
  };

  useEffect(() => {
    if (isReset) {
      form.resetFields();
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{ paddingTop: "24px" }}
      initialValues={{
        namespace,
        templateId: 0,
        fields: [
          {
            id: 1,
            name: "Новая колонка",
            verbose_name: "Новая колонка",
            data_type: "string",
            is_nullable: false,
            default_value: "",
            choices: [],
          },
        ],
      }}
    >
      <div style={{ display: step === 0 ? "block" : "none" }}>
        <CreateBaseFields form={form} nextStep={() => setStep(step + 1)} />
      </div>
      <div style={{ display: step === 1 ? "block" : "none" }}>
        <CreateColumnsFields
          isReset={isReset}
          form={form}
          nextStep={() => setStep(step - 1)}
        />
      </div>
    </Form>
  );
};
