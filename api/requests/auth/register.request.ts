import { RegisterPayload } from '../../clients/auth-client';
import { RandomUtil } from '../../../shared/utils/random.util';

export class RegisterRequest {
  static valid(): RegisterPayload {
    const email = RandomUtil.generateEmail();
    return {
      name: 'Test Customer',
      email,
      password: 'Password123!',
      password_confirmation: 'Password123!',
      phone: RandomUtil.generatePhoneNumber(),
    };
  }

  static withEmail(email: string): RegisterPayload {
    return {
      name: 'Test Customer',
      email,
      password: 'Password123!',
      password_confirmation: 'Password123!',
      phone: RandomUtil.generatePhoneNumber(),
    };
  }

  static withName(name: string): RegisterPayload {
    const email = RandomUtil.generateEmail();
    return {
      name,
      email,
      password: 'Password123!',
      password_confirmation: 'Password123!',
      phone: RandomUtil.generatePhoneNumber(),
    };
  }

  static withPhone(phone: string): RegisterPayload {
    const email = RandomUtil.generateEmail();
    return {
      name: 'Test Customer',
      email,
      password: 'Password123!',
      password_confirmation: 'Password123!',
      phone,
    };
  }
}

export default RegisterRequest;
