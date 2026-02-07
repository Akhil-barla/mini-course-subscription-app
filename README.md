# Mini Course Subscription App (Black Friday Edition)

A production-ready MERN stack application for course subscriptions with JWT authentication, promo codes, and a modern Black Friday themed UI.

**Live Demo:** [Add your Vercel URL here]  
**GitHub:** [Add your GitHub repo URL here]

---

## Screenshots

### Login Page
![Login](screenshots/login.png)

### Courses List
![Courses List](screenshots/courses-list.png)

### Course Detail
![Course Detail](screenshots/course-detail.png)

### My Courses
![My Courses](screenshots/my-courses.png)

---

## Tech Stack

| Layer      | Technologies                          |
| ---------- | ------------------------------------- |
| Frontend   | React (Vite), Tailwind CSS, React Router, Axios |
| Backend    | Node.js, Express, JWT, bcrypt         |
| Database   | MongoDB (Mongoose)                    |
| Hosting    | Vercel (frontend), Render (backend)   |

## Features

- **Authentication**: JWT-based login (email + password)
- **Courses**: Browse 5+ mock courses with details
- **Subscription**: Free courses subscribe instantly; paid courses require promo code `BFSALE25` for 50% off
- **My Courses**: Protected page showing subscribed courses
- **Toast notifications** for feedback
- **Responsive UI** with dark theme

## Dummy Users (Pre-seeded)

| Email            | Password    |
| ---------------- | ----------- |
| test1@gmail.com  | password123 |
| test2@gmail.com  | password123 |
| admin@gmail.com  | admin123    |

---

## Local Development Setup

### Prerequisites

- **Node.js** 18 or later
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cluster)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mini-course-subscription-app.git
cd mini-course-subscription-app
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Step 3: Environment Variables

**Backend** – Create `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/mini-course-subscription
# Or use MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/mini-course-subscription?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Frontend** – Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Seed the Database

```bash
cd backend
node scripts/seed.js
```

This creates 3 dummy users and 5 mock courses.

### Step 5: Run the Application

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
```

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:5000  

### Step 6: Test the App

1. Open http://localhost:5173
2. Log in with `test1@gmail.com` / `password123`
3. Browse courses, subscribe (use `BFSALE25` for paid courses), and check My Courses

---

## Deployment

### Backend (Render)

1. Go to [Render](https://render.com) and sign in
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Add **Environment Variables:**
   - `MONGODB_URI` – MongoDB Atlas connection string
   - `JWT_SECRET` – Strong random string (e.g. `openssl rand -hex 32`)
   - `CORS_ORIGIN` – Your Vercel frontend URL (e.g. `https://your-app.vercel.app`)
6. Click **Create Web Service**
7. Copy the backend URL (e.g. `https://mini-course-xxx.onrender.com`)

### Frontend (Vercel)

1. Go to [Vercel](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Root Directory:** `frontend` (click Edit)
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add **Environment Variable:**
   - `VITE_API_URL` – Your Render backend URL + `/api` (e.g. `https://mini-course-xxx.onrender.com/api`)
6. Click **Deploy**
7. Copy your Vercel URL

### Post-Deployment

1. In Render, update `CORS_ORIGIN` to your exact Vercel URL
2. Run the seed script against your production MongoDB (Atlas) to add users and courses:
   ```bash
   cd backend
   # Set MONGODB_URI in .env to your Atlas URI, then:
   node scripts/seed.js
   ```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register (optional) |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/courses` | List all courses |
| GET | `/api/courses/:id` | Get course by ID |
| POST | `/api/subscribe` | Subscribe (requires JWT) |
| GET | `/api/subscribe/my-courses` | User's subscriptions (requires JWT) |

---

## Folder Structure

```
mini-course-subscription-app/
├── backend/
│   ├── middleware/     # Auth middleware
│   ├── models/         # User, Course, Subscription
│   ├── routes/         # Auth, courses, subscriptions
│   ├── scripts/
│   │   └── seed.js     # Seed users & courses
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/    # AuthContext
│   │   ├── pages/
│   │   ├── services/   # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── screenshots/
├── package.json
└── README.md
```

---

## License

MIT
