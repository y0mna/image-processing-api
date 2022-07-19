const projectPath = process.cwd() + process.env.PROJECT_PATH;
const resizedImagesDirectory = projectPath + '/assets/thumb/';
const originalImagesDirectory = projectPath + '/assets/full/';

const getFileExtension = (fileName: string): string => {
  return fileName ? fileName.split('.')[1] : 'jpg';
};

const getFileName = (fileName: string): string => {
  return fileName ? fileName.split('.')[0] : '';
};

const getResizedImageName = (originalName: string, width: number, height: number, extension: string): string => {
  return originalName + '-' + width.toString() + 'x' + height.toString() + '.' + extension;
};

const getImagePath = (imageName: string): string => {
  return originalImagesDirectory + imageName;
};

const getResizedImagePath = (imageName: string, width: number, height: number): string => {
  return resizedImagesDirectory + getResizedImageName(getFileName(imageName), width, height, getFileExtension(imageName));
};

export { getImagePath, getResizedImagePath };
