import { Router } from "express";
import type { NextFunction, Request, Response } from "express";

import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postShowHandler,
  postUpdateHandler,
} from "./post.controller.js";
import { postCreateSchema } from "./schemas/create.schema.js";

// Middleware in the chain: validates the body with zod (postCreateSchema),
// then passes control on. To reject, respond here and do NOT call next().
function validatePostBody(req: Request, res: Response, next: NextFunction) {
  const result = postCreateSchema.safeParse(req.body);

  if (!result.success) {
    // One readable string, e.g. "content: Content is required; images.0: Invalid url ..."
    const message = result.error.issues
      .map((issue) =>
        issue.path.length > 0
          ? `${issue.path.join(".")}: ${issue.message}`
          : issue.message,
      )
      .join("; ");

    return res.status(400).json({ error: message });
  }

  req.body = result.data; // replace with zod's output: known keys only, correct types
  next();
}

export function createPostRouter(): Router {
  const router = Router();

  router.get("/", postIndexHandler);
  router.get("/:id", postShowHandler);
  router.post("/", validatePostBody, postCreateHandler);
  router.put("/:id", validatePostBody, postUpdateHandler);
  router.delete("/:id", postDeleteHandler);

  return router;
}
