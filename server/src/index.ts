import {createServer, listen, registerRoutes} from "./http/server.js";

const app = createServer();
listen(app);
registerRoutes(app);