---
name: add-easing
description: "Add a new easing function to the easefn library — implementation, tests, and documentation. Use this skill whenever the user wants to add, create, or implement a new easing function, curve, or interpolation method. Also trigger when the user says things like 'add easeInX', 'new easing', 'implement a spring easing', or 'I want to add a custom curve'. Even if they just name a function like 'easeInElastic' or describe a curve behavior, this skill applies."
user_invocable: false
---

# Add Easing Function

This skill guides you through adding a new easing function to the easefn library. Every new function requires three things: the implementation, tests, and a documentation page. The goal is to keep the library consistent — new functions should feel like they've always been part of the codebase.

## Step 1: Understand what's being added

Before writing code, determine:

1. **Function type**: Is it a simple `EaseFn` (like `easeInQuad`) or a factory that returns an `EaseFn` (like `makeEaseInBack(overshoot)`)? Factories use the `make*` prefix.
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

**Factory function** — export a `make*` function that returns an `EaseFn`, plus a default `EaseFn` export:
```ts
// Single positional param:
export const makeEaseInExample =
  (param = DEFAULT): EaseFn =>
  (t) => /* formula using param */;

// Multiple params — use an object:
export const makeEaseInExample = ({
  paramA = 1,
  paramB = 0.3,
}: { paramA?: number; paramB?: number } = {}): EaseFn => {
  // Pre-compute constants from params here
  return (t) => /* formula */;
};

// Default EaseFn with default params (add to allFunctions in tests):
export const easeInExample: EaseFn = makeEaseInExample();
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

**For factory functions** — test boundary conditions, parameter effects, default equivalence, and add the default `EaseFn` to `allFunctions`:
```ts
describe("makeEaseInExample", () => {
  it("default matches easeInExample", () => {
    const fn = easefn.makeEaseInExample();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeInExample(t));
    }
  });

  it("parameter changes curve shape", () => {
    const gentle = easefn.makeEaseInExample(1);
    const aggressive = easefn.makeEaseInExample(5);
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

**For factory easings** — use `FactoryEasingPage`. Each variant needs a `snippet` function that returns the call expression with current param values (this renders a live, copy-pasteable code example below each curve):

```md
# Category Name

Brief description. Explain what the parameters control.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeEaseInExample, makeEaseOutExample, makeEaseInOutExample } from 'easefn'

const snippet = (name) => (p) => `${name}(${p.paramName})`

const variants = [
  { name: 'makeEaseInExample', factory: (p) => makeEaseInExample(p.paramName), snippet: snippet('makeEaseInExample') },
  { name: 'makeEaseOutExample', factory: (p) => makeEaseOutExample(p.paramName), snippet: snippet('makeEaseOutExample') },
  { name: 'makeEaseInOutExample', factory: (p) => makeEaseInOutExample(p.paramName), snippet: snippet('makeEaseInOutExample') },
]

const params = [
  { name: 'paramName', default: 3, min: 1, max: 10, step: 0.1 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
```

For factories with **object params** (like Elastic), the snippet should format the object:
```ts
const snippet = (name) => (p) =>
  `${name}({ amplitude: ${p.amplitude}, period: ${p.period} })`
```

### 4b: Add to the "All Easings" grid

Edit `apps/docs/easings/index.md` and add entries for the new functions to the `easings` array:

1. Add the import at the top
2. Add entries using the `e()` helper — the third argument is the docs page filename (without extension):

```ts
e('easeInExample', easeInExample, 'example'),
e('easeOutExample', easeOutExample, 'example'),
e('easeInOutExample', easeInOutExample, 'example'),
```

For factory functions that have a default `EaseFn` export, use it directly (no call needed):
```ts
e('easeInExample', easeInExample, 'example'),
```

This page is a full-width grid showing every easing at a glance, with links to each function's detail section.

### 4c: Add to the sidebar

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
cd ../apps/docs && npx vitepress build
```

All tests must pass, the library must compile, and the docs site must build without errors.

## Notes

- **Curve colors** are automatic — the page components assign colors based on the function name: easeIn variants get `--curve-in` (blue), easeOut gets `--curve-out` (pink), easeInOut gets `--curve-inout` (purple). No manual color assignment needed.
- **Code snippets** for simple easings are automatic (just the import line). Factory easings need the `snippet` function on each variant to show the parameterized call.
- **Anchors** — the h3 headings on detail pages have `id` attributes matching the function name, so the All Easings grid links directly to each function (e.g. `/easings/example#easeInExample`).
