import { LoginPayload } from '../../clients/auth-client';
import { envConfig } from '../../../shared/config/env.config';

export class LoginRequest {
  static adminUser(): LoginPayload {
    return {
      email: envConfig.ADMIN_EMAIL,
      password: envConfig.ADMIN_PASSWORD,
    };
  }

  static customerUser(): LoginPayload {
    return {
      email: envConfig.CUSTOMER_EMAIL,
      password: envConfig.CUSTOMER_PASSWORD,
    };
  }

  static instructorUser(): LoginPayload {
    return {
      email: envConfig.INSTRUCTOR_EMAIL,
      password: envConfig.INSTRUCTOR_PASSWORD,
    };
  }

  static withCredentials(email: string, password: string): LoginPayload {
    return {
      email,
      password,
    };
  }
}

export default LoginRequest;
