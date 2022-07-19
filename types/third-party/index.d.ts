
declare module 'express-cache-middleware' {
    export default class ExpressCacheMiddleware {
      constructor(cacheManager: cacheManager.Cache, options: unknown = {});
      attach(app: Express);
    }
}

