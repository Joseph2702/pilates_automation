import { RandomUtil } from '../../../shared/utils/random.util';

export interface CreatePackagePayload {
  name: string;
  description: string;
  price: number;
  duration_days: number;
  credit_session: number;
}

export interface UpdatePackagePayload extends Partial<CreatePackagePayload> {}

export class PackagesRequest {
  static createValid(): CreatePackagePayload {
    return {
      name: `Package ${RandomUtil.generateString(5)}`,
      description: `Test package description`,
      price: RandomUtil.generatePrice(50000, 500000),
      duration_days: RandomUtil.generateNumber(1, 365),
      credit_session: RandomUtil.generateNumber(1, 100),
    };
  }

  static createWithName(name: string): CreatePackagePayload {
    return {
      name,
      description: 'Test package description',
      price: RandomUtil.generatePrice(50000, 500000),
      duration_days: RandomUtil.generateNumber(1, 365),
      credit_session: RandomUtil.generateNumber(1, 100),
    };
  }

  static createWithPrice(price: number): CreatePackagePayload {
    return {
      name: `Package ${RandomUtil.generateString(5)}`,
      description: 'Test package description',
      price,
      duration_days: RandomUtil.generateNumber(1, 365),
      credit_session: RandomUtil.generateNumber(1, 100),
    };
  }

  static createWithDuration(durationDays: number): CreatePackagePayload {
    return {
      name: `Package ${RandomUtil.generateString(5)}`,
      description: 'Test package description',
      price: RandomUtil.generatePrice(50000, 500000),
      duration_days: durationDays,
      credit_session: RandomUtil.generateNumber(1, 100),
    };
  }

  static createWithCredits(creditSession: number): CreatePackagePayload {
    return {
      name: `Package ${RandomUtil.generateString(5)}`,
      description: 'Test package description',
      price: RandomUtil.generatePrice(50000, 500000),
      duration_days: RandomUtil.generateNumber(1, 365),
      credit_session: creditSession,
    };
  }

  static updateValid(): UpdatePackagePayload {
    return {
      name: `Updated Package ${RandomUtil.generateString(5)}`,
      description: 'Updated description',
      price: RandomUtil.generatePrice(50000, 500000),
    };
  }

  static updateName(name: string): UpdatePackagePayload {
    return { name };
  }

  static updatePrice(price: number): UpdatePackagePayload {
    return { price };
  }
}

export default PackagesRequest;
