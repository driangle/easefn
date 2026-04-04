---
title: "Add CI workflow for PRs"
id: "01kncz30c"
status: completed
priority: high
type: feature
tags: ["ci", "github-actions"]
created: "2026-04-04"
---

# Add CI workflow for PRs

## Objective

Add a GitHub Actions CI workflow that runs lint, tests, and build on every pull request. Currently only docs deployment is automated — broken code can be merged without any automated checks.

## Tasks

- [x] Create `.github/workflows/ci.yml` triggered on `pull_request` and `push` to `main`
- [x] Run `make check` (lint, test, build) in the workflow
- [x] Use Node 20 to match the docs workflow
- [ ] Add branch protection rules requiring CI to pass before merge (optional, manual step)

## Acceptance Criteria

- CI workflow runs on every PR targeting `main`
- CI workflow runs on pushes to `main`
- Lint (`tsc --noEmit`), tests (`vitest run`), and build (`tsc`) all execute in CI
- Workflow fails if any step fails
