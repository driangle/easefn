# easefn — MVP Spec

## Goal

Provide a single, dependency-free easing function library per language with a shared interface and a standard set of easing curves.

## Core Interface

Each language exports a single type:

```
EaseFn: (t: number) => number
```

- `t` is a normalized input in `[0, 1]`
- Returns a normalized output in `[0, 1]`

## Easing Functions (MVP)

All functions follow the `EaseFn` signature.

### Basic

| Name       | Description              |
|------------|--------------------------|
| `linear`   | No easing, `f(t) = t`   |

### Quadratic

| Name         | Description           |
|--------------|-----------------------|
| `easeInQuad`    | Accelerating from zero |
| `easeOutQuad`   | Decelerating to zero   |
| `easeInOutQuad` | Accelerate then decelerate |

### Cubic

| Name          | Description           |
|---------------|-----------------------|
| `easeInCubic`    | Cubic acceleration     |
| `easeOutCubic`   | Cubic deceleration     |
| `easeInOutCubic` | Cubic ease in-out      |

### Sine

| Name         | Description           |
|--------------|-----------------------|
| `easeInSine`    | Sine acceleration      |
| `easeOutSine`   | Sine deceleration      |
| `easeInOutSine` | Sine ease in-out       |

### Exponential

| Name         | Description             |
|--------------|-------------------------|
| `easeInExpo`    | Exponential acceleration |
| `easeOutExpo`   | Exponential deceleration |
| `easeInOutExpo` | Exponential ease in-out  |

### Circular

| Name         | Description           |
|--------------|-----------------------|
| `easeInCirc`    | Circular acceleration  |
| `easeOutCirc`   | Circular deceleration  |
| `easeInOutCirc` | Circular ease in-out   |

## Constraints

- Zero dependencies
- Single file per language (where practical)
- All functions are pure — no side effects, no state
- Each language package is independently publishable

## Languages

- **MVP:** TypeScript
- **Future:** Rust, Go, Python, Swift

## Package Structure

```
easefn/
├── README.md
├── specs/
│   └── mvp.md
└── ts/
    ├── package.json
    ├── tsconfig.json
    └── src/
        └── index.ts
```
