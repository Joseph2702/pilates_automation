import { test, expect } from '@playwright/test';
import { AuthClient } from '../../../../api/clients/auth-client';
import { LoginRequest } from '../../../../api/requests/auth/login.request';
import { RegisterRequest } from '../../../../api/requests/auth/register.request';
import { envConfig } from '../../../../shared/config/env.config';

test.describe('API - Auth Login (Positive Scenarios)', () => {
  let authClient: AuthClient;

  test.beforeEach(() => {
    authClient = new AuthClient();
  });

  test('Login with valid admin credentials', async () => {
    const payload = LoginRequest.adminUser();
    const response = await authClient.login(payload);

    expect(response.success).toBe(true);
    expect(response.data?.token).toBeTruthy();
    expect(response.data?.token_type).toBe('Bearer');
  });

  test('Login with valid customer credentials', async () => {
    const payload = LoginRequest.customerUser();
    const response = await authClient.login(payload);

    expect(response.success).toBe(true);
    expect(response.data?.token).toBeTruthy();
    expect(response.data?.token_type).toBe('Bearer');
  });

  test('Login with valid instructor credentials', async () => {
    const payload = LoginRequest.instructorUser();
    const response = await authClient.login(payload);

    expect(response.success).toBe(true);
    expect(response.data?.token).toBeTruthy();
    expect(response.data?.token_type).toBe('Bearer');
  });

  test('Login sets Bearer token in authorization header', async () => {
    const payload = LoginRequest.adminUser();
    const response = await authClient.login(payload);

    expect(response.data?.token_type).toBe('Bearer');
    expect(authClient.getToken()).toBe(response.data?.token);
  });

  test('Can fetch user profile after login', async () => {
    // Login first
    const loginPayload = LoginRequest.adminUser();
    const loginResponse = await authClient.login(loginPayload);

    expect(loginResponse.data?.token).toBeTruthy();

    // Get user profile
    const meResponse = await authClient.getMe();

    expect(meResponse.success).toBe(true);
    expect(meResponse.data?.id).toBeTruthy();
    expect(meResponse.data?.email).toBe(envConfig.ADMIN_EMAIL);
  });
});
