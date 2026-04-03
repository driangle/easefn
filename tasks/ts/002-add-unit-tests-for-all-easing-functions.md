---
title: "Add unit tests for all easing functions"
id: "002"
status: pending
priority: high
type: chore
tags: ["typescript", "testing", "phase:1-foundation"]
created: "2026-04-03"
---

# Add unit tests for all easing functions

## Objective

Add comprehensive unit tests for all 16 easing functions to verify mathematical correctness, boundary conditions, and the EaseFn contract.

## Tasks

- [ ] Set up a test runner (vitest or similar, zero-config preferred)
- [ ] Test boundary conditions: all functions return 0 at t=0 and 1 at t=1
- [ ] Test monotonicity for easeIn/easeOut variants at sample points
- [ ] Test symmetry for easeInOut variants around t=0.5
- [ ] Test linear returns t unchanged
- [ ] Add test script to package.json

## Acceptance Criteria

- All 16 easing functions have tests
- Every function satisfies f(0)=0 and f(1)=1
- Tests pass via npm test
- Tests run in CI-friendly mode (no watch)
