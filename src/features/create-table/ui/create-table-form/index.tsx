import { Form } from "antd";
import { useState } from "react";
import { CreateBaseFields } from "./ui/create-base-fields";
import { CreateColumnsFields } from "./ui/create-columns-fields";
import type { CreateTableType } from "@/entity";

export const CreateTableForm = ({ namespace }: { namespace: string }) => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm<CreateTableType>();

  const onFinish = (values: CreateTableType) => {
    console.log("✅ Result:", values);
  };

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
        <CreateColumnsFields form={form} nextStep={() => setStep(step - 1)} />
      </div>
    </Form>
  );
};
