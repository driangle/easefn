# easefn

A minimal easing function library. One interface, many curves.

```ts
type EaseFn = (t: number) => number
```

Every function takes a normalized `t` in `[0, 1]` and returns a value in `[0, 1]`. Zero dependencies, tree-shakeable, fully typed.

## Install

```sh
npm install easefn
```

## Usage

```ts
import { easeInOutCubic } from 'easefn'

const t = 0.5
const eased = easeInOutCubic(t) // 0.5
```

Use with animations:

```ts
import { easeOutExpo } from 'easefn'

function animate(duration: number) {
  const start = performance.now()

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const eased = easeOutExpo(t)
    element.style.transform = `translateX(${eased * 300}px)`
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
```

## Available easings

| Category | Functions |
|----------|-----------|
| Basic | `linear` |
| Quadratic | `easeInQuad`, `easeOutQuad`, `easeInOutQuad` |
| Cubic | `easeInCubic`, `easeOutCubic`, `easeInOutCubic` |
| Sine | `easeInSine`, `easeOutSine`, `easeInOutSine` |
| Exponential | `easeInExpo`, `easeOutExpo`, `easeInOutExpo` |
| Circular | `easeInCirc`, `easeOutCirc`, `easeInOutCirc` |
| Bounce | `easeInBounce`, `easeOutBounce`, `easeInOutBounce` |

### Configurable (factory functions)

Factory functions return an `EaseFn`, letting you tune the curve:

```ts
import { easeInPoly, easeInBack, easeInElastic } from 'easefn'

const quartic = easeInPoly(4)
const gentleBack = easeInBack(1.2)
const wobbly = easeInElastic({ amplitude: 1.5, period: 0.4 })
```

| Factory | Parameters | Variants |
|---------|-----------|----------|
| `easeInPoly` / `easeOutPoly` / `easeInOutPoly` | `n` (power) | Generalizes quad, cubic, etc. |
| `makeEaseInExpo` / `makeEaseOutExpo` / `makeEaseInOutExpo` | `exponent` | Tunable exponential curve |
| `easeInBack` / `easeOutBack` / `easeInOutBack` | `overshoot` (default `1.70158`) | Overshoot before settling |
| `easeInElastic` / `easeOutElastic` / `easeInOutElastic` | `{ amplitude, period }` | Spring-like oscillation |

## Documentation

Interactive docs with live curve visualizations: **[driangle.github.io/easefn](https://driangle.github.io/easefn/)**

## License

MIT
