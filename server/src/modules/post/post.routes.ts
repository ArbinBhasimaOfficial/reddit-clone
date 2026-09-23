import { Router } from "express";

import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postShowHandler,
  postUpdateHandler,
  validatePostBody,
} from "./post.controller.js";

export function createPostRouter(): Router {
  const router = Router();

  router.get("/", postIndexHandler);
  router.get("/:id", postShowHandler);
  router.post("/", validatePostBody, postCreateHandler);
  router.put("/:id", validatePostBody, postUpdateHandler);
  router.delete("/:id", postDeleteHandler);

  return router;
}
