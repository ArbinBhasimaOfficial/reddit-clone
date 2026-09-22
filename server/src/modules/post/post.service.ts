import type { PostCreateInput } from "./schemas/create.schema.js";

// The schema defines what a client may send; the stored Post is that
// payload plus the id the server generates.
export type Post = PostCreateInput & { id: string };

// Create and update payloads are exactly what postCreateSchema validates.
export type CreatePostInput = PostCreateInput;

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

// Full replace: PUT sends a complete post (validatePostBody enforces the shape).
export function updatePost(id: string, input: CreatePostInput): Post | undefined {
  const post = getPost(id);

  if (!post) {
    return undefined;
  }

  post.title = input.title.trim();
  post.content = input.content.trim();
  post.images = input.images;
  post.createdBy = input.createdBy;
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
