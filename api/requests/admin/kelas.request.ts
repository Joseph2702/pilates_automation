import { RandomUtil } from '../../../shared/utils/random.util';

export interface CreateKelasPayload {
  name: string;
  description: string;
}

export interface UpdateKelasPayload extends Partial<CreateKelasPayload> {}

export class KelasRequest {
  static createValid(): CreateKelasPayload {
    return {
      name: `Kelas ${RandomUtil.generateString(5)}`,
      description: 'Test kelas description',
    };
  }

  static createWithName(name: string): CreateKelasPayload {
    return {
      name,
      description: 'Test kelas description',
    };
  }

  static createWithDescription(description: string): CreateKelasPayload {
    return {
      name: `Kelas ${RandomUtil.generateString(5)}`,
      description,
    };
  }

  static updateValid(): UpdateKelasPayload {
    return {
      name: `Updated Kelas ${RandomUtil.generateString(5)}`,
      description: 'Updated description',
    };
  }

  static updateName(name: string): UpdateKelasPayload {
    return { name };
  }
}

export default KelasRequest;
