import express, { Router, type Express } from "express";

// export function createServer() {
//   const app = express();
//   return app;
// }

// export function listen(app: Express) {
//   app.listen(3000, () => {
//     console.log(`Server is running on Port: ${3000}`);
//   });
// }

// export function registerRoutes(app: Express) {
//   app.use("/api/v1", v1Router);
// }

// OR

export class Server {
  public app: Express;
  private globalPrefix: string = "";

  constructor() {
    this.app = express(); // creates an express function.
    return this; // this represents the Server instance
  }

  startServer() {
    this.app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
    return this;
  }

  createGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix.replace(/^\/+|\/+$/g, "");
    this.app.use(`/${this.globalPrefix}`, (req, res, next) => {
      console.log(
        `Global prefix /${this.globalPrefix} applied to request: ${req.method} ${req.originalUrl}`,
      );
      next();
    });
    return this;
  }

  registerRoutes(prefix: string, router: Router) {
    const cleanPrefix = prefix.replace(/^\/+/, "");
    // Combine global prefix and route prefix
    const fullPath = this.globalPrefix
      ? `/${this.globalPrefix}/${cleanPrefix}`
      : `/${cleanPrefix}`;
    this.app.use(fullPath, router);
    return this;
  } // this helps to register multiple routes.

  someOtherFunc() {
    return this;
  }
}
