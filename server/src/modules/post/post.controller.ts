import type { Request, Response } from "express";

import { createPost, getPost, listPosts } from "./post.service.js";

export function handleListPosts(_req: Request, res: Response) {
  res.json(listPosts());
}

export function handleGetPost(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
}

export function handleCreatePost(req: Request, res: Response) {
  // title/body already validated by requirePostBody middleware
  const { title, body } = req.body as { title: string; body: string };

  const post = createPost({ title, body });

  res.status(201).json(post);
}
