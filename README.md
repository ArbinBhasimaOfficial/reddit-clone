# Reddit Clone API

A modular, scalable Express + TypeScript RESTful API for a Reddit Clone, developed by **Arbin Bhasima**. This project utilizes Object-Oriented Programming (OOP) concepts with function chaining for clean and flexible server/route configuration.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Package Manager:** `pnpm`
* **Language:** TypeScript (`tsc`)
* **Framework:** Express.js (`express`, `@types/express`)

---

## 📁 Project Structure & Route Setup

The project follows a versioned HTTP routing architecture designed around OOP and fluent function chaining.

```text
.
├── client/                     # Frontend (not yet implemented)
├── server/
│   ├── src/
│   │   ├── http/
│   │   │   ├── server.ts       # Server class (OOP chaining)
│   │   │   └── routes/
│   │   │       ├── v1/
│   │   │       │   └── router.ts   # v1Router + mounts module routers (post, user)
│   │   │       └── v2/
│   │   │           └── router.ts   # v2Router (exists, not mounted yet)
│   │   ├── modules/
│   │   │   ├── post/            # Post module (routes/controller/service)
│   │   │   └── user/            # User module (routes/controller/service)
│   │   └── index.ts            # Server initialization
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Features & Current Endpoints

- **OOP Function Chaining:** Server configuration and route registration leverage method chaining for clean readability and setup.
- **API Versioning:** Versioned routes mounted under a global `api` prefix — `/api/v1` is handled by `v1Router`.
- **Health Monitoring:** Pre-configured system health endpoints.
- **Module Architecture:** Feature modules (posts, users) split into `routes → controller → service` layers, composed into their version router.

### Implemented Routes

| Method | Endpoint | Description | Handled by |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Redirects to `/health` | `server.ts` |
| `GET` | `/health` | Application health check → `OK` | `server.ts` |
| `GET` | `/api/v1` | Version 1 welcome page | `v1Router` (`src/http/routes/v1/router.ts`) |
| `GET` | `/api/v1/post` | List all posts (newest first) | post module (`src/modules/post/`) |
| `GET` | `/api/v1/post/:id` | Get a single post by its ID | post module (`src/modules/post/`) |
| `POST` | `/api/v1/post` | Create a post — `title` and `body` required → `201` | post module (`src/modules/post/`) |
| `GET` | `/api/v1/user` | List all users (newest first) | user module (`src/modules/user/`) |
| `GET` | `/api/v1/user/:id` | Get a single user by their ID | user module (`src/modules/user/`) |
| `POST` | `/api/v1/user` | Create a user — `username` and `email` required, username must be unique → `201` | user module (`src/modules/user/`) |

**Error responses:** `400 {"error": ...}` for missing fields or a non-numeric `:id`, `404 {"error": ...}` for an unknown post/user ID, `409 {"error": "username already taken"}` for a duplicate username.

> **Note:** posts are stored in memory — restarting the server clears them.

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have **Node.js** and **pnpm** installed on your system.

```bash
# Verify pnpm installation
pnpm --version
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arbinbhasima/reddit-clone.git
   cd reddit-clone
   ```

2. **Install dependencies:**
   ```bash
   cd server
   pnpm install
   ```

### Scripts

All scripts run from the `server/` directory:

* **Build the TypeScript code:**
  ```bash
  pnpm build
  ```

* **Start the server (Production):**
  ```bash
  pnpm start
  ```

* **Start the development server:**
  ```bash
  pnpm dev
  ```

---

## 💻 Architecture Example (OOP Chaining)

Routes and server modules are structured using class-based wrapper methods that support fluent method chaining:

```typescript
// Actual usage from src/index.ts
const server = new Server();

server
  .registerHealthCheckup()
  .useMiddleware(json())     // parse JSON request bodies
  .createGlobalPrefix("api") // all routes live under /api
  .registerRoutes("v1", v1Router)
  .startServer();            // always last: listen after everything is registered
```

---

## 👤 Author

**Arbin Bhasima**
* GitHub: [@arbinbhasima](https://github.com/arbinbhasima)