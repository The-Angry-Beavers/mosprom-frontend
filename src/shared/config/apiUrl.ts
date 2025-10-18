export const API_URL = {
  root: (url = '') => `${url ? url : ''}`,
	login: () => API_URL.root(`/auth/jwt/login`),
	register: () => API_URL.root(`/auth/register`),
  user: (url = '') => API_URL.root(`/users${url}`),
  namespace: (url = '') => API_URL.root(`/namespace${url}`),
  tables: (url = '') => API_URL.root(`/tables${url}`),
};
