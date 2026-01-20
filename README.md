# JobFlow 🚀

JobFlow is a full-stack job application tracking platform that helps users manage applications, interviews, and offers in one centralized dashboard.

---

## ✨ Features

- 🔐 User authentication with JWT (Register & Login)
- 📝 Add, edit, and delete job applications
- 🔄 Track application status:
  - Applied
  - Interview
  - Offer
  - Rejected
- 📊 Dashboard with real-time application statistics
- 🔍 Search applications by company name
- 🎯 Filter applications by status
- 🛡️ Protected routes on both frontend and backend
- ♻️ Reusable UI components built with Tailwind CSS
- 📱 Fully responsive layout

---

## 🧠 Why JobFlow?

JobFlow solves a real-world problem faced by job seekers: **keeping track of multiple job applications across different companies and stages**.

This project demonstrates:

- Real-world authentication flow
- Clean backend architecture
- Scalable frontend structure
- Production-ready coding practices

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Context API

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## 📁 Project Structure

```text
JobFlow/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── applicationController.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── validateApplication.js
│ ├── models/
│ │ ├── user.model.js
│ │ └── Application.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── applicationRoutes.js
│ ├── server.js
│ ├── package.json
│ └── .gitignore
│
├── src/
│ ├── components/
│ │ ├── Navbar/
│ │ └── ui/
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── ApplicationContext.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Applications.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── utils/
│ │ └── authFetch.js
│ ├── main.jsx
│ └── App.jsx
│
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

```

---

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder:

````env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobflow
JWT_SECRET=your_secure_jwt_secret
PORT=5001

---

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is hashed using **bcrypt**
3. On login:
   - Server verifies credentials
   - JWT token is generated
4. Token is sent to frontend and stored securely
5. Protected routes:
   - Require valid JWT in Authorization header
   - Backend middleware verifies token
6. User-specific data is returned from the database

---

##🧪 API Endpoints
###🔐 Authentication Routes

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Login user & get JWT |

---

###📄 Application Routes (Protected)

> 🔐 **Authorization Required**
> `Authorization: Bearer <token>`

| Method | Endpoint | Description |
| ------ | ----------------------- | --------------------- |
| GET | `/api/applications` | Get all applications |
| POST | `/api/applications` | Add a new application |
| PUT | `/api/applications/:id` | Update application |
| DELETE | `/api/applications/:id` | Delete application |

---

###📊 Dashboard Stats
| Method | Endpoint | Description |
| ------ | ------------ | -------------------------- |
| GET | `/api/stats` | Get application statistics |

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/JobFlow.git
cd JobFlow
````

````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
http://localhost:5001
```

### 3️⃣ Frontend Setup

```bash
npm install
npm run dev
```

Frontend will run on:
http://localhost:5174

---

## 🚀 Deployment

JobFlow is deployed using **Render** for the backend and **Vercel** for the frontend, following modern full-stack deployment practices.

---

### 🌐 Backend Deployment (Render)

The backend is deployed as a **Render Web Service**.

#### Steps:

1. Go to https://render.com
2. Create a **New Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:**
     ```bash
     npm install
     ```
   - **Start Command:**
     ```bash
     npm start
     ```

#### Environment Variables (Render):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

After deployment, Render provides a live backend URL:
https://jobflow-backend.onrender.com

### 🌍 Frontend Deployment (Vercel)

The frontend of **JobFlow** is deployed using **Vercel**, optimized for Vite + React applications.

---

#### 🔧 Deployment Steps

1. Go to **https://vercel.com**
2. Click **New Project**
3. Import the JobFlow GitHub repository
4. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `/`
   - **Build Command:**
     ```bash
     npm run build
     ```
   - **Output Directory:**
     ```bash
     dist
     ```

---

#### 🔐 Environment Variables (Vercel)

Add the following environment variable in **Vercel → Project Settings → Environment Variables**:

```env
VITE_API_BASE_URL=https://jobflow-backend.onrender.com
```

🚀 Deploy

Click Deploy and wait for the build to complete.
Once deployed, Vercel provides a live URL:
https://jobflow.vercel.app

---

## 👤 Author

**Abhishek Pradhan**
Full-Stack Developer

JobFlow was built to demonstrate end-to-end product development — from system design and authentication to deployment and documentation — following real-world engineering practices.

🔗 **GitHub:** https://github.com/AbhishekPradhan552
````
