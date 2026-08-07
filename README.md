# TaskFlow

A modern, full-stack task management application built with the MERN stack. Features a clean, responsive UI with dark/light mode, Redux state management, comprehensive CRUD operations, and Docker Compose orchestration.

## Features

- **Authentication** — JWT-based register/login with persistent sessions
- **Task Management** — Full CRUD with status, priority, category, tags, and favorites
- **Dashboard** — Visual stats with pie/bar charts (Recharts)
- **Search & Filter** — Text search, multi-criteria filtering, sorting, and pagination
- **Dual View** — Grid and list views for tasks
- **Dark/Light Mode** — Persistent theme preference with system detection
- **Responsive** — Mobile, tablet, and desktop optimized
- **Export** — Tasks to CSV download
- **Profile** — Avatar upload, profile edit, and password change
- **Dockerized** — Development and production Docker Compose setups (no Nginx required)

## Tech Stack

### Frontend

- React 19 + Vite 8
- Redux Toolkit (state management)
- React Router v7 (routing)
- React Hook Form (form validation)
- Tailwind CSS v4 (styling with custom theme)
- Recharts (dashboard charts)
- Axios (HTTP client with interceptors)
- React Icons (HeroIcons v2)
- clsx + tailwind-merge (class utilities)

### Backend

- Node.js + Express 4 (REST API)
- MongoDB 6.0 + Mongoose 8 (database)
- JWT (stateless authentication with httpOnly cookies)
- bcrypt (password hashing)
- express-validator (input validation)
- Multer (file uploads — avatar)
- cookie-parser, morgan, cors

### DevOps

- Docker Compose (development and production configs)
- Nodemon (hot reload in development)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose (recommended)
- MongoDB 6.0+ (for manual setup without Docker)

### Quick Start (Docker — Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd taskflow

# Start all services (MongoDB, API, Frontend)
docker compose -f docker-compose.dev.yml up -d

# Seed the database with demo data
docker compose -f docker-compose.dev.yml exec api npm run seed

# Open in browser
http://localhost:5173   # Vite dev server (proxies /api and /uploads to the API)
```

### Demo Credentials

| Email              | Password  |
| ------------------ | --------- |
| `demo@taskflow.com` | `Demo1234` |

### Manual Setup (Without Docker)

**1. Start MongoDB**

Make sure MongoDB is running locally on port 27017.

**2. Backend**

```bash
cd server
npm install
cp .env .env.local    # Edit .env.local with your MongoDB URI
npm run seed          # Seed demo data
npm run dev           # Start on http://localhost:5000
```

**3. Frontend**

```bash
cd client
npm install
npm run dev           # Start on http://localhost:5173
```

### Production Setup

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Access the app directly at `http://localhost`. The frontend image serves the built React app with a lightweight Node.js static server and proxies `/api` and `/uploads` to the API container — no Nginx needed.

## Project Structure

```
taskflow/
├── docker-compose.dev.yml        # Development: Mongo, API, Frontend
├── docker-compose.prod.yml       # Production:  Mongo, API, Frontend
├── client/                       # Vite + React frontend
│   ├── Dockerfile.dev            # Development container
│   ├── Dockerfile.prod           # Production container (multi-stage, Node static server)
│   ├── server.js                 # Production static file server + API proxy
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # Button, Input, Select, Badge, Card, Modal, etc.
│   │   │   ├── layout/           # Navbar, Sidebar, MainLayout, ProtectedRoute
│   │   │   └── tasks/            # TaskCard, TaskFilters
│   │   ├── pages/                # Login, Register, Dashboard, Tasks, TaskDetail, TaskForm, Profile
│   │   ├── store/slices/         # Redux slices: auth, tasks, ui
│   │   ├── services/             # API service layer (axios)
│   │   ├── hooks/                # useLocalStorage, useDebounce
│   │   └── utils/                # Helpers, color maps, CSV export
│   └── .env                      # VITE_API_URL=http://localhost:5000/api
├── server/                       # Express API server
│   ├── Dockerfile.dev            # Development container
│   ├── Dockerfile.prod           # Production container
│   ├── src/
│   │   ├── config/               # config.js, db.js
│   │   ├── controllers/          # authController, taskController
│   │   ├── services/             # authService, taskService (business logic)
│   │   ├── models/               # User, Task (Mongoose schemas)
│   │   ├── routes/               # authRoutes, taskRoutes, userRoutes
│   │   ├── middleware/            # auth, errorHandler, validate, upload
│   │   ├── validators/           # authValidator, taskValidator, userValidator
│   │   └── utils/                # ApiError, ApiResponse, helpers, logger
│   ├── seeds/                    # seed.js (demo user + 20 sample tasks)
│   ├── uploads/                  # Avatar file uploads
│   └── .env                      # Environment variables
└── README.md
```

