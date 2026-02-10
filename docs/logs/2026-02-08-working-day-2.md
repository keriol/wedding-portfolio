# Working Day 2 — 2026-02 -08

Time spent: 2h

## What changed
    - Fixed local dev setup on home PC: Node installed and PowerShell execution policy issue solved for npm / npx.
- Scaffolded Next.js app(App Router + TypeScript) under`apps/web`.
- Fixed Visual Studio debugging / run workflow for the Next app(root workspace`package.json` + proper scripts + VS Startup Command).
- Reviewed what to commit vs ignore; identified VS build artifacts and Next build outputs to ignore(obj / bin /.vs /.next, etc.).
- Confirmed logging workflow: one new worklog file per working day, generated end - of - day from the day’s conversation(date only).

## What we learned
    - VS JavaScript / TypeScript projects may expect a root `package.json` even if the actual app lives in `apps/web`.
- On Windows PowerShell, npm / npx can be blocked by ExecutionPolicy because they are `.ps1` shims; fix via`RemoteSigned`(CurrentUser) or use`npm.cmd/npx.cmd`.
- Next.js`.next/` is build / cache output and should not be committed.
- Visual Studio build outputs(`obj/`, `bin/`) must be excluded to avoid polluting commits.

## Decisions locked
    - Project Model must always be in English and stay under 8000 characters; it will be regenerated daily on request and saved to the repo.
- End - of - day worklog: NEW file per day, no incremental append; DATE ONLY(no time - of - day).
- `logs/` folder must remain in the repository(do not ignore it).

## Blockers / risks
    - Corporate laptop setup is likely to require repeating the PowerShell / npm / npx + Visual Studio debug procedure(policy restrictions risk).
- OneDrive paths can sometimes cause file - lock / sync friction for Node projects(watch for odd behavior).

## Estimation update
    - Previous remaining effort to reach `week4-cicd-live`: ~60–80h.
- After today’s progress(environment + Next scaffold + VS debugging), updated remaining effort: ** ~58–78h **.

## Next objective(ONE thing)
    - Create a clean commit / PR with the Next scaffold + required root workspace files and a correct`.gitignore`(no build artifacts committed).
