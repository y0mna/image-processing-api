import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import cache from 'express-cache-middleware';
import cacheManager from 'cache-manager';

const app = express();
const port = 3000;

// Cache Middleware
const cacheMiddleware = new cache(
  cacheManager.caching({
    store: 'memory',
    max: 100000,
    ttl: 3600
  }),
  {
    hydrate: (req: Request, res: Response, data: Buffer | string, cb: CallableFunction) => {
      if (req.path.endsWith('images')) {
        res.contentType('image/jpeg');
      }
      cb(null, data);
    }
  }
);

// Rate limit Middleware
const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit each ip to 100 req per windowMs
  message: 'Too many requests from this device'
});

// Cors Middleware
const corsMiddleware = cors({
  origin: `http://localhost::${port}`
});

// Attach Middlewares
app.use(morgan('common'), rateLimitMiddleware, helmet(), corsMiddleware);
cacheMiddleware.attach(app);

// Routes
app.use('/api', routes);

// Listening to port
app.listen(port, function () {
  console.log(`Server started listening to port ${port}...`);
});

export { app };
