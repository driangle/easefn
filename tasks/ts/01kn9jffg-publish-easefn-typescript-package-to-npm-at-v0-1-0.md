---
title: "Publish easefn TypeScript package to npm at v0.1.0"
id: "01kn9jffg"
status: pending
priority: medium
type: chore
tags: ["typescript", "publishing", "phase:2-release"]
dependencies: ["001", "002"]
created: "2026-04-03"
---

# Publish easefn TypeScript package to npm at v0.1.0

## Objective

Prepare and publish the easefn TypeScript package to npm once v0.1.0 is ready. Ensure the package is clean, correctly scoped, and has all metadata needed for discoverability.

## Tasks

- [ ] Verify package.json has correct name, version (0.1.0), description, license, keywords, and repository fields
- [ ] Add a README.md to ts/ (or ensure the root README is included in the package)
- [ ] Run npm pack and inspect the tarball contents — no extraneous files
- [ ] Ensure dist/ builds cleanly and the package exports resolve
- [ ] Publish to npm with npm publish

## Acceptance Criteria

- Package is live on npm as easefn@0.1.0
- npm install easefn works and the EaseFn type + all 16 functions are importable
- Package contains only dist/, README, LICENSE, and package.json
