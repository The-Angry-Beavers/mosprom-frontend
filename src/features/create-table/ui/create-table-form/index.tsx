import { Form } from 'antd';
import { useState } from 'react';
import { CreateBaseFields } from './ui/create-base-fields';
import { CreateColumnsFields } from './ui/create-columns-fields';
import type { CreateTableType } from '@/entity';

export const CreateTableForm = () => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm<CreateTableType>();

  const onFinish = (values: any) => {
    console.log('✅ Result:', values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {step === 0 && (
        <CreateBaseFields nextStep={() => setStep((prev) => prev + 1)} />
      )}
      {step === 1 && (
        <CreateColumnsFields
          form={form}
          nextStep={() => setStep((prev) => prev - 1)}
        />
      )}
    </Form>
  );
};
