import type { Request, Response } from "express";

import {
  createUser,
  findUserByUsername,
  getUser,
  listUsers,
} from "./user.service.js";

export function handleListUsers(_req: Request, res: Response) {
  res.json(listUsers());
}

export function handleGetUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const user = getUser(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
}

export function handleCreateUser(req: Request, res: Response) {
  // username/email already validated by requireUserBody middleware
  const { username, email } = req.body as { username: string; email: string };

  // Usernames are unique (like Reddit) — this is business logic, so it
  // lives here where the service can answer "does this name exist?"
  if (findUserByUsername(username.trim())) {
    return res.status(409).json({ error: "username already taken" });
  }

  const user = createUser({ username, email });

  res.status(201).json(user);
}
