export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

export interface CreateUserInput {
  username: string;
  email: string;
}

// In-memory store for now — swap for a real database later.
const users: User[] = [];
let nextId = 1;

export function createUser(input: CreateUserInput): User {
  const user: User = {
    id: nextId++,
    username: input.username.trim(),
    email: input.email.trim(),
    createdAt: new Date(),
  };

  users.unshift(user); // newest first
  return user;
}

export function listUsers(): User[] {
  return users;
}

export function getUser(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

export function findUserByUsername(username: string): User | undefined {
  return users.find((user) => user.username === username);
}
