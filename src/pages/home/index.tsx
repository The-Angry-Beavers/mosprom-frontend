import { useGetALlNamespace } from "@/entity";
import { NamespaceList } from "@/widgets/namespace-list";
import "./Home.scss";

export const Home = () => {
  const { mockData } = useGetALlNamespace();

  return (
    <div>
      <div className="homeBackground" />
      <h1 className="homeTitle">Главная</h1>
      <NamespaceList items={mockData} />
    </div>
  );
};
