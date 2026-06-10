import { RandomUtil } from '../../../shared/utils/random.util';

export interface CreatePromoPayload {
  code: string;
  discount_percent?: number;
  discount_nominal?: number;
  max_usage: number;
  start_date?: string;
  end_date?: string;
}

export interface UpdatePromoPayload extends Partial<CreatePromoPayload> {}

export class PromoRequest {
  static createValid(): CreatePromoPayload {
    return {
      code: RandomUtil.generatePromoCode(),
      discount_percent: RandomUtil.generateNumber(5, 50),
      max_usage: RandomUtil.generateNumber(10, 100),
    };
  }

  static createWithCode(code: string): CreatePromoPayload {
    return {
      code,
      discount_percent: RandomUtil.generateNumber(5, 50),
      max_usage: RandomUtil.generateNumber(10, 100),
    };
  }

  static createWithDiscount(discountPercent: number): CreatePromoPayload {
    return {
      code: RandomUtil.generatePromoCode(),
      discount_percent: discountPercent,
      max_usage: RandomUtil.generateNumber(10, 100),
    };
  }

  static createWithNominal(discountNominal: number): CreatePromoPayload {
    return {
      code: RandomUtil.generatePromoCode(),
      discount_nominal: discountNominal,
      max_usage: RandomUtil.generateNumber(10, 100),
    };
  }

  static createWithMaxUsage(maxUsage: number): CreatePromoPayload {
    return {
      code: RandomUtil.generatePromoCode(),
      discount_percent: RandomUtil.generateNumber(5, 50),
      max_usage: maxUsage,
    };
  }

  static updateValid(): UpdatePromoPayload {
    return {
      code: RandomUtil.generatePromoCode(),
      discount_percent: RandomUtil.generateNumber(5, 50),
      max_usage: RandomUtil.generateNumber(10, 100),
    };
  }

  static updateDiscount(discountPercent: number): UpdatePromoPayload {
    return { discount_percent: discountPercent };
  }
}

export default PromoRequest;
