import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    name: "Таблица1",
    date: "02.04.2002",
  },
  {
    key: "2",
    name: "Таблица2",
    date: "02.04.2006",
  },
];

const columns = [
  {
    title: "Название файла",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Дата последнего изменения",
    dataIndex: "date",
    key: "date",
  },
];

export const Home = () => {
  return (
    <div>
      <h1>Тестовый Неймспейс</h1>
      <Table dataSource={dataSource} columns={columns} ></Table>
    </div>
  );
};
