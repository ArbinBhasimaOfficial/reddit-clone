import express, { Router, type Express, type NextFunction, type Request, type RequestHandler, type Response } from "express";

export class Server {
  public app: Express;
  private globalPrefix: string = "";

  constructor() {
    this.app = express();
    return this;
  }

  // Attach any middleware to the chain (e.g. json body parsing, cors, ...)
  useMiddleware(...handlers: RequestHandler[]) {
    this.app.use(...handlers);
    return this;
  }

  registerHealthCheckup() {
    this.app.get("/", (_req, res) => {
      res.redirect("/health");
    });
    this.app.use("/health", (_req, res) => {
      res.status(200).send("OK");
    });
    return this;
  }

  createGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix.replace(/^\/+|\/+$/g, "");
    this.app.use(`/${this.globalPrefix}`, (req, _res, next) => {
      console.log(`[${this.globalPrefix}] ${req.method} ${req.originalUrl}`);
      next();
    });
    return this;
  }

  // Prefix lives here, sub-paths live inside each router.
  registerRoutes(prefix: string, router: Router) {
    const cleanPrefix = prefix.replace(/^\/+/, "");
    const fullPath = this.globalPrefix
      ? `/${this.globalPrefix}/${cleanPrefix}`
      : `/${cleanPrefix}`;
    this.app.use(fullPath, router);
    return this;
  }

  // The 4-arg (err, req, res, next) signature is what tells Express
  // "this is an error middleware" — it only fires when some earlier
  // middleware calls next(err) (or a handler throws).
  registerErrorHandler() {
    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err);
      // Body-parser errors carry their own status (malformed JSON → 400).
      const status = typeof err?.status === "number" ? err.status : 500;
      return res.status(status).json({
        error: status >= 500 ? "Internal Server Error" : err.message,
      });
    });
    return this;
  }


  // Always last in the chain: listen only after everything is registered.
  startServer(port: number = 3000) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    return this;
  }
}
