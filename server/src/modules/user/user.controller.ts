import type { Request, Response } from "express";

import {
  createUser,
  deleteUser,
  findUserByUsername,
  getUser,
  listUsers,
  updateUser,
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

export function handleUpdateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  if (!getUser(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  // username/email already validated by requireUserBody middleware
  const { username, email } = req.body as { username: string; email: string };

  // Uniqueness must survive updates too — but a user may keep their own name.
  const taken = findUserByUsername(username.trim());
  if (taken && taken.id !== id) {
    return res.status(409).json({ error: "username already taken" });
  }

  const updated = updateUser(id, { username, email });

  if (!updated) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(updated);
}

export function handleDeleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const deleted = deleteUser(id);

  if (!deleted) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(204).send(); // 204 No Content — deleted, nothing left to return
}
