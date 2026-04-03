import { describe, it, expect } from "vitest";
import * as easefn from "./index.js";

const allFunctions = [
  "linear",
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeInSine",
  "easeOutSine",
  "easeInOutSine",
  "easeInExpo",
  "easeOutExpo",
  "easeInOutExpo",
  "easeInCirc",
  "easeOutCirc",
  "easeInOutCirc",
] as const;

const easeInFunctions = allFunctions.filter((n) => n.startsWith("easeIn") && !n.includes("Out"));
const easeOutFunctions = allFunctions.filter((n) => n.startsWith("easeOut"));
const easeInOutFunctions = allFunctions.filter((n) => n.includes("InOut"));

describe("boundary conditions", () => {
  for (const name of allFunctions) {
    it(`${name}(0) = 0`, () => {
      expect(easefn[name](0)).toBeCloseTo(0);
    });

    it(`${name}(1) = 1`, () => {
      expect(easefn[name](1)).toBeCloseTo(1);
    });
  }
});

describe("linear", () => {
  it("returns t unchanged", () => {
    for (const t of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
      expect(easefn.linear(t)).toBe(t);
    }
  });
});

describe("monotonicity", () => {
  const samplePoints = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  for (const name of [...easeInFunctions, ...easeOutFunctions]) {
    it(`${name} is monotonically non-decreasing`, () => {
      const values = samplePoints.map((t) => easefn[name](t));
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThanOrEqual(values[i - 1] - 1e-10);
      }
    });
  }
});

describe("easeInOut symmetry around t=0.5", () => {
  const offsets = [0.1, 0.2, 0.3, 0.4, 0.5];

  for (const name of easeInOutFunctions) {
    it(`${name}(t) + ${name}(1-t) ≈ 1`, () => {
      for (const offset of offsets) {
        const t = 0.5 - offset;
        const sum = easefn[name](t) + easefn[name](1 - t);
        expect(sum).toBeCloseTo(1, 10);
      }
    });
  }
});

describe("easeIn curves are below linear at midpoint", () => {
  for (const name of easeInFunctions) {
    it(`${name}(0.5) < 0.5`, () => {
      expect(easefn[name](0.5)).toBeLessThan(0.5);
    });
  }
});

describe("easeOut curves are above linear at midpoint", () => {
  for (const name of easeOutFunctions) {
    it(`${name}(0.5) > 0.5`, () => {
      expect(easefn[name](0.5)).toBeGreaterThan(0.5);
    });
  }
});
