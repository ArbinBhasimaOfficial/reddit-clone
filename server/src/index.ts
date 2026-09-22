import {createServer, listen} from "./http/server.js";

const app = createServer();

listen(app)