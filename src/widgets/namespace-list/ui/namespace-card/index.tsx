import type { NamespaceType } from "@/entity";
import { Card, Flex } from "antd";
import css from "./namespaceCard.module.scss";
import {
  FolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";
type Props = {
  namespace: NamespaceType;
  addCard?: boolean;
  onClick?: () => void;
};

export const NamespaceCard = ({ namespace, addCard, onClick }: Props) => {
  return (
    <Card
      className={css.card}
      onClick={() => {
        onClick?.();
      }}
    >
      <Flex gap={5} align="center" justify="center">
        {addCard ? (
          <PlusOutlined className={css.icon} />
        ) : (
          <FolderOutlined className={css.icon} />
        )}
        <p className={css.name}>{namespace.name}</p>
      </Flex>
    </Card>
  );
};
