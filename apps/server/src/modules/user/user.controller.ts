import type { Request, Response } from "express";

import { sendResponse } from "../../http/response/index.js";
import {
  createUser,
  deleteUser,
  findUserByUsername,
  getUser,
  listUsers,
  updateUser,
} from "./user.service.js";

export function handleListUsers(_req: Request, res: Response) {
  sendResponse({ res, statusCode: 200, message: "Users fetched", data: listUsers() });
}

export function handleGetUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return sendResponse({
      res,
      statusCode: 400,
      message: "id must be a number",
      data: { error: "id must be a number" },
    });
  }

  const user = getUser(id);

  if (!user) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "User not found",
      data: { error: "User not found" },
    });
  }

  sendResponse({ res, statusCode: 200, message: "User fetched", data: user });
}

export function handleCreateUser(req: Request, res: Response) {
  // username/email already validated by requireUserBody middleware
  const { username, email } = req.body as { username: string; email: string };

  // Usernames are unique (like Reddit) — this is business logic, so it
  // lives here where the service can answer "does this name exist?"
  if (findUserByUsername(username.trim())) {
    return sendResponse({
      res,
      statusCode: 409,
      message: "username already taken",
      data: { error: "username already taken" },
    });
  }

  const user = createUser({ username, email });

  sendResponse({ res, statusCode: 201, message: "User created", data: user });
}

export function handleUpdateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return sendResponse({
      res,
      statusCode: 400,
      message: "id must be a number",
      data: { error: "id must be a number" },
    });
  }

  if (!getUser(id)) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "User not found",
      data: { error: "User not found" },
    });
  }

  // username/email already validated by requireUserBody middleware
  const { username, email } = req.body as { username: string; email: string };

  // Uniqueness must survive updates too — but a user may keep their own name.
  const taken = findUserByUsername(username.trim());
  if (taken && taken.id !== id) {
    return sendResponse({
      res,
      statusCode: 409,
      message: "username already taken",
      data: { error: "username already taken" },
    });
  }

  const updated = updateUser(id, { username, email });

  if (!updated) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "User not found",
      data: { error: "User not found" },
    });
  }

  sendResponse({ res, statusCode: 200, message: "User updated", data: updated });
}

export function handleDeleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return sendResponse({
      res,
      statusCode: 400,
      message: "id must be a number",
      data: { error: "id must be a number" },
    });
  }

  const deleted = deleteUser(id);

  if (!deleted) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "User not found",
      data: { error: "User not found" },
    });
  }

  sendResponse({ res, statusCode: 204, message: "User deleted", data: null }); // Express strips the 204 body
}
