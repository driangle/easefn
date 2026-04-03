---
name: add-easing
description: "Add a new easing function to the easefn library — implementation, tests, and documentation. Use this skill whenever the user wants to add, create, or implement a new easing function, curve, or interpolation method. Also trigger when the user says things like 'add easeInX', 'new easing', 'implement a spring easing', or 'I want to add a custom curve'. Even if they just name a function like 'easeInElastic' or describe a curve behavior, this skill applies."
user_invocable: false
---

# Add Easing Function

This skill guides you through adding a new easing function to the easefn library. Every new function requires three things: the implementation, tests, and a documentation page. The goal is to keep the library consistent — new functions should feel like they've always been part of the codebase.

## Step 1: Understand what's being added

Before writing code, determine:

1. **Function type**: Is it a simple `EaseFn` (like `easeInQuad`) or a factory that returns an `EaseFn` (like `easeInBack(overshoot)`)?
2. **Variant set**: Easing functions come in triples — easeIn, easeOut, and easeInOut. Always implement all three unless the user specifically asks for just one.
3. **Parameters** (factory only): What parameters does the factory accept? What are sensible defaults, min/max ranges, and step sizes for UI sliders?
4. **Category name**: What section does this belong to? (e.g., "Spring", "Steps", "Smooth"). This determines the docs page filename and sidebar entry.

Read the current source to see the existing patterns:
- **Source**: `ts/src/index.ts`
- **Tests**: `ts/src/index.test.ts`
- **Docs config**: `apps/docs/.vitepress/config.ts`

## Step 2: Implement the function

Add the new function(s) to `ts/src/index.ts`. Follow these patterns:

**Simple EaseFn** — export a const with the `EaseFn` type annotation:
```ts
export const easeInExample: EaseFn = (t) => /* formula */;
```

**Factory function** — export a function that returns an `EaseFn`:
```ts
// Single positional param:
export const easeInExample =
  (param = DEFAULT): EaseFn =>
  (t) => /* formula using param */;

// Multiple params — use an object:
export const easeInExample = ({
  paramA = 1,
  paramB = 0.3,
}: { paramA?: number; paramB?: number } = {}): EaseFn => {
  // Pre-compute constants from params here
  return (t) => /* formula */;
};
```

**Placement**: Add the new section at the end of the file, before the Bounce section (Bounce is conventionally last). Use a section comment:
```ts
// --- CategoryName (description) ---
```

**easeOut from easeIn**: If the easeOut variant is the time-reverse of easeIn, you can derive it:
```ts
export const easeOutExample: EaseFn = (t) => 1 - easeInExample(1 - t);
```

**easeInOut from easeIn/easeOut**: The standard InOut pattern splits at `t = 0.5`:
```ts
export const easeInOutExample: EaseFn = (t) =>
  t < 0.5
    ? easeInExample(2 * t) / 2
    : (2 - easeInExample(2 - 2 * t)) / 2;
```

## Step 3: Add tests

Add tests to `ts/src/index.test.ts`. There are two layers:

### Layer 1: Add to the shared test arrays

If the new function is a **simple EaseFn** (not a factory), add its name to `allFunctions`. This automatically gets you boundary tests, monotonicity tests (for non-bouncing functions), symmetry tests (for InOut variants), and midpoint behavior tests.

```ts
const allFunctions = [
  // ... existing ...
  "easeInExample",
  "easeOutExample",
  "easeInOutExample",
] as const;
```

### Layer 2: Function-specific tests

Add a `describe` block for each new function. Test what makes this function unique:

**For simple functions:**
```ts
describe("easeInExample", () => {
  it("specific behavior that distinguishes this curve", () => {
    // e.g., stays below quadratic, oscillates, overshoots, etc.
  });
});
```

**For factory functions** — test boundary conditions, parameter effects, and equivalence with related functions if applicable:
```ts
describe("easeInExample", () => {
  it("boundary conditions with defaults", () => {
    const fn = easefn.easeInExample();
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("parameter changes curve shape", () => {
    const gentle = easefn.easeInExample(1);
    const aggressive = easefn.easeInExample(5);
    expect(aggressive(0.5)).not.toBeCloseTo(gentle(0.5));
  });
});
```

### What to test

- **Boundary conditions**: `f(0) ≈ 0` and `f(1) ≈ 1` (always)
- **Monotonicity**: non-decreasing for easeIn/easeOut (unless the function intentionally oscillates like Bounce/Elastic)
- **InOut symmetry**: `f(t) + f(1-t) ≈ 1` for easeInOut variants
- **Midpoint behavior**: easeIn below 0.5 at midpoint, easeOut above 0.5
- **Parameter effects**: changing parameters visibly changes output
- **Equivalence**: if this generalizes an existing function (like Poly generalizes Quad/Cubic), test that specific parameter values match

## Step 4: Add documentation

### 4a: Create the easing page

Create a markdown file in `apps/docs/easings/`. The filename should be the category in kebab-case.

**For simple easings** — use `EasingPage`:
```md
# Category Name

Brief description of what this easing does and when you'd use it.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInExample, easeOutExample, easeInOutExample } from 'easefn'

const easings = [
  { name: 'easeInExample', fn: easeInExample },
  { name: 'easeOutExample', fn: easeOutExample },
  { name: 'easeInOutExample', fn: easeInOutExample },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
```

**For factory easings** — use `FactoryEasingPage`:
```md
# Category Name

Brief description. Explain what the parameters control.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { easeInExample, easeOutExample, easeInOutExample } from 'easefn'

const variants = [
  { name: 'easeInExample', factory: (p) => easeInExample(p.paramName) },
  { name: 'easeOutExample', factory: (p) => easeOutExample(p.paramName) },
  { name: 'easeInOutExample', factory: (p) => easeInOutExample(p.paramName) },
]

const params = [
  { name: 'paramName', default: 3, min: 1, max: 10, step: 0.1 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
```

For factories with object params (like Elastic), destructure in the factory callback:
```ts
factory: (p) => easeInExample({ amplitude: p.amplitude, period: p.period })
```

### 4b: Add to the sidebar

Edit `apps/docs/.vitepress/config.ts` and add an entry to the appropriate sidebar section:
- Simple easings go in the **"Easings"** section
- Factory easings go in the **"Configurable Easings"** section

```ts
{ text: 'Category Name', link: '/easings/filename' },
```

## Step 5: Verify

Run the full check to make sure everything works:

```bash
cd ts && npm test && npm run build
cd apps/docs && npm run build
```

All tests must pass, the library must compile, and the docs site must build without errors.
