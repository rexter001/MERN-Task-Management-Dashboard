# TaskFlow — MERN Task Management Dashboard

A production-ready full-stack task management application built with **MongoDB, Express, React, and Node.js**.

![TaskFlow Dashboard](https://via.placeholder.com/900x500/3b82f6/ffffff?text=TaskFlow+Dashboard)

---

## Features

- **JWT Authentication** — Register, login, protected routes, persistent sessions
- **Full Task CRUD** — Create, read, update, delete tasks
- **Smart Filtering** — Search by keyword, filter by status and priority
- **Dashboard Stats** — At-a-glance view of total, completed, pending, and high-priority tasks
- **One-click Complete** — Toggle task status directly from the card
- **Overdue Detection** — Past-due dates are highlighted automatically
- **Responsive UI** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| Auth | JWT + bcryptjs |
| Database | MongoDB Atlas + Mongoose |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
taskflow-dashboard/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   ├── Dashboard.jsx   # Overview with stats
│   │   │   └── Tasks.jsx       # Full task list with filters
│   │   ├── components/
│   │   │   ├── Layout.jsx      # Sidebar + nav shell
│   │   │   ├── TaskCard.jsx    # Individual task card
│   │   │   ├── TaskModal.jsx   # Create/edit modal
│   │   │   ├── StatsCard.jsx   # Metric card for dashboard
│   │   │   └── Toast.jsx       # Success/error notifications
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state
│   │   ├── services/
│   │   │   └── api.js          # Axios instance + all API calls
│   │   ├── App.jsx             # Router + protected routes
│   │   └── main.jsx            # React entry point
│   └── ...config files
│
└── server/                     # Express backend
    ├── models/
    │   ├── User.js             # User schema
    │   └── Task.js             # Task schema
    ├── controllers/
    │   ├── authController.js   # Register, login, getMe
    │   └── taskController.js   # Full task CRUD
    ├── routes/
    │   ├── authRoutes.js       # POST /register, POST /login
    │   └── taskRoutes.js       # GET/POST/PUT/DELETE /tasks
    ├── middleware/
    │   └── authMiddleware.js   # JWT verification
    ├── config/
    │   └── db.js               # MongoDB Atlas connection
    └── server.js               # Express app entry point
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow-dashboard.git
cd taskflow-dashboard
```

### 2. Set up the backend
```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=choose_a_long_random_secret_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
```

The API will run at `http://localhost:5000`

### 3. Set up the frontend
```bash
cd ../client
npm install
```

Start the dev server:
```bash
npm run dev
```

The app will run at `http://localhost:5173`

> **Note:** The Vite dev proxy forwards `/api/*` requests to `http://localhost:5000` automatically. No `.env` needed locally.

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Tasks

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks (supports `?search`, `?status`, `?priority`) | Yes |
| GET | `/api/tasks/:id` | Get a single task | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |
| PATCH | `/api/tasks/:id/status` | Toggle task status | Yes |

---

## Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set **Root Directory** to `server`
5. Set **Build Command** to `npm install`
6. Set **Start Command** to `node server.js`
7. Add Environment Variables (same as `.env`)
8. Deploy — Render gives you a URL like `https://taskflow-api.onrender.com`

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo
3. Set **Root Directory** to `client`
4. Add Environment Variable: `VITE_API_URL=https://taskflow-api.onrender.com/api`
5. Deploy

---

## Environment Variables Summary

### Server (`server/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | Port to run the server on (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`) |
| `CLIENT_URL` | Frontend URL for CORS |

### Client (`client/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (production only) |

---

## License

MIT
