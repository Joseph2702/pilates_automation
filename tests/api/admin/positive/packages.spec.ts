import { test, expect } from '@playwright/test';
import { BaseClient } from '../../../../api/clients/base-client';
import { AuthClient } from '../../../../api/clients/auth-client';
import { LoginRequest } from '../../../../api/requests/auth/login.request';
import { PackagesRequest } from '../../../../api/requests/admin/packages.request';
import { ENDPOINTS } from '../../../../shared/constants/endpoints.constants';
import { PackageData } from '../../../../shared/types/api-response.type';

test.describe('API - Admin Packages (Positive Scenarios)', () => {
  let authClient: AuthClient;
  let adminClient: BaseClient;
  let adminToken: string;

  test.beforeAll(async () => {
    authClient = new AuthClient();
    const loginPayload = LoginRequest.adminUser();
    const loginResponse = await authClient.login(loginPayload);

    adminToken = loginResponse.data?.token!;
    expect(adminToken).toBeTruthy();

    // Create admin client with token
    adminClient = new BaseClient();
    adminClient.setToken(adminToken);
  });

  test('Get all packages', async () => {
    const response = await adminClient.get<PackageData[]>(
      ENDPOINTS.ADMIN.PACKAGES.INDEX
    );

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  test('Create package with valid data', async () => {
    const payload = PackagesRequest.createValid();
    const response = await adminClient.post<PackageData>(
      ENDPOINTS.ADMIN.PACKAGES.STORE,
      payload
    );

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.data?.name).toBe(payload.name);
    expect(response.data.data?.price).toBe(payload.price);
    expect(response.data.data?.duration_days).toBe(payload.duration_days);
    expect(response.data.data?.credit_session).toBe(payload.credit_session);
  });

  test('View specific package', async () => {
    // First, create a package
    const createPayload = PackagesRequest.createValid();
    const createResponse = await adminClient.post<PackageData>(
      ENDPOINTS.ADMIN.PACKAGES.STORE,
      createPayload
    );

    const packageId = createResponse.data.data?.id!;

    // Then view it
    const viewResponse = await adminClient.get<PackageData>(
      ENDPOINTS.ADMIN.PACKAGES.SHOW(packageId)
    );

    expect(viewResponse.status).toBe(200);
    expect(viewResponse.data.success).toBe(true);
    expect(viewResponse.data.data?.id).toBe(packageId);
    expect(viewResponse.data.data?.name).toBe(createPayload.name);
  });

  test('Update package', async () => {
    // Create a package
    const createPayload = PackagesRequest.createValid();
    const createResponse = await adminClient.post<PackageData>(
      ENDPOINTS.ADMIN.PACKAGES.STORE,
      createPayload
    );

    const packageId = createResponse.data.data?.id!;

    // Update it
    const updatePayload = PackagesRequest.updateValid();
    const updateResponse = await adminClient.put<PackageData>(
      ENDPOINTS.ADMIN.PACKAGES.UPDATE(packageId),
      updatePayload
    );

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.success).toBe(true);
    expect(updateResponse.data.data?.id).toBe(packageId);
    expect(updateResponse.data.data?.name).toBe(updatePayload.name);
  });

  test('Delete package', async () => {
    // Create a package
    const createPayload = PackagesRequest.createValid();
    const createResponse = await adminClient.post<PackageData>(
      ENDPOINTS.ADMIN.PACKAGES.STORE,
      createPayload
    );

    const packageId = createResponse.data.data?.id!;

    // Delete it
    const deleteResponse = await adminClient.delete(
      ENDPOINTS.ADMIN.PACKAGES.DELETE(packageId)
    );

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.success).toBe(true);

    // Verify it's deleted (should get 404 or empty)
    try {
      await adminClient.get(ENDPOINTS.ADMIN.PACKAGES.SHOW(packageId));
    } catch (error: any) {
      expect(error.response?.status).toBe(404);
    }
  });

  test('Create multiple packages with different data', async () => {
    const testCases = [
      PackagesRequest.createWithPrice(100000),
      PackagesRequest.createWithPrice(500000),
      PackagesRequest.createWithDuration(7),
      PackagesRequest.createWithDuration(30),
      PackagesRequest.createWithCredits(5),
      PackagesRequest.createWithCredits(20),
    ];

    for (const payload of testCases) {
      const response = await adminClient.post<PackageData>(
        ENDPOINTS.ADMIN.PACKAGES.STORE,
        payload
      );

      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data?.id).toBeTruthy();
    }
  });
});
