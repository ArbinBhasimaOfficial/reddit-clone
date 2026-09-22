import type { Request, Response } from "express";

import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
  type CreatePostInput,
} from "./post.service.js";

// :id is a string now (UUID-style), so there is nothing numeric to parse —
// we only normalize Express' param typing and let unknown ids fall through to 404.
function getIdParam(req: Request): string | null {
  const id = req.params.id;
  return typeof id === "string" && id !== "" ? id : null;
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
