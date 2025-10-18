export const API_URL = {
  root: (url = '') => `${url ? url : ''}`,
  auth: (url = '') => `${url}`,
  user: (url = '') => API_URL.root(`/users${url}`),
  namespace: (url = '') => API_URL.root(`/namespace${url}`),
  tables: (url = '') => API_URL.root(`/tables${url}`),
};
