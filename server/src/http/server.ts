import express, { Router, type Express } from "express";
import { v1Router } from "./routes/v1/router.js";

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

    constructor() {
        this.app = express();
        return this;
    }

    startServer() {
        this.app.listen(3000, () => {
            console.log(`Server is running on port ${3000}`)
        });
        return this;
    }

    registerRoutes(prefix: string, router: Router) {
        this.app.use(`/api/${prefix}`, router);
        return this;
    }

    someOtherFunc() {
        this.app;
        return this;
    }
}