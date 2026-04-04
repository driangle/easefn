---
title: "Add steps easing function"
id: "01kncz32a"
status: pending
priority: low
type: feature
tags: ["easing", "api"]
created: "2026-04-04"
---

# Add steps easing function

## Objective

Add a `makeSteps(n, position?)` factory function that returns an `EaseFn` producing a staircase curve with `n` discrete steps. This matches CSS `steps()` and is useful for sprite animations, discrete transitions, and frame-by-frame effects.

## Tasks

- [ ] Implement `makeSteps(n: number, position?: 'jump-start' | 'jump-end' | 'jump-both' | 'jump-none'): EaseFn`
- [ ] Default `position` to `'jump-end'` (matches CSS default / `step-end`)
- [ ] Add tests: boundary conditions, correct number of steps, all four position variants
- [ ] Add documentation page with interactive step count slider
- [ ] Export from `index.ts`

## Acceptance Criteria

- `makeSteps(1, 'jump-end')` behaves like CSS `step-end` (0 until t=1)
- `makeSteps(1, 'jump-start')` behaves like CSS `step-start` (1 from t>0)
- Output has exactly `n` distinct levels for `jump-start` and `jump-end`
- `f(0) = 0` and `f(1) = 1` for all positions
- All existing tests continue to pass
