// import { createServer, listen, registerRoutes } from "./http/server.js";

// const app = createServer();
// registerRoutes(app);
// listen(app);

// OR

import { v1Router } from "./http/routes/v1/router.js";
import { v2Router } from "./http/routes/v2/router.js";
import { Server } from "./http/server.js";

const server = new Server();
server
  .startServer()
  .registerRoutes("v1", v1Router)
  .registerRoutes("v2", v2Router);
