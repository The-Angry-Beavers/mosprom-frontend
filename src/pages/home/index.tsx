import { NamespaceList } from '@/widgets/namespace-list';
import './Home.scss';

import { useGetALlNamespace } from '@/entity';

export const Home = () => {
  const { data } = useGetALlNamespace();

  return (
    <div>
      <div className="homeBackground" />
      <h1 className="homeTitle">Главная</h1>
      <NamespaceList items={data} />
    </div>
  );
};
