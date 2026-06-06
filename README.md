# Noirly AlgoLab

**Visual DSA learning — understand, don't memorize.**

Noirly AlgoLab is a full-stack learning platform for Data Structures and Algorithms. It combines structured curriculum paths, step-by-step algorithm visualizers, synced code tracing, and quizzes — so learners see *why* an algorithm works, not just how to write it.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Learning Flow](#learning-flow)
- [Curriculum](#curriculum)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Progress & Gamification](#progress--gamification)
- [Visualization Engine](#visualization-engine)
- [UI & Theming](#ui--theming)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Additional Documentation](#additional-documentation)

---

## Features

### Learning experience
- **318 visual lessons** across three tracks: Data Structures, Algorithms, and Patterns
- **Three-step lesson flow**: Theory → Visualize → Quiz (70%+ required to complete)
- **Sequential unlocking** — Beginner → Intermediate → Advanced, Easy → Medium → Hard
- **Interactive visualizers** — play, pause, step forward/back, scrub through algorithm state
- **Live code panel** — highlights the active line as the visualization runs
- **Complexity analysis** — time and space complexity shown per step

### Platform
- **Public landing page** with sign-up / login
- **Authenticated app shell** — sidebar navigation, dashboard, learning path explorer
- **Progress persistence** — synced to MongoDB across devices
- **User settings** — animation speed, theme preferences
- **Mobile responsive** — hamburger menus, drawer sidebar, adaptive layouts
- **Dark-first UI** with light mode toggle

### Authentication & accounts
- Registration with **email verification** (login blocked until verified)
- JWT-based sessions
- Forgot password / reset password via email
- User profiles and settings

### Backend tracking (gamification)
- XP, named levels, streaks, and quiz-score bonuses are calculated server-side
- Gamification UI is currently hidden; backend logic remains for future use

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| State | [Redux Toolkit](https://redux-toolkit.js.org/) (auth), [Zustand](https://zustand-demo.pmnd.rs/) (progress) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/), Material Symbols |
| Database | [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/) |
| Auth | [JWT](https://jwt.io/) (`jsonwebtoken`), [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| Email | [Nodemailer](https://nodemailer.com/) (SMTP) |
| Language | TypeScript 5 |

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** (or yarn / pnpm / bun)
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **SMTP credentials** (optional for dev — verification links print to console if email fails)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd noirly-codelab

# Install dependencies
npm install

# Create environment file (see Environment Variables section)
# Create .env.local in the project root with the variables listed below

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> If port 3000 is in use, Next.js may pick another port (e.g. 3099). Check the terminal output.

### Production build

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file in the project root. **Never commit this file.**

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/noirly-codelab?retryWrites=true&w=majority

# JWT — use a long random string in production
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Public app URL (used in emails and absolute asset links)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email / SMTP
EMAIL_USER=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
EMAIL_FROM=noreply@yourdomain.com

# Optional SMTP overrides (defaults: GoDaddy host, port 587 with 465 fallback)
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_DEBUG=false
```

### Email in development

If SMTP is not configured or fails, the app logs verification and reset links to the terminal in development mode. See `EMAIL_CONFIG_OPTIONS.md` for Gmail, GoDaddy, and other SMTP setups.

---

## Project Structure

```
noirly-codelab/
├── app/                          # Next.js App Router
│   ├── api/                      # REST API routes
│   │   ├── auth/                 # login, register, verify, reset, logout, me
│   │   ├── progress/             # curriculum progress + lesson completion
│   │   └── user/                 # profile, settings, achievements, roadmap
│   ├── auth/                     # Auth pages (login, register, verify, reset)
│   ├── components/               # React components
│   │   ├── visualizer/           # UniversalVisualizer, renderers, quiz, theory
│   │   ├── BrandLogo.tsx
│   │   ├── Header.tsx / Sidebar.tsx / PublicHeader.tsx
│   │   └── LearningPathExplorer.tsx
│   ├── contexts/                 # Auth, Settings, MobileNav providers
│   ├── data/                     # Curriculum, lesson theory, quiz content
│   ├── dashboard/                # User dashboard
│   ├── learn-path/               # Structured learning path UI
│   ├── visualizer/[algorithmId]/ # Main lesson visualizer route
│   ├── visual-lab/               # Standalone visual lab pages (55+ algorithms)
│   ├── store/                    # Redux store (auth slice)
│   ├── globals.css               # Design tokens, app shell utilities
│   ├── layout.tsx                # Root layout + providers
│   ├── page.tsx                  # Public landing page
│   └── providers.tsx             # Redux + context wrappers
│
├── src/
│   ├── core/
│   │   ├── engine/               # VisualizerEngine, store, types
│   │   ├── algorithms/           # Step generators (sorting, graphs, DP, etc.)
│   │   └── data-structures/      # DS lesson implementations
│   └── features/
│       └── progress/             # Zustand progress store + sync helpers
│
├── lib/                          # Server utilities
│   ├── auth.ts                   # JWT, password hashing
│   ├── mongodb.ts                # DB connection
│   ├── email.ts                  # Transactional emails
│   ├── gamification.ts           # XP, levels, streaks
│   ├── curriculum-progress.ts    # Lesson completion logic
│   ├── streak.ts                 # Daily streak sync
│   └── theme-colors.ts           # Shared color palette
│
├── models/                       # Mongoose schemas
│   ├── User.ts
│   ├── UserProgress.ts
│   ├── UserCurriculumProgress.ts
│   ├── UserSettings.ts
│   └── UserAchievement.ts
│
├── public/
│   └── logo.png                  # Brand logo
│
├── docs/                         # Supplementary docs (sorting status, etc.)
├── ARCHITECTURE.md               # Visualization engine deep-dive
├── AUTH_SETUP.md                 # Auth system guide
├── DATABASE_DOCUMENTATION.md     # Models & API details
└── EMAIL_CONFIG_OPTIONS.md       # SMTP configuration options
```

---

## Architecture

Noirly AlgoLab follows a **layered architecture**:

```
┌─────────────────────────────────────────────────────────┐
│  UI Layer (React / Next.js App Router)                  │
│  Landing · Auth · Dashboard · Learning Path · Visualizer│
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  State Layer                                            │
│  Redux (auth) · Zustand (progress) · React Context      │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  API Layer (Next.js Route Handlers)                     │
│  /api/auth/* · /api/progress/* · /api/user/*            │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  Data Layer (Mongoose + MongoDB)                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Visualization Engine (client-side, src/core/engine)    │
│  Algorithm → generateSteps() → VisualizerEngine → UI    │
└─────────────────────────────────────────────────────────┘
```

### Key design decisions

- **Client-side route protection** via `AuthContext` — public routes (`/`, `/auth/*`) vs protected app routes
- **Progress dual-sync** — Zustand store on the client, MongoDB via `/api/progress` on the server
- **Algorithm contract** — every algorithm exports `generateSteps(input)` returning `AlgorithmStep[]`
- **Universal visualizer** — one `UniversalVisualizer` component drives all lessons via `RendererFactory`

See `ARCHITECTURE.md` for engine internals.

---

## Learning Flow

Every curriculum lesson follows the same three-step pipeline:

| Step | Component | Description |
|------|-----------|-------------|
| **1. Theory** | `LessonTheoryView` | Concept explanation, complexity, key ideas |
| **2. Visualize** | `UniversalVisualizer` | Step-by-step animation with code sync |
| **3. Quiz** | `LessonQuizView` | Multiple-choice questions; **70%+ to pass** |

On quiz pass, `POST /api/progress/complete` records completion, awards XP, updates streaks, and unlocks the next lesson.

**Route:** `/visualizer/[algorithmId]` (e.g. `/visualizer/bubble-sort`)

---

## Curriculum

### Tracks

| Track | Focus |
|-------|-------|
| **Data Structures** | Arrays, strings, hash maps, stacks, queues, trees, graphs, and more |
| **Algorithms** | Sorting, searching, recursion, greedy, backtracking, DP, graphs |
| **Patterns** | Two pointers, sliding window, prefix sum, and related patterns |

### Difficulty tiers

- **Beginner → Intermediate → Advanced** (track level)
- **Easy → Medium → Hard** (within each topic)

Lessons unlock sequentially within a topic, then across topics and levels.

Curriculum data lives in `app/data/curriculum.ts`. Theory and quiz content in `app/data/lessonContent.ts` and `app/data/curriculumTheory.ts`.

---

## API Reference

All protected endpoints require `Authorization: Bearer <jwt>` header.

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account, send verification email |
| `POST` | `/api/auth/login` | Login (requires verified email) |
| `POST` | `/api/auth/logout` | Clear session cookie |
| `GET` | `/api/auth/me` | Current user profile |
| `POST` | `/api/auth/verify-email` | Verify email token |
| `POST` | `/api/auth/forgot-password` | Send reset email |
| `POST` | `/api/auth/reset-password` | Set new password |

### Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/progress` | Aggregated curriculum progress |
| `POST` | `/api/progress/complete` | Complete lesson (`lessonId`, `algorithmId`, `quizScore`) |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` / `PUT` | `/api/user/profile` | Profile read/update |
| `GET` / `PUT` | `/api/user/settings` | User preferences |
| `GET` | `/api/user/progress` | Legacy per-topic progress |
| `GET` | `/api/user/roadmap` | Roadmap data |
| `GET` | `/api/user/achievements` | Achievements |

Full schema details: `DATABASE_DOCUMENTATION.md`.

---

## Authentication

1. User registers at `/auth/register`
2. Verification email sent (or dev console link)
3. User clicks link → `/auth/verify-email`
4. User logs in at `/auth/login`
5. JWT stored in `localStorage`; `AuthContext` validates via `/api/auth/me`
6. Unverified users are redirected with an error notice

Passwords are hashed with bcrypt. Tokens expire per `lib/auth.ts` configuration.

---

## Progress & Gamification

### Client (`src/features/progress`)
- Zustand store tracks lesson status, current lesson, hydration state
- `ProgressSync` component syncs with server on load and after completions

### Server (`lib/curriculum-progress.ts`, `lib/gamification.ts`)
- XP based on difficulty + quiz score + streak bonus
- 20 named levels (e.g. Syntax Scout → Algorithm Architect)
- Daily streak tracking via `lib/streak.ts`
- Stored in `UserCurriculumProgress` and `User` models

---

## Visualization Engine

Located in `src/core/engine/`.

### Core concepts

```typescript
// Every algorithm implements:
export function generateSteps(input: AlgorithmInput): AlgorithmStep[]

// Engine orchestrates playback:
visualizerEngine.registerAlgorithm('bubble-sort', bubbleSort);
visualizerEngine.execute('bubble-sort', { array: [5, 2, 8, 1, 9] });
visualizerEngine.play() | pause() | nextStep() | previousStep();
```

### AlgorithmStep fields
- `action`, `description`, `visualizationData`, `highlights`
- `variables`, `memory`, `complexity`, `codeLine`

### Implemented algorithm categories

| Category | Examples |
|----------|----------|
| Sorting | Bubble, Merge, Quick, Heap, Radix, Tim Sort, … |
| Searching | Binary, Linear, Jump, Interpolation, Ternary, … |
| Two Pointers | Two Sum, Three Sum, Container Water, … |
| Sliding Window | Fixed/variable window, anagrams, min window, … |
| Trees | BST, AVL, Red-Black search, traversals |
| Graphs | BFS, DFS, Dijkstra, Bellman-Ford, A* |
| Recursion / DP | Fibonacci, Factorial, Knapsack |
| Data Structures | Arrays, stacks, queues, hash maps, strings, … |

Standalone visual demos also live under `/visual-lab/*` (55+ pages).

---

## UI & Theming

- **Design system** in `app/globals.css` — Material-inspired tokens (`primary`, `surface-container`, `on-surface`, etc.)
- **Default theme:** dark (`html.dark` in root layout)
- **Theme toggle** on public and authenticated headers
- **Fonts:** Geist Sans (body), JetBrains Mono (code), Material Symbols (icons)
- **App shell classes:** `.app-main`, `.app-header` — responsive sidebar offset (`ml-0` → `lg:ml-[240px]`)

Brand assets: `public/logo.png`, `app/components/BrandLogo.tsx`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (runs `predev` type check script first) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set all environment variables from [Environment Variables](#environment-variables)
4. Set `NEXT_PUBLIC_APP_URL` to your production domain (required for email logo links)
5. Deploy

### Self-hosted

```bash
npm run build
npm start
```

Ensure MongoDB is reachable and SMTP is configured for email flows.

### URL rewrites

`next.config.ts` includes friendly aliases for visual-lab paths (e.g. `/visual-lab/sorting` → bubble sort demo).

---

## Additional Documentation

| File | Contents |
|------|----------|
| `ARCHITECTURE.md` | Visualization engine architecture and algorithm contract |
| `AUTH_SETUP.md` | Authentication setup and troubleshooting |
| `DATABASE_DOCUMENTATION.md` | Mongoose models and API schemas |
| `EMAIL_CONFIG_OPTIONS.md` | SMTP providers and port/TLS options |
| `docs/SORTING_ALGORITHMS.md` | Sorting algorithm reference |
| `docs/SORTING_STATUS.md` | Implementation status tracker |

---

## Routes Overview

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/auth/*` | Public | Login, register, verify, reset |
| `/dashboard` | Auth | User dashboard |
| `/learn-path` | Auth | Curriculum explorer |
| `/visualizer/[id]` | Auth | Full lesson (theory + viz + quiz) |
| `/progress` | Auth | Progress overview |
| `/settings` | Auth | User settings |
| `/visual-lab/*` | Mixed | Standalone algorithm demos |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes with clear messages
4. Open a pull request

When adding a new visualized algorithm:
1. Implement `generateSteps()` in `src/core/algorithms/`
2. Register it in `app/lib/engineBootstrap.ts`
3. Add curriculum entry in `app/data/curriculum.ts`
4. Add theory + quiz in `app/data/lessonContent.ts`
5. Add a renderer if a new visualization type is needed

---

## License

Private project — all rights reserved unless otherwise specified.

---

<p align="center">
  <strong>Noirly AlgoLab</strong><br>
  Visual DSA learning — understand, don't memorize.
</p>
