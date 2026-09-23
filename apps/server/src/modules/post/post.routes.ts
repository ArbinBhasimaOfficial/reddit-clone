import { Router } from "express";

import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postShowHandler,
  postUpdateHandler,
} from "./post.controller.js";
import { validate, validateId } from "../../middleware/validation.middleware.js";
import { postCreateSchema } from "./schemas/create.schema.js";
import { postUpdateSchema } from "./schemas/update.schema.js";

// One schema run per request: create requires every field,
// update accepts any subset (postUpdateSchema fields are all optional).
const validatePostCreate = validate(postCreateSchema);
const validatePostUpdate = validate(postUpdateSchema);

export function createPostRouter(): Router {
  const router = Router();

  router.get("/", postIndexHandler);
  router.get("/:id", validateId, postShowHandler);
  router.post("/", validatePostCreate, postCreateHandler);
  router.put("/:id", validateId, validatePostUpdate, postUpdateHandler);
  router.delete("/:id", validateId, postDeleteHandler);

  return router;
}
