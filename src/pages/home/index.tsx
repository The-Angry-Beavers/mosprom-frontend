import { NamespaceList } from '@/widgets/namespace-list';
import './Home.scss';
import { namespaceService } from '@/shared/api';

export const Home = () => {
  const data = namespaceService.getMockAllNamespaces();

  return (
    <div>
      <div className="homeBackground" />
      <h1 className="homeTitle">Главная</h1>
      {!!data?.length && <NamespaceList items={data} />}
    </div>
  );
};
