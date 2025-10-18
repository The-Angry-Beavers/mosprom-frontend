export interface IAuthLoginDto {
  username: string;
  password: string;
}

export type IAuthRegisterDto = {
  email: string;

  password: string;
};

export interface IAuthResponse {
  access_token: string;
}
