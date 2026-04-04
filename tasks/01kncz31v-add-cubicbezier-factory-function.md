---
title: "Add cubicBezier factory function"
id: "01kncz31v"
status: completed
priority: medium
type: feature
tags: ["easing", "api"]
created: "2026-04-04"
---

# Add cubicBezier factory function

## Objective

Add a `makeCubicBezier(x1, y1, x2, y2)` factory function that returns an `EaseFn`. This is the most widely used easing primitive — CSS `cubic-bezier()`, Figma, After Effects, and other design tools all export curves in this format. Supporting it bridges the gap between design tooling and code.

## Tasks

- [x] Implement `makeCubicBezier(x1, y1, x2, y2): EaseFn` using Newton-Raphson or binary search to solve the bezier curve for a given `t`
- [x] Validate that `x1` and `x2` are clamped to `[0, 1]` (CSS spec requirement)
- [x] Add tests: boundary conditions, known CSS presets (`ease`, `ease-in`, `ease-out`, `ease-in-out`), monotonicity
- [x] Add documentation page with interactive bezier curve editor
- [x] Export from `index.ts`

## Acceptance Criteria

- `makeCubicBezier(0.25, 0.1, 0.25, 1.0)` matches CSS `ease` to within ±0.001
- `f(0) ≈ 0` and `f(1) ≈ 1` for all valid inputs
- Output is monotonically non-decreasing when `x1, x2 ∈ [0, 1]`
- All existing tests continue to pass
- Function is tree-shakeable (named export)