## API Reference

### Response Format

```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": {
    "tasks": [],
    "pagination": { "page": 1, "limit": 10, "total": 20, "pages": 2 }
  },
  "statusCode": 200
}
```

### Error Format

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email" }
  ]
}
```

### Authentication

All `/api/users` and `/api/tasks` routes require a valid JWT token sent via `Authorization: Bearer <token>` header or httpOnly cookie.

### Auth Endpoints

| Method | Endpoint            | Body                                      | Description       |
| ------ | ------------------- | ----------------------------------------- | ----------------- |
| POST   | `/api/auth/register` | `{ name, email, password }`               | Register new user |
| POST   | `/api/auth/login`    | `{ email, password }`                     | Login             |
| POST   | `/api/auth/logout`   | —                                         | Logout            |

### User Endpoints (authenticated)

| Method | Endpoint             | Body / Params                              | Description       |
| ------ | -------------------- | ------------------------------------------ | ----------------- |
| GET    | `/api/users/profile`  | —                                          | Get profile       |
| PUT    | `/api/users/profile`  | `{ name, email }`                          | Update profile    |
| PUT    | `/api/users/password` | `{ currentPassword, newPassword }`         | Change password   |
| PUT    | `/api/users/avatar`   | FormData (`avatar` file, max 5MB)          | Upload avatar     |

### Task Endpoints (authenticated)

| Method | Endpoint                 | Body / Query                               | Description       |
| ------ | ------------------------ | ------------------------------------------ | ----------------- |
| GET    | `/api/tasks`              | Query params (see below)                   | List tasks        |
| GET    | `/api/tasks/dashboard`    | —                                          | Dashboard stats   |
| GET    | `/api/tasks/:id`          | —                                          | Get single task   |
| POST   | `/api/tasks`              | `{ title, description, status, priority, dueDate, category, tags, isFavorite }` | Create task       |
| PUT    | `/api/tasks/:id`          | Any task fields to update                  | Update task       |
| DELETE | `/api/tasks/:id`          | —                                          | Delete task       |
| POST   | `/api/tasks/:id/duplicate`| —                                          | Duplicate task    |

### Query Parameters — GET /api/tasks

| Param      | Values                                              | Default      |
| ---------- | --------------------------------------------------- | ------------ |
| `page`     | Positive integer                                    | `1`          |
| `limit`    | 1–100                                               | `10`         |
| `status`   | `pending`, `in-progress`, `completed`               | —            |
| `priority` | `low`, `medium`, `high`                             | —            |
| `category` | `work`, `personal`, `study`, `health`, `shopping`, `finance` | —            |
| `search`   | Free text (searches title, description, tags)       | —            |
| `sortBy`   | `createdAt`, `updatedAt`, `dueDate`, `priority`, `title` | `createdAt` |
| `sortOrder`| `asc`, `desc`                                       | `desc`       |

## Environment Variables

### `server/.env`

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=taskflow_jwt_secret_key_change_in_production_2024
JWT_EXPIRE=7d
UPLOAD_DIR=uploads
```

> **Docker:** When running in Docker Compose, the API container uses `mongodb://mongo:27017/taskflow` (set automatically in the `.env` file used by Docker).

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Architecture

### Backend (MVC + Service Layer)

```
Request → Route → Validator → Controller → Service → Model → Response
```

- **Routes** define endpoints and apply middleware chain
- **Validators** use `express-validator` for input validation
- **Controllers** handle request/response, delegate to services
- **Services** contain business logic and database queries
- **Models** define Mongoose schemas with indexes and hooks

### Frontend (Redux Toolkit + Service Layer)

```
Component → Dispatch(Thunk) → Service → Axios → API
                                        ↓
                              Redux Store ← Response
                                        ↓
                              Component Re-render
```

- **Redux slices** manage auth, tasks, and UI state
- **Async thunks** handle API calls with loading/error states
- **Service layer** abstracts Axios with interceptors (auth token injection, 401 redirect)

## Features in Detail

### Task Management
- Create tasks with title, description, status, priority, due date, category, and tags
- Toggle task completion status
- Favorite/unfavorite tasks
- Duplicate tasks (creates a copy with "(Copy)" suffix)
- Bulk search and filter by status, priority, category
- Sort by date, priority, or title
- Pagination with configurable page size
- Grid and list view modes

### Dashboard
- Total task count, completed, pending, in-progress, overdue, due today
- Category breakdown (pie chart)
- Priority distribution (bar chart)
- Recent tasks list (last 5)

### Profile
- Upload/change avatar (JPEG, PNG, GIF, WebP, max 5MB)
- Update name and email
- Change password with current password verification

## License

MIT
