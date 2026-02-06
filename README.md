# Wedding Site Portfolio (Full-Stack)

A full-stack “wedding website” built as a portfolio project with a modern, recruiter-friendly stack:
**Next.js (App Router) + TypeScript** on the frontend, and **NestJS + Prisma + PostgreSQL** on the backend.

The site is **multilingual** with a **language toggle that does not change the URL**, and all texts are **editable via external JSON files**.

✅ Goal: ship a real project (usable for my wedding) and a clean portfolio piece (architecture, DX, CI/CD).

---

## Key Features (MVP)

- **Responsive wedding website** (Home, Schedule, Location, FAQ, RSVP)
- **i18n toggle without URL changes**
  - Content loaded from external JSON files (editable without touching UI code)
  - Language persisted in `localStorage`
- **RSVP end-to-end**
  - Frontend form with validation + loading/success/error states
  - Backend API with validation (DTO + `class-validator`, global `ValidationPipe`)
  - Data stored in PostgreSQL via Prisma + migrations
- **API documentation** via Swagger (`/api/docs`)
- **Dockerized deployment** (web + api + db)
- **CI/CD to QNAP** via GitHub Actions + self-hosted runner

> Status: **Work in progress** (built step-by-step as a structured 4-week course plan)

---

## Tech Stack

**Frontend**
- Next.js (App Router)
- React + TypeScript
- Styling: **(choose one and keep it consistent)** Tailwind CSS *or* CSS Modules
- i18n: i18next / react-i18next
- Content: `/public/content/it.json`, `/public/content/en.json`

**Backend**
- NestJS
- Swagger
- DTO validation (`class-validator`) + global `ValidationPipe`
- Prisma ORM

**Database**
- PostgreSQL (Docker in development and production)

**Infrastructure**
- Docker + Docker Compose
- GitHub Actions
- QNAP self-hosted runner

---

## Monorepo Structure

```
apps/
  web/        # Next.js frontend
  api/        # NestJS backend
infra/
  docker/     # docker-compose + (optional) reverse proxy config
```

---

## Local Development (planned workflow)

### Prerequisites
- Node.js 20+ (or run Node in Docker)
- pnpm
- Docker + Docker Compose

### Install dependencies (repo root)
```bash
pnpm install
```

### Start database (dev)
```bash
cd infra/docker
docker compose up -d db
```

### Start API (dev)
```bash
cd apps/api
pnpm start:dev
```

### Start Web (dev)
```bash
cd apps/web
pnpm dev
```

---

## Environment Variables (example)

Create these files (names may change later depending on final docker setup):

### `apps/api/.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wedding?schema=public"
BASIC_AUTH_USER="admin"
BASIC_AUTH_PASS="change-me"
```

### `apps/web/.env.local`
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

> Never commit real secrets. Use `.env` files locally and CI secrets in GitHub.

---

## API Endpoints (MVP)

- `GET /api/health`  
  Simple health check.

- `POST /api/rsvp`  
  Saves an RSVP submission.

- `GET /api/rsvp` (protected)  
  Lists RSVP entries (MVP protection: Basic Auth).

Swagger: `GET /api/docs`

---

## Deployment (QNAP + Docker + CI/CD)

High-level production setup:
- Docker Compose runs:
  - `web` (Next.js)
  - `api` (NestJS)
  - `db` (Postgres)
- Reverse proxy routes:
  - `/` → web
  - `/api` → api
- GitHub Actions builds and deploys through a **self-hosted runner** on the QNAP:
  - `docker compose pull`
  - `docker compose up -d`

---

## Roadmap (4 weeks, ~20h/week)

- **Week 1**: Next.js UI + pages + responsive layout
- **Week 2**: i18n toggle (no URL change) + NestJS base + Swagger + health endpoint
- **Week 3**: RSVP API + Prisma + Postgres + frontend integration
- **Week 4**: Docker + QNAP deploy + GitHub Actions + README polish

Optional Week 5:
- Admin auth improvements (JWT)
- RSVP CSV export
- Email confirmations
- Rate limiting / anti-bot
- SEO / performance / accessibility polish

---

## Screenshots

Add screenshots to `docs/` and reference them here:

- Home page: `docs/home.png`
- RSVP page: `docs/rsvp.png`
- Swagger: `docs/swagger.png`

---

## License

MIT (or your choice).
