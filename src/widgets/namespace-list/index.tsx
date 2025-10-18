import type { NamespaceType } from '@/entity';
import { NamespaceCard } from './ui/namespace-card';
import { Link } from 'react-router-dom';
import css from './namespaceList.module.scss';
type Props = {
  items: NamespaceType[];
};

export const NamespaceList = ({ items }: Props) => {
  return (
    <div className={css.namespaceList}>
      {items.map((item, index) => (
        <Link key={index} className={css.link} to={`/namespace/${item.id}`}>
          <NamespaceCard namespace={item} />
        </Link>
      ))}
	   <NamespaceCard namespace={{ id: 0, name: 'Добавить проект' }} addCard />
    </div>
  );
};
