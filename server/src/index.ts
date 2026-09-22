import { json } from "express";

import { v1Router } from "./http/routes/v1/router.js";
import { Server } from "./http/server.js";

const server = new Server();

server
  .registerHealthCheckup()
  .useMiddleware(json()) // bodies must be parsed before any route reads them
  .createGlobalPrefix("api")
  .registerRoutes("v1", v1Router)
  .startServer(); // last: nothing listens until everything is registered
