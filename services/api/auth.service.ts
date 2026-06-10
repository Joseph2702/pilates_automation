import { AuthClient, LoginPayload, RegisterPayload } from '../../api/clients/auth-client';
import { ApiResponse, AuthToken, UserData } from '../../shared/types/api-response.type';

export class AuthService {
  private authClient: AuthClient;

  constructor() {
    this.authClient = new AuthClient();
  }

  async registerUser(payload: RegisterPayload): Promise<{ token: string; user: any }> {
    const response = await this.authClient.register(payload);

    if (!response.success || !response.data?.token) {
      throw new Error('Registration failed: ' + response.message);
    }

    return {
      token: response.data.token,
      user: payload,
    };
  }

  async loginUser(payload: LoginPayload): Promise<{ token: string; user: UserData }> {
    const response = await this.authClient.login(payload);

    if (!response.success || !response.data?.token) {
      throw new Error('Login failed: ' + response.message);
    }

    const meResponse = await this.authClient.getMe();
    if (!meResponse.success || !meResponse.data) {
      throw new Error('Failed to fetch user data');
    }

    return {
      token: response.data.token,
      user: meResponse.data,
    };
  }

  async logoutUser(): Promise<void> {
    await this.authClient.logout();
  }

  getAuthClient(): AuthClient {
    return this.authClient;
  }

  setToken(token: string): void {
    this.authClient.setToken(token);
  }

  getToken(): string | undefined {
    return this.authClient.getToken();
  }
}

export default AuthService;
