import type { PostCreateInput } from "./schemas/create.schema.js";
import type { PostUpdateInput } from "./schemas/update.schema.js";

// The schema defines what a client may send; the stored Post is that
// payload plus the id the server generates.
export type Post = PostCreateInput & { id: string };

// Create payloads are the full create shape; update payloads are the
// partial update shape (any subset of fields).
export type CreatePostInput = PostCreateInput;
export type UpdatePostInput = PostUpdateInput;

// In-memory store for now — swap for a real database later.
const posts: Post[] = [];

export function createPost(input: CreatePostInput): Post {
  const post: Post = {
    id: crypto.randomUUID(), // string id, like a database would give you
    title: input.title.trim(),
    content: input.content.trim(),
    images: input.images,
    createdBy: input.createdBy,
  };

  posts.unshift(post); // newest first
  return post;
}

export function listPosts(): Post[] {
  return posts;
}

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

// Partial update: PUT sends any subset (postUpdateSchema — every field
// optional) — only the fields present in the payload change.
export function updatePost(id: string, input: UpdatePostInput): Post | undefined {
  const post = getPost(id);

  if (!post) {
    return undefined;
  }

  if (input.title !== undefined) {
    post.title = input.title.trim();
  }
  if (input.content !== undefined) {
    post.content = input.content.trim();
  }
  if (input.images !== undefined) {
    post.images = input.images;
  }
  if (input.createdBy !== undefined) {
    post.createdBy = input.createdBy;
  }
  return post;
}

export function deletePost(id: string): boolean {
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return false;
  }

  posts.splice(index, 1);
  return true;
}
