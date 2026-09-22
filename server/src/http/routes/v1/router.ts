import { Router } from "express";
import { createPostRouter } from "../../../modules/post/post.routes.js";

export const v1Router = Router();

// Terminal handler: ends the chain by responding.
v1Router.get("/", (_req, res) => {
  res.send("Version One API Page.");
});

v1Router.use("/post", createPostRouter())