import type { NextFunction, Request, Response } from "express";

import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
  type CreatePostInput,
} from "./post.service.js";
import { postCreateSchema } from "./schemas/create.schema.js";

// :id is a string now (UUID-style), so there is nothing numeric to parse —
// we only normalize Express' param typing and let unknown ids fall through to 404.
function getIdParam(req: Request): string | null {
  const id = req.params.id;
  return typeof id === "string" && id !== "" ? id : null;
}

// Validation middleware in the chain: runs the body through postCreateSchema,
// then passes control on. To reject, respond here and do NOT call next().
export function validatePostBody(req: Request, res: Response, next: NextFunction) {
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

// validatePostBody already ran the body through postCreateSchema,
// so the shape is guaranteed — just re-assert it for TypeScript.
function readPostInput(req: Request): CreatePostInput {
  return req.body as CreatePostInput;
}

export function postIndexHandler(_req: Request, res: Response) {
  res.json(listPosts());
}

export function postShowHandler(req: Request, res: Response) {
  const id = getIdParam(req);

  if (id === null) {
    return res.status(400).json({ error: "id is required" });
  }

  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
}

export function postCreateHandler(req: Request, res: Response) {
  const post = createPost(readPostInput(req));

  res.status(201).json(post);
}

export function postUpdateHandler(req: Request, res: Response) {
  const id = getIdParam(req);

  if (id === null) {
    return res.status(400).json({ error: "id is required" });
  }

  const post = updatePost(id, readPostInput(req));

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
}

export function postDeleteHandler(req: Request, res: Response) {
  const id = getIdParam(req);

  if (id === null) {
    return res.status(400).json({ error: "id is required" });
  }

  const deleted = deletePost(id);

  if (!deleted) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(204).send(); // 204 No Content — deleted, nothing left to return
}
