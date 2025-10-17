export type AuthType = 'login' | 'register';

export type RegisterFormType = {
  email: string;
  name: string;
  password: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};
