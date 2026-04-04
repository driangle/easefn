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
| Back | `easeInBack`, `easeOutBack`, `easeInOutBack` |
| Elastic | `easeInElastic`, `easeOutElastic`, `easeInOutElastic` |

### Configurable (factory functions)

Factory functions (`make*`) return an `EaseFn`, letting you tune the curve:

```ts
import { makeEaseInPoly, makeEaseInBack, makeEaseInElastic } from 'easefn'

const quartic = makeEaseInPoly(4)
const gentleBack = makeEaseInBack(1.2)
const wobbly = makeEaseInElastic({ amplitude: 1.5, period: 0.4 })
```

| Factory | Parameters | Variants |
|---------|-----------|----------|
| `makeEaseInPoly` / `makeEaseOutPoly` / `makeEaseInOutPoly` | `n` (power) | Generalizes quad, cubic, etc. |
| `makeEaseInExpo` / `makeEaseOutExpo` / `makeEaseInOutExpo` | `exponent` | Tunable exponential curve |
| `makeEaseInBack` / `makeEaseOutBack` / `makeEaseInOutBack` | `overshoot` (default `1.70158`) | Overshoot before settling |
| `makeEaseInElastic` / `makeEaseOutElastic` / `makeEaseInOutElastic` | `{ amplitude, period }` | Spring-like oscillation |

## Documentation

Interactive docs with live curve visualizations: **[driangle.github.io/easefn](https://driangle.github.io/easefn/)**

## License

MIT
