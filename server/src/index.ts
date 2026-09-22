import { createServer, listen, registerRoutes } from "./http/server.js";

const app = createServer();
registerRoutes(app);
listen(app);
