import type { Request, Response } from "express";

import { sendResponse } from "../../http/response/index.js";
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
  sendResponse({ res, statusCode: 200, message: "Posts fetched", data: listPosts() });
}

export function postShowHandler(req: Request, res: Response) {
  const id = getIdParam(req);
  const post = getPost(id);

  if (!post) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "Post not found",
      data: { error: "Post not found" },
    });
  }

  sendResponse({ res, statusCode: 200, message: "Post fetched", data: post });
}

export function postCreateHandler(req: Request, res: Response) {
  const post = createPost(readCreateInput(req));

  sendResponse({ res, statusCode: 201, message: "Post created", data: post });
}

export function postUpdateHandler(req: Request, res: Response) {
  const id = getIdParam(req);
  const post = updatePost(id, readUpdateInput(req));

  if (!post) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "Post not found",
      data: { error: "Post not found" },
    });
  }

  sendResponse({ res, statusCode: 200, message: "Post updated", data: post });
}

export function postDeleteHandler(req: Request, res: Response) {
  const deleted = deletePost(getIdParam(req));

  if (!deleted) {
    return sendResponse({
      res,
      statusCode: 404,
      message: "Post not found",
      data: { error: "Post not found" },
    });
  }

  sendResponse({ res, statusCode: 204, message: "Post deleted", data: null }); // Express strips the 204 body
}
