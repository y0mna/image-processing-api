import sharp from 'sharp';
import { getImagePath, getResizedImagePath } from '../utils/files';

const resizeImage = async (name: string, width: number, height: number): Promise<string> => {
  try {
    const imagePath: string = getImagePath(name);
    const resizedImagePath: string = getResizedImagePath(name, width, height);
    await sharp(imagePath).resize(width, height, { fit: 'fill' }).toFile(resizedImagePath);
    return resizedImagePath;
  } catch (error) {
    console.log((error as Error).message);
    return '';
  }
};

export { resizeImage };
