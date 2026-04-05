---
id: "01knd2bc4"
title: "Port easefn to Swift"
status: pending
priority: low
dependencies: []
tags: ["swift", "port"]
created: 2026-04-04
---

# Port easefn to Swift

## Objective

Create a Swift implementation of easefn as a Swift Package. Each easing function takes a `Double` in `[0, 1]` and returns `Double`. Suitable for iOS/macOS custom animations.

## Tasks

- [ ] Set up `swift/` directory with `Package.swift`
- [ ] Implement all easing functions matching the TypeScript API
- [ ] Add `cubicBezier` and `steps` factories
- [ ] Add unit tests (XCTest)
- [ ] Publish as Swift Package

## Acceptance Criteria

- All easing functions from the TS package are implemented with matching output
- Zero dependencies
- Idiomatic Swift naming conventions
- Tests pass for all functions
