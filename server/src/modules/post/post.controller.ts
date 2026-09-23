import type { Request, Response } from "express";

import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
  type CreatePostInput,
  type UpdatePostInput,
} from "./post.service.js";

// Not validation — validateId middleware already guarded the param; this only
// narrows Express' `string | string[] | undefined` for TypeScript.
function getIdParam(req: Request): string {
  return req.params.id as string;
}

// validate() middleware put zod's parsed output on req.validatedBody —
// each handler re-asserts the type matching the schema that ran.
function readCreateInput(req: Request): CreatePostInput {
  return req.validatedBody as CreatePostInput;
}

function readUpdateInput(req: Request): UpdatePostInput {
  return req.validatedBody as UpdatePostInput;
}

export function postIndexHandler(_req: Request, res: Response) {
  res.json(listPosts());
}

export function postShowHandler(req: Request, res: Response) {
  const id = getIdParam(req);
  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
}

export function postCreateHandler(req: Request, res: Response) {
  const post = createPost(readCreateInput(req));

  res.status(201).json(post);
}

export function postUpdateHandler(req: Request, res: Response) {
  const id = getIdParam(req);
  const post = updatePost(id, readUpdateInput(req));

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
}

export function postDeleteHandler(req: Request, res: Response) {
  const deleted = deletePost(getIdParam(req));

  if (!deleted) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(204).send(); // 204 No Content — deleted, nothing left to return
}
