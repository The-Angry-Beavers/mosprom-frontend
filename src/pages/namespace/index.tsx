import { TableList } from '@/widgets';
import { Flex } from 'antd';

export const NameSpacePage = () => {
  return (
    <div>
      <Flex justify="space-between" align="center">
        <h1>Ваши пространства</h1>

        <TableList />
      </Flex>
    </div>
  );
};
