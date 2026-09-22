import { Router } from "express";
import type { NextFunction, Request, Response } from "express";

import {
  handleCreatePost,
  handleGetPost,
  handleListPosts,
} from "./post.controller.js";

// Middleware in the chain: validates, then passes control on.
// To reject, respond here and do NOT call next().
function requirePostBody(req: Request, res: Response, next: NextFunction) {
  const { title, body } = (req.body ?? {}) as {
    title?: unknown;
    body?: unknown;
  };

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  if (typeof body !== "string" || body.trim() === "") {
    return res.status(400).json({ error: "body is required" });
  }

  next();
}

export function createPostRouter(): Router {
  const router = Router();

  router.get("/", handleListPosts);
  router.get("/:id", handleGetPost);
  router.post("/", requirePostBody, handleCreatePost);

  return router;
}
