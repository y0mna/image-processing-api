import express, { Request, Response } from 'express';
import { query, ValidationChain, validationResult } from 'express-validator';
import { resizeImage } from '../../third-party-packages/image-processor';
import { getImagePath } from '../../utils/files';
import fs from 'fs';

const imagesRoutes = express.Router();

const addRequestValidators = (): ValidationChain[] => {
  return [
    query('name')
      .exists()
      .withMessage('query param "name" is required')
      .bail()
      .notEmpty()
      .withMessage('query param "name" is required')
      .bail(),
    query('height')
      .if(query('width').exists())
      .notEmpty()
      .withMessage('query param "height" is required')
      .bail()
      .isInt({ gt: 0 })
      .withMessage('query param "height" must be an integer > 0')
      .bail(),
    query('width')
      .if(query('height').exists())
      .notEmpty()
      .withMessage('query param "width" is required')
      .bail()
      .isInt({ gt: 0 })
      .withMessage('query param "width" must be an integer > 0')
      .bail()
  ];
};

imagesRoutes.get('/', addRequestValidators(), async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const imageName = (req.query.name + '.jpg') as string;
  const originalImageName = getImagePath(imageName);
  if (!fs.existsSync(originalImageName)) {
    return res.status(404).send('Image not found.');
  }

  if (!(req.query.width && req.query.height)) {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    const content = fs.readFileSync(originalImageName);
    return res.status(200).end(content);
  }

  const resizedImagePath = await resizeImage(imageName, Number(req.query.width), Number(req.query.height));
  if (resizedImagePath) {
    return res.sendFile(resizedImagePath);
  }

  return res.status(500).send('Sorry could not resize the image.');
});

export default imagesRoutes;
