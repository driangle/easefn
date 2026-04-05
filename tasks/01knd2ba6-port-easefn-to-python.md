---
id: "01knd2ba6"
title: "Port easefn to Python"
status: pending
priority: medium
dependencies: []
tags: ["python", "port"]
created: 2026-04-04
---

# Port easefn to Python

## Objective

Create a Python implementation of easefn as a PyPI package. Each easing function takes a float `t` in `[0, 1]` and returns a float. Zero dependencies, typed with type hints.

## Tasks

- [ ] Set up `python/` directory with `pyproject.toml` and package structure
- [ ] Implement all easing functions matching the TypeScript API
- [ ] Add type hints throughout
- [ ] Add unit tests (pytest)
- [ ] Add `cubic_bezier` and `steps` factories
- [ ] Publish to PyPI

## Acceptance Criteria

- All easing functions from the TS package are implemented with matching output
- Zero dependencies
- Full type hint coverage
- Tests pass for all functions
