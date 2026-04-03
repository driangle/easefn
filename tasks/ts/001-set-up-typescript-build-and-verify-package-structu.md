---
title: "Set up TypeScript build and verify package structure"
id: "001"
status: pending
priority: critical
type: chore
tags: ["typescript", "infrastructure", "phase:1-foundation"]
created: "2026-04-03"
---

# Set up TypeScript build and verify package structure

## Objective

Ensure the TypeScript package builds cleanly, produces correct output in dist/, and the package.json is ready for consumption (correct exports, types, files fields).

## Tasks

- [ ] Run npm install in ts/
- [ ] Run tsc and verify dist/ output contains index.js and index.d.ts
- [ ] Verify the EaseFn type is exported in the .d.ts
- [ ] Add a .gitignore for node_modules/ and dist/
- [ ] Verify package.json exports, main, and types fields resolve correctly

## Acceptance Criteria

- `npm run build` succeeds with zero errors
- dist/index.js and dist/index.d.ts are generated
- EaseFn type and all 16 easing functions are exported in the declaration file
