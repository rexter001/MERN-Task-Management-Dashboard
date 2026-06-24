# TaskFlow — MERN Task Management Dashboard

A production-ready full-stack task management application built with **MongoDB, Express.js, React.js, and Node.js**. The application enables users to securely manage their tasks with authentication, task categorization, filtering, and real-time dashboard statistics. Designed with a responsive interface and deployed on modern cloud platforms, TaskFlow provides an efficient and intuitive productivity management experience.

---

## 🚀 Live Demo

**Application:** https://mern-task-management-dashboard-six.vercel.app/login

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Tasks Page

![Tasks Page](screenshots/tasks.png)

---

## ✨ Features

- JWT Authentication (Register, Login, Protected Routes)
- Persistent User Sessions
- Complete Task CRUD Operations
- Task Search and Filtering
- Filter Tasks by Status and Priority
- Dashboard Statistics and Metrics
- One-click Task Completion
- Overdue Task Detection
- Responsive UI for Mobile, Tablet, and Desktop
- Secure REST API Architecture
- MongoDB Atlas Integration
- Toast Notifications and User Feedback

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Authentication
- JWT (JSON Web Tokens)
- bcryptjs

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```text
taskflow-dashboard/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Tasks.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vercel.json
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── db.js
│   └── server.js
│
├── screenshots/
│   ├── dashboard.png
│   └── tasks.png
│
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas Account

---

### Clone the Repository

```bash
git clone https://github.com/rexter001/MERN-Task-Management-Dashboard.git
cd MERN-Task-Management-Dashboard
```

---

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Configure `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used for signing JWT |
| `JWT_EXPIRES_IN` | Token expiration duration |
| `CLIENT_URL` | Frontend URL used for CORS |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get authenticated user |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all user tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/status` | Update task status |

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Push the repository to GitHub.
2. Create a new Web Service on Render.
3. Connect the GitHub repository.
4. Set:

```text
Root Directory: server
Build Command: npm install
Start Command: node server.js
```

5. Add Environment Variables.
6. Deploy.

### Frontend Deployment (Vercel)

1. Create a new project on Vercel.
2. Connect the GitHub repository.
3. Set:

```text
Root Directory: client
```

4. Add:

```env
VITE_API_URL=https://mern-task-management-dashboard.onrender.com/api
```

5. Deploy.

---

## 🗺️ Roadmap

- Add Task Categories and Tags
- Add Due Date Notifications
- Add Drag-and-Drop Kanban Board
- Add Dark/Light Theme Toggle
- Add Email Notifications
- Add Team Collaboration Features
- Add User Profile Management
- Add File Attachments
- Add Task Analytics Dashboard
- Add Docker Support
- Add CI/CD Pipeline Integration

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

- [@Khaja Mastan Shaik](https://github.com/rexter001)
---