# Working Day 4 — 2026-02-13

Time spent: 2.5h

## What changed

* Fixed Visual Studio `.esproj` build break after Visual Studio update:

  * Error: `The SDK 'Microsoft.VisualStudio.JavaScript.Sdk' specified could not be found`
  * Fix: pinned `Microsoft.VisualStudio.JavaScript.Sdk/<installed-version>` in `weddingportfolio.esproj` (floating SDK did not work).
* Fixed GitHub push `403` caused by cached wrong Windows credentials:

  * Removed stale entries (e.g. `git:https://marcocarolo@github.com`) and re-authenticated with the correct GitHub account.
* Implemented QNAP LAN preview deployment workflow for the web app:

  * Target share: `\\192.168.69.38\Website\wedding-deploy`
  * Created `scripts/deploy-web-dev-smb.ps1` to build locally and copy artifacts to the QNAP share.
  * Created a Container Station container (`node:20-alpine`) with bind mount to the deploy folder.
  * Fixed container startup command to run the correct entrypoint (`node /app/server.js`).
  * Fixed missing port publishing (container was running but unreachable).
  * Final port mapping: host `8088` -> container `3000` (TCP).
* Debugged and fixed “Loading…” on the LAN preview:

  * Identified 404s for `/_next/static/*.js` and `/_next/static/*.css` in DevTools.
  * Removed duplicate Next config ambiguity (`next.config.ts` vs `next.config.mjs`).
  * Fixed `apps/web/package.json` after introducing invalid JSON during script edits.
  * Removed workspace/root ambiguity caused by multiple lockfiles (Next root inference warning), allowing the deployed preview to serve assets correctly.

## What we learned

* Visual Studio updates can break `.esproj` by changing/removing the installed JavaScript SDK; pinning to the installed `Microsoft.VisualStudio.JavaScript.Sdk/<version>` restores builds.
* Windows Credential Manager can keep stale GitHub credentials and cause persistent push `403`; cleaning the `cmdkey` entries resolves it.
* Container Station gotchas:

  * Bind mount must point to the real deploy folder; docker volumes are not SMB shares.
  * Port forwarding must be explicitly configured; otherwise TCP connect fails even if the container is “Running”.
  * Use absolute entrypoint paths (`/app/server.js`) to avoid working-directory issues.
* If the page hangs on “Loading…”, check DevTools Network first; 404 on `/_next/static/*` indicates missing/misaligned build artifacts in the deployed folder.
* Keep only one Next config file and avoid multiple lockfiles to prevent unexpected build/deploy behavior.

## Decisions locked

* Week1 remains “UI first”, but we accept a practical prerequisite:

  * Maintain a working LAN preview on QNAP to validate deploy early.
* Keep the i18n implementation as already done in Day 3:

  * Toggle without routing, persisted in `localStorage`, JSON copy under `/public/content/*.json`.

## Blockers / risks

* Lockfile duplication (root vs `apps/web`) can reintroduce build ambiguity; keep a single consistent lockfile strategy.
* QNAP share permissions (Advanced Folder Permissions) can break container access if ACLs change.

## Next objective (ONE thing)

* Resume Week1 UI scaffold work:

  * layout + navigation + pages (Home/Program/Location/FAQ/RSVP) using existing `t("nav.*")` keys.
