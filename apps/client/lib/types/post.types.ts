import type { User } from './user.types';

export type Post = {
  id: number;
  content: string;
  title: string;
  created_at: Date;
  slug: string;
  updated_at: Date;
  user: User;
};