---
id: "01knd2bbm"
title: "Port easefn to C (header-only)"
status: pending
priority: low
dependencies: []
tags: ["c", "port"]
created: 2026-04-04
---

# Port easefn to C (header-only)

## Objective

Create a single-header C implementation of easefn. Functions take a `double t` in `[0, 1]` and return `double`. Usable as a universal FFI base for other language bindings.

## Tasks

- [ ] Set up `c/` directory with `easefn.h` header
- [ ] Implement all easing functions as `static inline` functions
- [ ] Add `cubic_bezier` and `steps` factories
- [ ] Add test suite (using a minimal test framework or raw asserts)
- [ ] Add usage example
- [ ] Update root README languages table

## Acceptance Criteria

- Single-header library, no build system required
- All easing functions from the TS package are implemented with matching output
- Compiles cleanly with `-Wall -Wextra -pedantic` on gcc and clang
- Tests pass for all functions
