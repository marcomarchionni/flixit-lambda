import sharp from "sharp";
import { Readable } from "stream";

export const resizeImage = async (imageStream: Readable): Promise<Buffer> => {
  const resizer = sharp().resize(200);
  const resizedImageBuffer = await imageStream.pipe(resizer).toBuffer();
  return resizedImageBuffer;
};
