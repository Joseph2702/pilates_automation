import { BaseClient } from './base-client';
import { ENDPOINTS } from '../../shared/constants/endpoints.constants';
import {
  PackageData,
  KelasData,
  ArtikelData,
  PromoData,
  UserData,
} from '../../shared/types/api-response.type';
import { CreatePackagePayload } from '../requests/admin/packages.request';
import { CreateKelasPayload } from '../requests/admin/kelas.request';
import { CreatePromoPayload } from '../requests/admin/promo.request';
import { CreateArtikelPayload } from '../requests/admin/artikel.request';

export class AdminClient extends BaseClient {
  // ========== PACKAGES ==========
  async getPackages(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.PACKAGES.INDEX, {
      params: { page, limit },
    });
  }

  async getPackage(id: number) {
    return this.get<PackageData>(ENDPOINTS.ADMIN.PACKAGES.SHOW(id));
  }

  async createPackage(payload: CreatePackagePayload) {
    return this.post<PackageData>(ENDPOINTS.ADMIN.PACKAGES.STORE, payload);
  }

  async updatePackage(id: number, payload: Partial<CreatePackagePayload>) {
    return this.put<PackageData>(ENDPOINTS.ADMIN.PACKAGES.UPDATE(id), payload);
  }

  async deletePackage(id: number) {
    return this.delete(ENDPOINTS.ADMIN.PACKAGES.DELETE(id));
  }

  // ========== KELAS ==========
  async getKelasList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.KELAS.INDEX, {
      params: { page, limit },
    });
  }

  async getKelas(id: number) {
    return this.get<KelasData>(ENDPOINTS.ADMIN.KELAS.SHOW(id));
  }

  async createKelas(payload: CreateKelasPayload) {
    return this.post<KelasData>(ENDPOINTS.ADMIN.KELAS.STORE, payload);
  }

  async updateKelas(id: number, payload: Partial<CreateKelasPayload>) {
    return this.put<KelasData>(ENDPOINTS.ADMIN.KELAS.UPDATE(id), payload);
  }

  async deleteKelas(id: number) {
    return this.delete(ENDPOINTS.ADMIN.KELAS.DELETE(id));
  }

  // ========== PROMO ==========
  async getPromoList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.PROMO.INDEX, {
      params: { page, limit },
    });
  }

  async getPromo(id: number) {
    return this.get<PromoData>(ENDPOINTS.ADMIN.PROMO.SHOW(id));
  }

  async createPromo(payload: CreatePromoPayload) {
    return this.post<PromoData>(ENDPOINTS.ADMIN.PROMO.STORE, payload);
  }

  async updatePromo(id: number, payload: Partial<CreatePromoPayload>) {
    return this.put<PromoData>(ENDPOINTS.ADMIN.PROMO.UPDATE(id), payload);
  }

  async deletePromo(id: number) {
    return this.delete(ENDPOINTS.ADMIN.PROMO.DELETE(id));
  }

  // ========== ARTIKEL ==========
  async getArtikelList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.ARTIKEL.INDEX, {
      params: { page, limit },
    });
  }

  async getArtikel(id: number) {
    return this.get<ArtikelData>(ENDPOINTS.ADMIN.ARTIKEL.SHOW(id));
  }

  async createArtikel(payload: CreateArtikelPayload) {
    return this.post<ArtikelData>(ENDPOINTS.ADMIN.ARTIKEL.STORE, payload);
  }

  async updateArtikel(id: number, payload: Partial<CreateArtikelPayload>) {
    return this.put<ArtikelData>(ENDPOINTS.ADMIN.ARTIKEL.UPDATE(id), payload);
  }

  async deleteArtikel(id: number) {
    return this.delete(ENDPOINTS.ADMIN.ARTIKEL.DELETE(id));
  }

  // ========== USERS ==========
  async getUsersList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.USERS.INDEX, {
      params: { page, limit },
    });
  }

  async getUser(id: number) {
    return this.get<UserData>(ENDPOINTS.ADMIN.USERS.SHOW(id));
  }

  async updateUser(id: number, payload: Partial<UserData>) {
    return this.put<UserData>(ENDPOINTS.ADMIN.USERS.UPDATE(id), payload);
  }

  async syncUserRoles(id: number, roleIds: number[]) {
    return this.put(ENDPOINTS.ADMIN.USERS.SYNC_ROLES(id), { role_ids: roleIds });
  }

  async deactivateUser(id: number) {
    return this.post(ENDPOINTS.ADMIN.USERS.DEACTIVATE(id));
  }

  // ========== MONITORING ==========
  async getBookingsList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.BOOKINGS.INDEX, {
      params: { page, limit },
    });
  }

  async getBooking(id: number) {
    return this.get(ENDPOINTS.ADMIN.BOOKINGS.SHOW(id));
  }

  async getTransaksiList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.TRANSAKSI.INDEX, {
      params: { page, limit },
    });
  }

  async getTransaksi(id: number) {
    return this.get(ENDPOINTS.ADMIN.TRANSAKSI.SHOW(id));
  }

  async getPembelianList(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.PEMBELIAN_PACKAGE.INDEX, {
      params: { page, limit },
    });
  }

  async getPembelian(id: number) {
    return this.get(ENDPOINTS.ADMIN.PEMBELIAN_PACKAGE.SHOW(id));
  }

  // ========== ACTIVITY LOGS ==========
  async getActivityLogs(page: number = 1, limit: number = 15) {
    return this.get(ENDPOINTS.ADMIN.ACTIVITY_LOGS.INDEX, {
      params: { page, limit },
    });
  }

  async getActivityLogsByUser(userId: number) {
    return this.get(ENDPOINTS.ADMIN.ACTIVITY_LOGS.BY_USER(userId));
  }
}

export default AdminClient;
