import pdf from 'pdf-parse';
import { ConvertErrors } from '@/types';

export const getPdfPages = async (
  buffer: Buffer,
  offset = 1,
): Promise<number[][]> => {
  try {
    const { numpages: length } = await pdf(buffer);
    const pages = Array.from({ length }, (_, i) => i + 1);
    return Array(Math.ceil(length / offset)).fill().map(() => pages.splice(0, offset));
  } catch (e) {
    throw new Error(ConvertErrors.PDF_PARSING_FAIL);
  }
};
