import { Router } from "express";
import type { NextFunction, Request, Response } from "express";

import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUser,
  handleListUsers,
  handleUpdateUser,
} from "./user.controller.js";

// Middleware in the chain: validates, then passes control on.
// To reject, respond here and do NOT call next().
function requireUserBody(req: Request, res: Response, next: NextFunction) {
  const { username, email } = (req.body ?? {}) as {
    username?: unknown;
    email?: unknown;
  };

  if (typeof username !== "string" || username.trim() === "") {
    return res.status(400).json({ error: "username is required" });
  }
  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "email is required" });
  }

  next();
}

export function createUserRouter(): Router {
  const router = Router();

  router.get("/", handleListUsers);
  router.get("/:id", handleGetUser);
  router.post("/", requireUserBody, handleCreateUser);
  router.put("/:id", requireUserBody, handleUpdateUser);
  router.delete("/:id", handleDeleteUser);

  return router;
}
