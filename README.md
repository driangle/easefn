# easefn

A minimal easing function library. One interface, many curves.

## Languages

- [TypeScript](./ts)

## What is this?

`easefn` provides a single `EaseFn` type — a function that takes a number `t` in `[0, 1]` and returns a number in `[0, 1]` — plus a collection of standard easing functions that implement it.

```
type EaseFn = (t: number) => number
```

That's it.
