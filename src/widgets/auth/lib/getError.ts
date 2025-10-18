import type { AxiosError } from 'axios';

const ERRORS = {
  LOGIN_BAD_CREDENTIALS: 'Неправильные логин или пароль',
};

export const getError = (err: AxiosError) => {
  const errType = err.response?.data?.detail as keyof typeof ERRORS;

  if(!errType) return '';

  return ERRORS[errType];
};
