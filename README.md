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
│   │   │       │   └── router.ts   # Configures v1Router
│   │   │       └── v2/
│   │   │           └── router.ts   # Configures v2Router
│   │   ├── modules/
│   │   │   └── post/           # Post module (routes/controller/service)
│   │   └── index.ts            # Server initialization
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Features & Current Endpoints

- **OOP Function Chaining:** Server configuration and route registration leverage method chaining for clean readability and setup.
- **API Versioning:** Isolated version routes (`/v1` and `/v2`) managed via `v1Router` and `v2Router`.
- **Health Monitoring:** Pre-configured system health endpoints.

### Implemented Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root endpoint status |
| `GET` | `/health` | Application health check |
| `USE` | `/api/v1` | Handled by `v1Router` (`src/http/routes/v1/router.ts`) |
| `USE` | `/api/v2` | Handled by `v2Router` (`src/http/routes/v2/router.ts`) |

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
// Example conceptual usage of OOP chaining pattern
new ServerApp()
  .useMiddleware(...)
  .registerRoutes('/api/v1', v1Router)
  .registerRoutes('/api/v2', v2Router)
  .listen(PORT);
```

---

## 👤 Author

**Arbin Bhasima**
* GitHub: [@arbinbhasima](https://github.com/arbinbhasima)