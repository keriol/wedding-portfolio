# Worklog 2026-02-10 (Working Day 3)

Time spent: 3.5h

## What changed
- Stabilized the local dev workflow by moving the repo to a local path (avoids network-share/npm issues).
- Implemented the i18n foundation on the web app:
  - Language toggle without URL changes.
  - Language persisted in localStorage.
  - Copy loaded from external JSON files in `/public/content/en.json` and `/public/content/it.json`.
- Fixed Next dev startup issues by switching dev mode to webpack (avoids debugger/source map issues).
- Resolved UTF-8 encoding issues affecting `page.tsx` compilation.

## What we learned
- Running npm installs/builds from network shares can cause permission/locking/ENOTEMPTY problems and is not a reliable baseline.
- Visual Studio JS debugging can break on modern Next dev internals (source map/encoding issues); webpack dev mode is more stable.
- Next requires source files to be valid UTF-8; wrong encodings can surface as “stream did not contain valid UTF-8”.

## Decisions locked
- i18n toggle must not use routing and must persist language in localStorage.
- Copy remains externalized in `/public/content/it.json` and `/public/content/en.json`.
- Use GitHub Actions for CI/CD (not Jenkins).
- For now, prefer local repo workspace over network-share workspace for Node/Next development.

## Blockers/risks
- VS-integrated JS debugging may remain flaky depending on Next/tooling versions; prefer “Run without debugging” or browser DevTools when needed.
- Network-share-based workflows will need a future hardening strategy (avoid `node_modules` on shares).

## Next objective
- Add a minimal site scaffold: layout + navigation (Home/Program/Location/FAQ/RSVP) using `t("nav.*")`, and create the corresponding pages.
