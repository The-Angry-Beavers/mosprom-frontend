const mock = [
  {
    id: 1,
    name: 'Пространство 1',
  },
  {
    id: 2,
    name: 'Пространство 2',
  },
];

//TODO сделать async
class NamespaceService {
  getNamespaceById(id: number) {
    return mock[0];
  }
  
  getAllNamespaces() {
    return mock;
  }
}

export const namespaceService = new NamespaceService();
