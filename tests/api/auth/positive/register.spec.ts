import { test, expect } from '@playwright/test';
import { AuthClient } from '../../../../api/clients/auth-client';
import { RegisterRequest } from '../../../../api/requests/auth/register.request';
import { RandomUtil } from '../../../../shared/utils/random.util';

test.describe('API - Auth Register (Positive Scenarios)', () => {
  let authClient: AuthClient;

  test.beforeEach(() => {
    authClient = new AuthClient();
  });

  test('Register with valid data', async () => {
    const payload = RegisterRequest.valid();
    const response = await authClient.register(payload);

    expect(response.success).toBe(true);
    expect(response.data?.token).toBeTruthy();
    expect(response.data?.token_type).toBe('Bearer');
  });

  test('Registered user can login immediately', async () => {
    // Register new user
    const email = RandomUtil.generateEmail();
    const registerPayload = RegisterRequest.withEmail(email);
    const registerResponse = await authClient.register(registerPayload);

    expect(registerResponse.data?.token).toBeTruthy();

    // Create new client for login (to clear previous token)
    const newAuthClient = new AuthClient();

    // Login with same credentials
    const loginResponse = await newAuthClient.login({
      email,
      password: registerPayload.password,
    });

    expect(loginResponse.success).toBe(true);
    expect(loginResponse.data?.token).toBeTruthy();
  });

  test('Register with various valid names', async () => {
    const testNames = [
      'John Doe',
      'Muhammad Ali',
      'Ana García',
      '李明',
      'A',
    ];

    for (const name of testNames) {
      const payload = RegisterRequest.withName(name);
      const response = await authClient.register(payload);

      expect(response.success).toBe(true);
      expect(response.data?.token).toBeTruthy();
    }
  });

  test('Register with valid phone numbers', async () => {
    const testPhones = [
      '628123456789',
      '6281234567890',
      '6289876543210',
    ];

    for (const phone of testPhones) {
      const payload = RegisterRequest.withPhone(phone);
      const response = await authClient.register(payload);

      expect(response.success).toBe(true);
      expect(response.data?.token).toBeTruthy();
    }
  });
});
