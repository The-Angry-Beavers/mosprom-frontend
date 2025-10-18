import type { NamespaceType } from '@/entity';
import { Card, Flex } from 'antd';
import css from './namespaceCard.module.scss';
import { FolderOutlined } from '@ant-design/icons';
type Props = {
  namespace: NamespaceType;
};

export const NamespaceCard = ({ namespace }: Props) => {
  return (
    <Card className={css.card}>
      <Flex gap={5} align="center">
        <FolderOutlined className={css.icon} />
        <p className={css.name}>{namespace.name}</p>
      </Flex>
    </Card>
  );
};
