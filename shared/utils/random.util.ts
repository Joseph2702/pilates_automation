export class RandomUtil {
  static generateEmail(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `test.user.${timestamp}.${random}@example.com`;
  }

  static generateUsername(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `user_${timestamp}_${random}`;
  }

  static generatePhoneNumber(): string {
    const random = Math.floor(Math.random() * 90000000) + 10000000;
    return `628${random}`;
  }

  static generateString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generatePrice(min: number = 10000, max: number = 1000000): number {
    const random = this.generateNumber(min, max);
    return Math.round(random / 1000) * 1000;
  }

  static generatePromoCode(): string {
    const prefix = 'PROMO';
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${prefix}_${random}`;
  }

  static generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .trim();
  }
}

export default RandomUtil;
