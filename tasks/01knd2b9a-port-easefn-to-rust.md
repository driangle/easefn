---
id: "01knd2b9a"
title: "Port easefn to Rust"
status: pending
priority: medium
dependencies: []
tags: ["rust", "port"]
created: 2026-04-04
---

# Port easefn to Rust

## Objective

Create a Rust implementation of easefn as a `no_std`-compatible crate on crates.io. Use `fn(f64) -> f64` as the core signature. Zero dependencies, minimal, composable.

## Tasks

- [ ] Set up `rust/` directory with `Cargo.toml` and `src/lib.rs`
- [ ] Implement all easing functions matching the TypeScript API
- [ ] Add `#![no_std]` support
- [ ] Add unit tests for all easing functions
- [ ] Add `cubic_bezier` and `steps` factories
- [ ] Publish to crates.io
- [ ] Update root README languages table

## Acceptance Criteria

- All easing functions from the TS package are implemented with matching output
- Crate compiles with `#![no_std]`
- Zero dependencies
- Tests pass for all functions
