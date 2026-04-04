---
id: "01knd2bcf"
title: "Port easefn to C#"
status: pending
priority: low
dependencies: []
tags: ["csharp", "port"]
created: 2026-04-04
---

# Port easefn to C#

## Objective

Create a C# implementation of easefn as a NuGet package. Each easing function takes a `double` in `[0, 1]` and returns `double`. Useful for Unity, Godot (C# scripting), and .NET applications.

## Tasks

- [ ] Set up `csharp/` directory with `.csproj` and project structure
- [ ] Implement all easing functions matching the TypeScript API
- [ ] Add `CubicBezier` and `Steps` factories
- [ ] Add unit tests (xUnit or NUnit)
- [ ] Publish to NuGet
- [ ] Update root README languages table

## Acceptance Criteria

- All easing functions from the TS package are implemented with matching output
- Zero dependencies
- Idiomatic C# naming conventions (PascalCase)
- Tests pass for all functions
