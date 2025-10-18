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
      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <CreateBaseFields form={form} nextStep={() => setStep(step + 1)} />
      </div>
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <CreateColumnsFields form={form} nextStep={() => setStep(step - 1)} />
      </div>
    </Form>
  );
};
