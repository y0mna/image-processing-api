import express from 'express';
import imagesRoutes from './images';

const v1Routes = express.Router();

// All routes for v1 api
v1Routes.use('/images', imagesRoutes);

export default v1Routes;
