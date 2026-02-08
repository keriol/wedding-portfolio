# MVP Scope — End of Month Release

## Must-have
- Next.js web (App Router) with pages: Home, Program, Location, FAQ, RSVP
- Language toggle (IT/EN) with JSON in /public/content (no URL change)
- RSVP form:
  - client-side validation
  - loading/success/error states
- API (NestJS):
  - GET /api/health
  - POST /api/rsvp (DTO + ValidationPipe)
  - GET /api/rsvp (Basic Auth)
- DB (Postgres + Prisma):
  - Rsvp model + migrations
- Deploy on QNAP:
  - docker compose (web + api + db)
  - repeatable start: `docker compose up -d`

## Nice-to-have (post-MVP)
- CSV export
- Email confirmation
- Rate limiting / honeypot
- JWT admin
