# Upliftra Network

> **Pakistan's Premier Career, Mentorship, Learning, Networking & Opportunity Ecosystem**  
> Connecting students, graduates, professionals, verified mentors, startups, companies, and universities through verified opportunities, 1-on-1 mentorship, tailored learning curricula, and AI-powered matchmaking.

---

## 🏛️ Project Architecture

Upliftra Network is organized into a clean, decoupled full-stack architecture with strict separation of concerns between Frontend client interfaces and Backend services.

```
upliftra-network/
│
├── frontend/                     # Modern React 19 + Vite Frontend SPA
│   ├── public/                   # Static public assets, favicons & images
│   ├── src/
│   │   ├── assets/               # Visual assets and illustrations
│   │   ├── components/           # UI Components by domain
│   │   │   ├── ai/               # AI Career Advisor & Chat modal
│   │   │   ├── auth/             # Login, Register & Auth modals
│   │   │   ├── common/           # Navbar, Footer, Logo, Role badges, Avatars
│   │   │   ├── community/        # Community discussion forum & comments
│   │   │   ├── events/           # Tech events, webinars & hackathons
│   │   │   ├── learning/         # Learning Hub, syllabi & certificates
│   │   │   ├── mentorship/       # Mentorship Hub & booking workflows
│   │   │   ├── messages/         # Direct messaging center
│   │   │   ├── notifications/    # In-app notification center
│   │   │   ├── opportunities/    # Jobs, internships, scholarships explorer
│   │   │   ├── portals/          # 15 Stakeholder Role Dashboards
│   │   │   ├── profile/          # Comprehensive Profile editor
│   │   │   ├── public/           # Landing page sections & static pages
│   │   │   └── startups/         # Pakistan startup ecosystem & hiring
│   │   ├── context/              # AppContext & unified state management
│   │   ├── data/                 # Platform datasets & pre-configured demo roles
│   │   ├── services/             # Centralized API service (api.ts)
│   │   ├── styles/               # Global Tailwind CSS styles
│   │   ├── types/                # TypeScript interfaces & types
│   │   ├── App.tsx               # Main Application Root & Router
│   │   └── main.tsx              # React DOM mounting entry point
│   ├── index.html                # HTML template entry
│   ├── package.json              # Frontend dependencies and scripts
│   ├── tsconfig.json             # Frontend TypeScript configuration
│   ├── vite.config.ts            # Vite configuration & proxy settings
│   ├── .env.example              # Frontend environment variables template
│   └── .env                      # Frontend local environment config
│
├── backend/                      # Node.js + Express + Gemini AI Backend Service
│   ├── src/
│   │   ├── config/               # Environment & system configurations (env.ts)
│   │   ├── controllers/          # Request handlers (AI, Mentor, Health)
│   │   │   ├── aiController.ts
│   │   │   ├── healthController.ts
│   │   │   └── mentorController.ts
│   │   ├── middleware/           # Express middleware (error handling, logger)
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   ├── routes/               # Modular Express API routes
│   │   │   ├── aiRoutes.ts
│   │   │   ├── healthRoutes.ts
│   │   │   └── index.ts
│   │   ├── services/             # Business & AI logic
│   │   │   ├── aiAdvisorService.ts
│   │   │   ├── geminiService.ts
│   │   │   └── mentorMatchService.ts
│   │   ├── types/                # Backend data models & payload types
│   │   ├── app.ts                # Express application factory
│   │   └── server.ts             # Standalone Backend HTTP server entry
│   ├── package.json              # Backend dependencies and scripts
│   ├── tsconfig.json             # Backend TypeScript configuration
│   ├── .env.example              # Backend environment variables template
│   └── .env                      # Backend local environment config
│
├── metadata.json                 # AI Studio applet metadata & capabilities
├── package.json                  # Root orchestration package.json
├── tsconfig.json                 # Root TypeScript configuration
├── vite.config.ts                # Root Vite development server configuration
├── .gitignore                    # Git ignore file
└── README.md                     # Comprehensive project documentation
```

---

## 🚀 Quick Start & Running the Project

### Option A: Run Full-Stack Simultaneously (Recommended)

From the project root:

```bash
# 1. Start full-stack dev server (Express backend + Vite frontend on port 3000)
npm run dev

# 2. Build for production
npm run build

# 3. Start production server
npm start
```

---

### Option B: Run Backend and Frontend Independently

#### 1. Backend Service (Port 5000)
```bash
# Navigate to backend directory
cd backend

# Start backend dev server with hot reload
npm run dev
# -> Backend runs on http://localhost:5000
# -> Health check: http://localhost:5000/api/health
```

#### 2. Frontend Application (Port 5173 with proxy to Port 5000)
```bash
# Navigate to frontend directory
cd frontend

# Start frontend dev server
npm run dev
# -> Frontend runs on http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`backend/.env` / `.env`)
| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key for AI Career Coach & AI Matchmaking | Injected by AI Studio |
| `PORT` | HTTP port for server (fullstack mode = 3000, standalone backend = 5000) | `3000` / `5000` |
| `NODE_ENV` | Runtime environment (`development` or `production`) | `development` |
| `CORS_ORIGIN` | Allowed CORS origins for API requests | `*` |

### Frontend (`frontend/.env`)
| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL path for backend API endpoints | `/api` |
| `VITE_BACKEND_PROXY_URL` | Backend service target when running standalone Vite | `http://localhost:5000` |

---

## 📡 API Endpoints

All backend endpoints are prefixed under `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and version verification |
| `POST` | `/api/gemini/career-advisor` | AI Career & Scholarship Advisor chat engine |
| `POST` | `/api/gemini/mentor-match` | AI-assisted mentor matchmaking & scoring |

---

## 🌟 Key Platform Features

1. **Opportunities Explorer**: Jobs, internships, fellowships, and international scholarships (Fulbright, Chevening, Erasmus Mundus, DAAD) with verified badges and application links.
2. **Mentorship Hub**: Connect 1-on-1 with verified Pakistani tech leaders and scholars. Includes AI-assisted matching and direct session request workflows.
3. **Skill & Learning Hub**: Interactive syllabi, lesson checklists, progress tracking, and verifiable certificates.
4. **Startup Ecosystem**: Problem vs. solution teardowns, open role applications (salary + equity), direct founder messaging, and startup listing modal.
5. **Community Forum**: Categorized discussions, upvoting, threading, and peer networking.
6. **15 Dedicated Stakeholder Portals**: Instant role switcher supporting Student, Professional, Mentor, Recruiter, Company, Startup, University, Organization, Volunteer, Campus Ambassador, Partner, Moderator, Trainer, Admin, and Super Admin.
7. **AI Career & Opportunity Coach**: Grounded in Pakistani tech context, scholarship guidance, and official platform knowledge.
