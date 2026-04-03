---
title: "Create VitePress documentation site with interactive examples"
id: "01kn9zrxe"
status: completed
priority: high
type: feature
tags: ["docs", "vitepress", "web"]
created: "2026-04-03"
---

# Create VitePress documentation site with interactive examples

## Objective

Create a minimal VitePress documentation site for easefn that showcases every easing function with interactive visualizations. Each function should have an auto-generated easing curve graph (computed from the function itself) and live animation demos showing motion and color transitions.

## Tasks

- [x] Set up VitePress project with minimal styling (clean, no heavy theming)
- [x] Create a landing page with an overview of the library and list of all easing functions
- [x] Build a reusable Vue component that renders an easing curve graph (canvas or SVG) by sampling the EaseFn at regular intervals
- [x] Build a motion animation demo component (e.g. a ball/box translating across a track, driven by the easing function)
- [x] Build a color animation demo component (e.g. a gradient or swatch interpolating between two colors using the easing function)
- [x] Generate a page for each easing function (including factory variants with default args) showing: curve graph, motion demo, color demo
- [x] For factory functions (Poly, Expo, Back, Elastic), add interactive controls (sliders/inputs) to adjust meta arguments and see the curve/animation update live
- [x] Ensure the site builds and deploys as a static site

## Acceptance Criteria

- VitePress site builds successfully with `npm run docs:build`
- Every exported easing function has a dedicated page with its curve graph and animation demos
- Curve graphs are derived by evaluating the actual easing functions (not static images)
- Motion animation demo visibly shows the easing effect (e.g. position over time)
- Color animation demo visibly shows easing-driven color interpolation
- Factory functions have interactive parameter controls that update the visualizations in real time
- Styling is minimal and clean — no heavy theme customization
