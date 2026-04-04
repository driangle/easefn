# Getting Started

## Bundle Size

| | Size |
|---|---|
| Minified | ~2.4 KB |
| Minified + gzip | ~890 B |

## Installation

```bash
npm install easefn
```

## Usage

Every easing function has the signature `(t: number) => number`, where `t` is a value from 0 to 1.

```ts
import { easeInOutCubic } from 'easefn'

function animate(duration: number) {
  const start = performance.now()

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const eased = easeInOutCubic(t)

    // Use `eased` to drive position, opacity, color, etc.
    element.style.transform = `translateX(${eased * 300}px)`

    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
```

## Factory Functions

Some easings accept parameters to customize their behavior:

```ts
import { makeEaseInPoly, makeEaseInBack, makeEaseInElastic } from 'easefn'

// Polynomial with custom power
const quartic = makeEaseInPoly(4)

// Back with custom overshoot
const gentleBack = makeEaseInBack(1.2)

// Elastic with custom amplitude and period
const wobbly = makeEaseInElastic({ amplitude: 1.5, period: 0.4 })
```

## Type

```ts
type EaseFn = (t: number) => number
```
