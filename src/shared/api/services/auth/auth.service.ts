import { API_URL } from "@/shared/config/apiUrl";
import { axiosClassic } from "../../api";
import { saveTokenStorage, removeFromStorage } from "./authToken.service";

export interface IUser {
  id: string;
  email: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

class AuthService {
  async register( data: IAuthForm) {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.register(),
      method: "POST",
      data,
    });

    if (response.data.accessToken) {
      saveTokenStorage(response.data.accessToken);
    }

    return response;
  }

   async login( data: IAuthForm) {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.login(),
      method: "POST",
      data,
    });

    if (response.data.accessToken) {
      saveTokenStorage(response.data.accessToken);
    }

    return response;
  }


  logout() {
    removeFromStorage();
  }
}

export const authService = new AuthService();
