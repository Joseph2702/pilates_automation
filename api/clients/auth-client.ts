import { BaseClient } from './base-client';
import { ENDPOINTS } from '../../shared/constants/endpoints.constants';
import { AuthToken, ApiResponse, UserData } from '../../shared/types/api-response.type';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export class AuthClient extends BaseClient {
  async register(payload: RegisterPayload): Promise<ApiResponse<AuthToken>> {
    const response = await this.post<AuthToken>(ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
  }

  async login(payload: LoginPayload): Promise<ApiResponse<AuthToken>> {
    const response = await this.post<AuthToken>(ENDPOINTS.AUTH.LOGIN, payload);
    const data = response.data;

    if (data.success && data.data?.token) {
      this.setToken(data.data.token);
    }

    return data;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.post<any>(ENDPOINTS.AUTH.LOGOUT);
    this.clearToken();
    return response.data;
  }

  async getMe(): Promise<ApiResponse<UserData>> {
    const response = await this.get<UserData>(ENDPOINTS.AUTH.ME);
    return response.data;
  }

  getToken(): string | undefined {
    return this.token;
  }
}

export default AuthClient;
