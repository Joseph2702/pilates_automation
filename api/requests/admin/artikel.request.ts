import { RandomUtil } from '../../../shared/utils/random.util';

export interface CreateArtikelPayload {
  title: string;
  content: string;
  author: string;
  image_url?: string;
  category?: string;
}

export interface UpdateArtikelPayload extends Partial<CreateArtikelPayload> {}

export class ArtikelRequest {
  static createValid(): CreateArtikelPayload {
    return {
      title: `Artikel ${RandomUtil.generateString(10)}`,
      content: 'This is test artikel content with meaningful information about pilates and fitness.',
      author: 'Test Author',
    };
  }

  static createWithTitle(title: string): CreateArtikelPayload {
    return {
      title,
      content: 'This is test artikel content with meaningful information about pilates and fitness.',
      author: 'Test Author',
    };
  }

  static createWithContent(content: string): CreateArtikelPayload {
    return {
      title: `Artikel ${RandomUtil.generateString(10)}`,
      content,
      author: 'Test Author',
    };
  }

  static createWithAuthor(author: string): CreateArtikelPayload {
    return {
      title: `Artikel ${RandomUtil.generateString(10)}`,
      content: 'This is test artikel content with meaningful information about pilates and fitness.',
      author,
    };
  }

  static createWithCategory(category: string): CreateArtikelPayload {
    return {
      title: `Artikel ${RandomUtil.generateString(10)}`,
      content: 'This is test artikel content with meaningful information about pilates and fitness.',
      author: 'Test Author',
      category,
    };
  }

  static updateValid(): UpdateArtikelPayload {
    return {
      title: `Updated Artikel ${RandomUtil.generateString(10)}`,
      content: 'Updated content with new information.',
      author: 'Updated Author',
    };
  }

  static updateTitle(title: string): UpdateArtikelPayload {
    return { title };
  }

  static updateContent(content: string): UpdateArtikelPayload {
    return { content };
  }
}

export default ArtikelRequest;
