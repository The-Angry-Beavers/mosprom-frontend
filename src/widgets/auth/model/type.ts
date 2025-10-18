export type AuthType = 'login' | 'register';

export type RegisterFormType = {
  email: string;
  name: string;
  password: string;
};

export type LoginFormType = {
  username: string;
  password: string;
};
