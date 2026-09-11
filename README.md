# GymTrack — Advanced Workout Tracking & Progression Ecosystem 🏋️‍♂️🔥

> **Track your workouts. Build a stronger you.**  
> GymTrack is a production-grade fullstack fitness tracking application featuring an interactive 12-screen mobile simulator, RESTful API architecture, and real-time cloud data persistence with PostgreSQL hosted on Supabase (Singapore).

---

## 🏗️ Monorepo Architecture

```
gym-track-app/
├── frontend/                # Frontend Web Application & Vercel Fullstack Serverless
│   ├── api/                 # Vercel Serverless Function entrypoint (/api/v1)
│   ├── public/              # Static assets, hero images, SVG icons, index.html
│   ├── src/                 # Interactive Simulator, 12 Screens, Client-side State
│   │   ├── apiClient.js     # Unified API Client for local & cloud sync
│   │   ├── app.js           # Main application engine & event bus
│   │   ├── screens.js       # 12 Modular screen renderers
│   │   ├── data.js          # Exercise library, default routines & initial state
│   │   └── audio.js         # Web Audio API cues (rest countdown beep & chime)
│   ├── local-server.js      # Express server for local development
│   ├── style.css            # Dark mode design tokens & glassmorphic UI system
│   ├── vercel.json          # Vercel serverless routing configuration
│   └── package.json
│
├── backend/                 # Standalone Backend REST API & Database Service
│   ├── src/
│   │   ├── controllers/     # Auth, Exercise, Program, Workout, and Progress handlers
│   │   ├── db/              # PostgreSQL Pool & automated schema/seed migration
│   │   ├── middleware/      # JWT Authentication & authorization guards
│   │   ├── routes/          # RESTful v1 endpoints
│   │   └── public/          # Interactive Dark-Mode API Testing Console
│   ├── server.js            # Node.js Express server on port 5000
│   ├── .env.example         # Environment template
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚡ Key Features

1. **📱 12-Screen Interactive Mobile Simulator**:
   - iPhone 16 Pro mockup frame with Dynamic Island & responsive touch controls.
   - Dual-view toggle: **Interactive Simulator** & **12-Screen Showcase Matrix**.
   - Interactive Rest Timer with Web Audio API sound cues.
   - Full Set Type support: **Normal (N)**, **Warmup (W)**, **Drop Set (D)**, **Failure (F)**, **Superset (S)**.

2. **📊 Core Set Logging & PR Detection (Section 18)**:
   - Automated volume computation: $\text{Volume} = \text{Weight} \times \text{Reps}$.
   - Automatic 1-Rep Max estimation using the **Epley Formula**: $\text{Est. 1RM} = \text{Weight} \times (1 + \text{Reps}/30)$.
   - Real-time comparison with historical lifts to detect **New Personal Records (PR)** with instant celebration modal.

3. **☁️ PostgreSQL Cloud Database (Supabase Singapore)**:
   - 11 normalized relational tables (`users`, `user_settings`, `exercises`, `programs`, `program_days`, `program_exercises`, `workouts`, `workout_exercises`, `sets`, `personal_records`, `goals`).
   - Pure JavaScript driver (`pg`, `bcryptjs`) compatible with Windows Application Control policies.

4. **🚀 One-Click Deploy to Vercel**:
   - Set Root Directory to `frontend` in Vercel to deploy instantly.

---

## 🛠️ Quick Start Guide

### 1. Running Frontend & Fullstack Web (`frontend`)
```bash
cd frontend
npm install
node local-server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Running Standalone Backend API (`backend`)
```bash
cd backend
npm install
cp .env.example .env
node server.js
```
Open [http://localhost:5000](http://localhost:5000) to access the interactive API Testing Console.

---

## 🚢 Deploying to Vercel

1. Import this repository in [Vercel Dashboard](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Click **Deploy**!

---

## 👨‍💻 Author & License
- Developed by **Nguyen Tan Hoang Son** ([@hoangson191995](https://github.com/hoangson191995))
- License: MIT
