---
id: "01knd2baq"
title: "Port easefn to Go"
status: pending
priority: medium
dependencies: []
tags: ["go", "port"]
created: 2026-04-04
---

# Port easefn to Go

## Objective

Create a Go implementation of easefn as a Go module. Use `func(float64) float64` as the core type. Zero dependencies.

## Tasks

- [ ] Set up `go/` directory with `go.mod` and package structure
- [ ] Implement all easing functions matching the TypeScript API
- [ ] Add unit tests
- [ ] Add `CubicBezier` and `Steps` factories
- [ ] Publish Go module
- [ ] Update root README languages table

## Acceptance Criteria

- All easing functions from the TS package are implemented with matching output
- Zero dependencies
- Idiomatic Go naming conventions
- Tests pass for all functions
