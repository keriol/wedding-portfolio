# WEDDING PORTFOLIO COURSE (PROJECT MODEL, ENGLISH, <8K CHARS)

Last updated: **2026-02-13** (Europe/Rome)
Delta vs last model:

* Visual Studio updates can break `.esproj` by changing the **Microsoft.VisualStudio.JavaScript.Sdk** version.
* **Floating** `Microsoft.VisualStudio.JavaScript.Sdk` may fail even when Node.js workload is installed; pinning to the installed SDK version can restore builds.
* Git push **403** on Windows is often caused by cached **wrong GitHub credentials** (Credential Manager); removing `git:https://marcocarolo@github.com` fixed it.
* Added troubleshooting notes: VS repair/components and Windows `cmdkey` cleanup to re-auth as `keriol`.
* Working Day 4 started; keep daily logs **date only**.

## Goal

Build a full-stack wedding portfolio site:

* Frontend: Next.js (App Router) + TypeScript + React
* Backend: NestJS + Swagger + Prisma + PostgreSQL
* i18n: language toggle WITHOUT URL change
* Copy editable via external JSON files

## Non-negotiables

* i18n: toggle without routing; persist language in localStorage.
* Copy lives in: `/public/content/it.json` and `/public/content/en.json`
* RSVP flow: search/select an invited guest from DB → submit/update RSVP for that guest.
* Backend: DTO + class-validator, global ValidationPipe, Swagger at `/api/docs`
* DB: PostgreSQL + Prisma migrations
* Deploy: QNAP with Docker Compose + GitHub Actions + self-hosted runner

## Repo layout (monorepo)

* `apps/web`  (Next.js)
* `apps/api`  (NestJS)
* `infra/docker` (compose + proxy config)
* `README.md` (stack, architecture, screenshots, CI badge, live link)

## Styling decision (pick ONE)

* Tailwind OR CSS Modules (choose once and keep consistent)

## MVP API

* `GET  /api/health`
* `GET  /api/guests/search?query=...`
* `POST /api/rsvp`        (upsert by guest)
* `GET  /api/rsvp`        (protected; MVP Basic Auth)

Guest import: prefer an **idempotent XLS import (upsert)** using `publicId` (or equivalent stable key).

## Minimal DB models

Guest:

* `id`, `publicId`, `firstName`, `lastName`, optional contacts, optional `maxGuests`

Rsvp:

* `id`, `guestId`, `attending`, `guestsCount`, `notes?`, `allergies?`, `createdAt`

## 4-week plan (20h/week)

W1 UI:

* pages (Home/Program/Location/FAQ/RSVP), responsive layout
* RSVP UI = 2-step (lookup → confirm)
* Tag: `week1-ui-ready`

W2 i18n + API base:

* i18next + external JSON + toggle
* NestJS + Swagger + health endpoint
* Tag: `week2-i18n-api-base`

W3 DB + RSVP E2E:

* Prisma + Postgres + migrations
* guest import (XLS upsert)
* guest search + rsvp upsert + protected list
* FE integration
* Tag: `week3-rsvp-db`

W4 Docker + CI/CD:

* Dockerfiles, prod-like compose, proxy `/` and `/api`
* runner on QNAP, deploy workflow
* README polish
* Tag: `week4-cicd-live`

W5 optional:

* hardening (better admin auth, CSV export, rate-limit/honeypot, confirmation email, SEO/a11y)

## Estimates

Remaining effort to reach `week4-cicd-live`: **~60–80 practical hours** (UI polish + XLS import quality + repo CI policies).

## Optional theory (extra time)

W1 App Router mental model
W2 i18n gotchas + Nest architecture
W3 Prisma/migrations + idempotent imports
W4 Docker/compose/proxy + self-hosted CI

## Working method (ChatGPT rules)

One task per message. Each step must include:

1. commands, 2) files + paths, 3) minimal snippets, 4) verifiable DONE criteria.
   Senior style, no tangents.

## Learning loop (daily regeneration)

When you say **“Regenerate the model”**:

* Re-emit this model including new learnings (decisions, blockers, estimate changes),
* Keep English, keep <8000 chars,
* Update date + 3–6 delta bullets.

## Daily log (date only)

Rule: logs contain **only the date** (no time).
Working Day 2: 2026-02-08
Working Day 4: 2026-02-13

## Session start template

Current status: [branch + what’s done + any errors]
Next objective: [ONE thing only]

## Notes: Visual Studio + Git pitfalls (learned)

### Visual Studio `.esproj` SDK error

If you see:
`The SDK 'Microsoft.VisualStudio.JavaScript.Sdk[/<version>]' specified could not be found`

* Likely after a VS update.
* Fix options:

  * VS Installer: **Repair** or ensure **JavaScript/TypeScript project system** components installed.
  * If floating SDK fails, pin the `.esproj` SDK to the installed version.

### GitHub push 403 on Windows

If push fails with 403, often wrong cached credentials:

* List: `cmdkey /list | findstr /i github`
* Delete wrong user entry (example): `cmdkey /delete:git:https://marcocarolo@github.com`
* Retry push and authenticate as **keriol**.

## End-of-day worklog rule

* Create a NEW file at end of each working day:

  * `docs/worklog/YYYY-MM-DD-working-day-N.md`
* Sections: What changed, What we learned, Decisions locked, Blockers/risks, Next objective (ONE thing)
* **Date only**, no time.
