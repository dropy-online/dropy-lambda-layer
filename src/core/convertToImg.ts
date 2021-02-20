import { Options, PageObject, ConvertErrors } from '@/types';
import { createError } from '@/utils';
import GM from 'gm';

const gm = GM.subClass({ imageMagick: true });

export const convertToImg = async (
  pages: number[],
  options: Options,
  buffer: Buffer
): Promise<PageObject[]> => {
  const { size, quality, format, density } = options;
  const result = pages.map(
    (page) =>
      new Promise<PageObject>((resolve, reject) =>
        gm(buffer)
          .limit('memory', process.env.CONVERT_MEMORY_SIZE)
          .selectFrame(page)
          .resize(size)
          .quality(quality)
          .density(density, density)
          .toBuffer(format, (error, imgBuffer) =>
            error
              ? reject(
                  createError({ code: ConvertErrors.FAILED_CONVERT_PAGE, message: error.message })
                )
              : resolve({ page, body: imgBuffer })
          )
      )
  );

  const bufferArr = await Promise.all(result);
  return bufferArr;
};
