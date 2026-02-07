# Mini Course Subscription App (Black Friday Edition)

A production-ready MERN stack application for course subscriptions with JWT authentication, promo codes, and a modern Black Friday themed UI.

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

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
cd mini-course-subscription-app
npm run install:all
```

### 2. Environment Variables

**Backend** (`backend/.env`):

```env
MONGODB_URI=mongodb://localhost:27017/mini-course-subscription
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**Frontend** (`frontend/.env`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
npm run seed
```

This creates 3 dummy users and 5 mock courses.

### 4. Run Development

```bash
# Run both frontend and backend
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:5000  

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register (optional)
- `POST /api/auth/login` - Login, returns JWT

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course by ID

### Subscription
- `POST /api/subscribe` - Subscribe (requires JWT, body: `{ courseId, promoCode? }`)
- `GET /api/subscribe/my-courses` - User's subscriptions (requires JWT)
- `GET /api/subscribe/check/:courseId` - Check if subscribed (requires JWT)

## Deployment

### Backend (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your repo, set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Strong random string
   - `CORS_ORIGIN` - Your frontend URL (e.g. `https://your-app.vercel.app`)

### Frontend (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` - Your Render backend URL (e.g. `https://your-backend.onrender.com/api`)

### Post-Deploy

1. Update `CORS_ORIGIN` in Render to your Vercel URL
2. Run seed script against production MongoDB (or use Atlas UI to add data)

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
├── package.json
└── README.md
```

## License

MIT
