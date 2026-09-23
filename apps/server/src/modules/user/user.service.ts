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

// Full replace: PUT sends username + email; id and createdAt are preserved.
export function updateUser(id: number, input: CreateUserInput): User | undefined {
  const user = getUser(id);

  if (!user) {
    return undefined;
  }

  user.username = input.username.trim();
  user.email = input.email.trim();
  return user;
}

export function deleteUser(id: number): boolean {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
}
