export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface AuthToken {
  token: string;
  token_type: string;
  expires_in: number;
}

export interface UserData {
  id: number;
  id_user: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface PackageData {
  id: number;
  id_package: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  credit_session: number;
  created_at: string;
  updated_at: string;
}

export interface KelasData {
  id: number;
  id_kelas: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface BookingData {
  id: number;
  id_booking: string;
  id_jadwal_kelas: number;
  id_user: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TransaksiData {
  id: number;
  id_transaksi: string;
  id_user: number;
  amount: number;
  status: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface PromoData {
  id: number;
  id_promo: string;
  code: string;
  discount_percent: number;
  discount_nominal: number;
  max_usage: number;
  used: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ArtikelData {
  id: number;
  id_artikel: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export default {
  ApiResponse,
  PaginationMeta,
  AuthToken,
  UserData,
  PackageData,
  KelasData,
  BookingData,
  TransaksiData,
  PromoData,
  ArtikelData,
};
