export interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

export interface CreatePostInput {
  title: string;
  body: string;
}

// In-memory store for now — swap for a real database later.
const posts: Post[] = [];
let nextId = 1;

export function createPost(input: CreatePostInput): Post {
  const post: Post = {
    id: nextId++,
    title: input.title.trim(),
    body: input.body.trim(),
    createdAt: new Date(),
  };

  posts.unshift(post); // newest first
  return post;
}

export function listPosts(): Post[] {
  return posts;
}

export function getPost(id: number): Post | undefined {
  return posts.find((post) => post.id === id);
}
