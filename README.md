# Reddit Clone API

A modular, scalable Express + TypeScript RESTful API for a Reddit Clone, developed by **Arbin Bhasima**. This project utilizes Object-Oriented Programming (OOP) concepts with function chaining for clean and flexible server/route configuration.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Package Manager:** `pnpm`
* **Language:** TypeScript (`tsc`)
* **Framework:** Express.js (`express`, `@types/express`)
* **Validation:** `zod` (post create/update schemas → shared `validate()` middleware)

---

## 📁 Project Structure & Route Setup

The project follows a versioned HTTP routing architecture designed around OOP and fluent function chaining.

```text
.
├── client/                     # Frontend (not yet implemented)
├── Reddit-clone-api-docs/      # Bruno requests for all 13 endpoints (OpenCollection YAML)
├── server/
│   ├── src/
│   │   ├── http/
│   │   │   ├── server.ts           # Server class (OOP chaining)
│   │   │   ├── error/
│   │   │   │   ├── handler.ts      # ErrorHandler — Zod / Custom / generic dispatch
│   │   │   │   └── customError.ts  # CustomError (statusCode + data)
│   │   │   ├── response/
│   │   │   │   └── index.ts        # sendResponse — shared controller replies
│   │   │   └── routes/
│   │   │       ├── v1/
│   │   │       │   └── router.ts   # v1Router + mounts module routers (post, user)
│   │   │       └── v2/
│   │   │           └── router.ts   # v2Router (exists, not mounted yet)
│   │   ├── middleware/
│   │   │   └── validation.middleware.ts  # validate(zodSchema) + validateId
│   │   ├── @types/express/
│   │   │   └── index.d.ts          # validatedBody on Express.Request
│   │   ├── modules/
│   │   │   ├── post/               # Post module (schemas/routes/controller/service)
│   │   │   └── user/               # User module (routes/controller/service)
│   │   └── index.ts                # Server initialization
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Features & Current Endpoints

- **OOP Function Chaining:** Server configuration and route registration leverage method chaining for clean readability and setup.
- **API Versioning:** Versioned routes mounted under a global `api` prefix — `/api/v1` is handled by `v1Router`.
- **Health Monitoring:** Pre-configured system health endpoints.
- **Module Architecture:** Feature modules (posts, users) split into `routes → controller → service` layers, composed into their version router. Post payloads are validated by zod against `post/schemas/create.schema.ts` (create — all fields required) and `post/schemas/update.schema.ts` (PUT — partial update) — the sources of truth the service types derive from.

### Implemented Routes

| Method | Endpoint | Description | Handled by |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Redirects to `/health` | `server.ts` |
| `GET` | `/health` | Application health check → `OK` | `server.ts` |
| `GET` | `/api/v1` | Version 1 welcome page | `v1Router` (`src/http/routes/v1/router.ts`) |
| `GET` | `/api/v1/post` | List all posts (newest first) | post module (`src/modules/post/`) |
| `GET` | `/api/v1/post/:id` | Get a post by its UUID → `404` if unknown | post module (`src/modules/post/`) |
| `POST` | `/api/v1/post` | Create a post — all of `title`, `content`, `images`, `createdBy` required → `201` | post module (`src/modules/post/`) |
| `PUT` | `/api/v1/post/:id` | Partial update — send any subset of `title`/`content`/`images`/`createdBy`; omitted fields keep their value → `200`, `404` if unknown | post module (`src/modules/post/`) |
| `DELETE` | `/api/v1/post/:id` | Delete a post → `204`, `404` if unknown | post module (`src/modules/post/`) |
| `GET` | `/api/v1/user` | List all users (newest first) | user module (`src/modules/user/`) |
| `GET` | `/api/v1/user/:id` | Get a single user by their numeric ID | user module (`src/modules/user/`) |
| `POST` | `/api/v1/user` | Create a user — `username` and `email` required, username must be unique → `201` | user module (`src/modules/user/`) |
| `PUT` | `/api/v1/user/:id` | Fully replace `username`/`email` (same body as `POST`) → `200`, `404` if unknown, `409` if new username is taken | user module (`src/modules/user/`) |
| `DELETE` | `/api/v1/user/:id` | Delete a user → `204`, `404` if unknown | user module (`src/modules/user/`) |

**Example `POST /api/v1/post` body** (shape defined by zod in `src/modules/post/schemas/create.schema.ts`):

```json
{
  "title": "Hello",
  "content": "My first post",
  "images": ["https://example.com/img.png"],
  "createdBy": { "id": "u-1", "name": "arbin" }
}
```

All four fields are required — `images` must be an array of valid URLs (`[]` is fine if there are none). Post `id` is generated server-side as a UUID, and unknown extra fields are stripped from the stored result.

**Example `PUT /api/v1/post/:id` body** (shape defined by zod in `src/modules/post/schemas/update.schema.ts`):

```json
{
  "title": "New title only"
}
```

Every field is optional — send any subset and only those fields change; omitted fields keep their current value (`{}` is a no-op that still returns `200`). Provided fields are type-checked like create: `images` entries must be valid URLs, and `createdBy` needs both `id` and `name` when present.

**Error responses:** `400 {"error": ...}` for invalid request bodies (user routes also return `400 "id must be a number"` — post ids are UUID strings, so any unknown post id is simply `404`), `404 {"error": ...}` for an unknown post/user ID, `409 {"error": "username already taken"}` for a duplicate username on create **or update** (keeping your own username is allowed). A global error handler (`ErrorHandler` in `server/src/http/error/handler.ts`, registered via `registerErrorHandler()` right before `startServer()`) catches anything thrown or passed to `next(err)` and replies with a `{message, data, status}` envelope: a thrown `CustomError` (`server/src/http/error/customError.ts`) → its own `statusCode`, `message`, and `data`; client errors keep their own status (malformed JSON → `400` with the parse error in `message`), a thrown `ZodError` → `422` with `z.treeifyError` output in `data`, and anything else → `500 {"message": "Internal server error", "data": null, "status": 500}`. Route-level validation middleware still replies `400 {"error": ...}` directly.

> **Note:** posts and users are stored in memory — restarting the server clears them.

---

## 🧪 API Testing (Bruno)

Requests are documented in [`Reddit-clone-api-docs/`](Reddit-clone-api-docs/) — an OpenCollection YAML collection containing ready-made requests for all 13 endpoints, grouped into `system/`, `posts/`, and `users/` folders.

1. Start the server first: `cd server && pnpm dev` → base URL `http://localhost:3000`
2. In Bruno, open/import the `Reddit-clone-api-docs` folder as a collection
3. Any `POST`/`PUT` must send header `Content-Type: application/json`

**Before testing `GET`/`PUT`/`DELETE`:**
- Run `POST /api/v1/post` first and reuse the returned UUID in `/api/v1/post/:id` (users are numeric ids: `1`, `2`, …)
- Data is in-memory — every server restart or watch-reload wipes it, so re-create your records before testing

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
  .registerErrorHandler()    // after routes: catch thrown / next(err) errors
  .startServer();            // always last: listen after everything is registered
```

---

## 👤 Author

**Arbin Bhasima**
* GitHub: [@arbinbhasima](https://github.com/arbinbhasima)