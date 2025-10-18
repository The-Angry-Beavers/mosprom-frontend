import { useGetALlNamespace } from '@/entity';
import { NamespaceList } from '@/widgets/namespace-list';

export const Home = () => {
  const { mockData } = useGetALlNamespace();

  return (
    <div>
      <h1>Главная</h1>

      <NamespaceList items={mockData} />
    </div>
  );
};
