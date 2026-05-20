# Meridian Square — Investor Onboarding (Technical Assessment)

Full-stack investor onboarding for a regulated real-world asset tokenization platform (Phase 1 — investor user).

## Stack

| Layer | Technology |
|-------|------------|
| fe | React 19, Vite 6, TypeScript, Bootstrap 5 (Sass) |
| be | Node.js, Express, TypeScript, Zod |
| Database | PostgreSQL 16 |

## Project structure

```
MeridianSquare/
├── be/          # Express API + migrations
├── fe/         # React onboarding UI
├── docs/             # Written answers, architecture, CSS governance, AI review
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)
- npm

## Quick start

### 1. PostgreSQL

**Option A — Docker**

```bash
docker compose up -d

```

**Option B — macOS Homebrew Postgres** (no `postgres` user by default)

```bash
createdb meridian_square   

```

### 2. Backend

```bash
cd backend
cp .env.example .env    
```

Open `.env` and set `DATABASE_URL` for your Postgres (see comments in `.env.example`).

```bash
npm install
npm run db:migrate
npm run dev
```

**Why no `.env` in GitHub?** Real passwords and machine-specific settings must not be public. Reviewers copy `.env.example` → `.env` on their machine — standard industry practice (same as `.env.sample`, `env.template`).

**Important:** After changing `.env`, restart the backend (`Ctrl+C` then `npm run dev` again).

API runs at `http://localhost:3001`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Onboarding flow

1. **Sign up** (`/`) — name, email, date of birth, country → `POST /investors`
2. **Email verification** (`/verify`) — mock OTP; use `123456`
3. **Confirmation** (`/confirmation`) — `GET /investors/:id` displays submitted details

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/investors` | Create investor (400 validation, 409 duplicate email) |
| GET | `/investors/:id` | Fetch investor by UUID |
| GET | `/health` | Health check |

### Example

```bash
curl -X POST http://localhost:3001/investors \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "dateOfBirth": "1990-05-15",
    "country": "United Arab Emirates"
  }'
```

## Documentation (deliverables)
- [Part 1 Written Answers](docs/WRITTEN_ANSWERS.md)
- [Architecture Note](docs/ARCHITECTURE.md)
- [CSS Governance Plan](docs/CSS_GOVERNANCE.md)
- [AI Usage Review](docs/AI_USAGE_REVIEW.md)


