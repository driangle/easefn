---
title: "Add test coverage report with README badge"
id: "01kncz95v"
status: completed
priority: medium
type: feature
tags: ["ci", "testing"]
created: "2026-04-04"
---

# Add test coverage report with README badge

## Objective

Add test coverage reporting to the CI pipeline and display the coverage percentage as a badge on the README / GitHub home page. This gives contributors and users visibility into how well the codebase is tested.

## Tasks

- [x] Configure vitest to generate a coverage report (e.g. via `@vitest/coverage-v8`)
- [x] Add a coverage step to the CI workflow (`.github/workflows/ci.yml`)
- [x] Upload coverage data to a badge service (e.g. Codecov or Coveralls)
- [x] Add a coverage badge to `README.md` showing the current coverage percentage

## Acceptance Criteria

- `vitest run --coverage` generates a coverage report locally
- CI uploads coverage results on every push to `main` and on PRs
- A coverage percentage badge is visible on the README / GitHub repo home page
- Badge updates automatically when coverage changes on `main`
