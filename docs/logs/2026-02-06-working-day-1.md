# Working Log — Day 1 (Bootstrap)
**Date:** 2026-02-06 (Europe/Rome)  
**Time spent:** 4h :'(

## Progress
- Prepared QNAP workspace paths and clarified where source/deploy should live.
- Docker login fixed (permissions) by using a writable `DOCKER_CONFIG` directory.
- Git not available on QNAP shell: adopted container-based git workflow.
- GitHub SSH authentication from QNAP containers: configured and verified (`ssh -T git@github.com` OK).
- Git safety issue ("dubious ownership") fixed by using `safe.directory` in the git container wrapper.
- Repo folder normalized: chose `/share/CACHEDEV2_DATA/Website/WeddingPortfolio` as the source-of-truth repository.
- Created and opened the first Pull Request targeting `develop`.

## Solved issues
1) **Docker credentials could not be saved (permission denied)**
   - Fix: moved Docker config to a writable path via `DOCKER_CONFIG`.

2) **Git missing on QNAP**
   - Fix: used containerized git (`alpine/git`) instead of installing packages on the NAS.

3) **SSH to GitHub failed (`Permission denied (publickey)`)**
   - Fix: generated/used an ED25519 key on QNAP and added the public key to GitHub SSH keys.

4) **Git blocked by "dubious ownership"**
   - Fix: added `-c safe.directory=/repo` to the container git wrapper.
5) Enabled pushing from Visual Studio on Windows by switching origin to HTTPS and rebasing to resolve "fetch first" rejection.

## Current open items
- Ensure `main` and `develop` are both protected by rulesets: PR-only merges, block direct pushes.
- Stabilize the `gitc` wrapper (keep it consistent after reconnects).
- Start Sprint 1: create monorepo scaffold (`apps/web`, `apps/api`, `infra/docker`) and basic Next.js pages/layout.

## Schedule impact
- **Bootstrap time spent:** 3h 30m
- This is slightly higher than the optimistic 2–3h expectation, but still within a reasonable setup budget for a QNAP-based workflow.
- **No change** to the overall 4-week plan yet. If bootstrap exceeds ~6–7h total, move non-critical UI polish to the optional Week 5 bucket.
