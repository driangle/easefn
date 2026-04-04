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
  "easeOutBounce",
  "easeInBounce",
  "easeInOutBounce",
  "easeInBack",
  "easeOutBack",
  "easeInOutBack",
  "easeInElastic",
  "easeOutElastic",
  "easeInOutElastic",
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

  const monotonic = [...easeInFunctions, ...easeOutFunctions].filter(
    (n) => !n.includes("Bounce") && !n.includes("Back") && !n.includes("Elastic"),
  );
  for (const name of monotonic) {
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

// --- Factory function tests ---

describe("makeEaseInPoly", () => {
  it("n=2 matches easeInQuad", () => {
    const poly2 = easefn.makeEaseInPoly(2);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly2(t)).toBeCloseTo(easefn.easeInQuad(t));
    }
  });

  it("n=3 matches easeInCubic", () => {
    const poly3 = easefn.makeEaseInPoly(3);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly3(t)).toBeCloseTo(easefn.easeInCubic(t));
    }
  });

  it("higher n produces steeper curve", () => {
    const poly4 = easefn.makeEaseInPoly(4);
    const poly2 = easefn.makeEaseInPoly(2);
    expect(poly4(0.5)).toBeLessThan(poly2(0.5));
  });
});

describe("makeEaseOutPoly", () => {
  it("n=2 matches easeOutQuad", () => {
    const poly2 = easefn.makeEaseOutPoly(2);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly2(t)).toBeCloseTo(easefn.easeOutQuad(t));
    }
  });

  it("boundary conditions", () => {
    const poly5 = easefn.makeEaseOutPoly(5);
    expect(poly5(0)).toBeCloseTo(0);
    expect(poly5(1)).toBeCloseTo(1);
  });
});

describe("makeEaseInOutPoly", () => {
  it("n=2 matches easeInOutQuad", () => {
    const poly2 = easefn.makeEaseInOutPoly(2);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly2(t)).toBeCloseTo(easefn.easeInOutQuad(t));
    }
  });

  it("n=3 matches easeInOutCubic", () => {
    const poly3 = easefn.makeEaseInOutPoly(3);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly3(t)).toBeCloseTo(easefn.easeInOutCubic(t));
    }
  });

  it("symmetry around t=0.5", () => {
    const poly4 = easefn.makeEaseInOutPoly(4);
    for (const offset of [0.1, 0.2, 0.3, 0.4]) {
      const sum = poly4(0.5 - offset) + poly4(0.5 + offset);
      expect(sum).toBeCloseTo(1);
    }
  });
});

describe("makeEaseInExpo", () => {
  it("exponent=10 matches default easeInExpo", () => {
    const custom = easefn.makeEaseInExpo(10);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(custom(t)).toBeCloseTo(easefn.easeInExpo(t));
    }
  });

  it("higher exponent produces steeper curve", () => {
    const exp15 = easefn.makeEaseInExpo(15);
    const exp5 = easefn.makeEaseInExpo(5);
    expect(exp15(0.5)).toBeLessThan(exp5(0.5));
  });

  it("boundary conditions", () => {
    const custom = easefn.makeEaseInExpo(8);
    expect(custom(0)).toBe(0);
    expect(custom(1)).toBeCloseTo(1);
  });
});

describe("makeEaseOutExpo", () => {
  it("exponent=10 matches default easeOutExpo", () => {
    const custom = easefn.makeEaseOutExpo(10);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(custom(t)).toBeCloseTo(easefn.easeOutExpo(t));
    }
  });

  it("boundary conditions", () => {
    const custom = easefn.makeEaseOutExpo(8);
    expect(custom(0)).toBeCloseTo(0);
    expect(custom(1)).toBe(1);
  });
});

describe("makeEaseInOutExpo", () => {
  it("exponent=10 matches default easeInOutExpo", () => {
    const custom = easefn.makeEaseInOutExpo(10);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(custom(t)).toBeCloseTo(easefn.easeInOutExpo(t));
    }
  });

  it("boundary conditions", () => {
    const custom = easefn.makeEaseInOutExpo(8);
    expect(custom(0)).toBe(0);
    expect(custom(1)).toBe(1);
  });

  it("symmetry around t=0.5", () => {
    const custom = easefn.makeEaseInOutExpo(12);
    for (const offset of [0.1, 0.2, 0.3, 0.4]) {
      const sum = custom(0.5 - offset) + custom(0.5 + offset);
      expect(sum).toBeCloseTo(1);
    }
  });
});

describe("makeEaseInBack", () => {
  it("default matches easeInBack", () => {
    const fn = easefn.makeEaseInBack();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeInBack(t));
    }
  });

  it("goes below 0 (overshoots)", () => {
    const fn = easefn.makeEaseInBack();
    expect(fn(0.2)).toBeLessThan(0);
  });

  it("larger overshoot produces more negative values", () => {
    const small = easefn.makeEaseInBack(1);
    const large = easefn.makeEaseInBack(3);
    expect(large(0.2)).toBeLessThan(small(0.2));
  });
});

describe("makeEaseOutBack", () => {
  it("default matches easeOutBack", () => {
    const fn = easefn.makeEaseOutBack();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeOutBack(t));
    }
  });

  it("goes above 1 (overshoots)", () => {
    const fn = easefn.makeEaseOutBack();
    expect(fn(0.8)).toBeGreaterThan(1);
  });
});

describe("makeEaseInOutBack", () => {
  it("default matches easeInOutBack", () => {
    const fn = easefn.makeEaseInOutBack();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeInOutBack(t));
    }
  });

  it("symmetry around t=0.5", () => {
    const fn = easefn.makeEaseInOutBack();
    for (const offset of [0.1, 0.2, 0.3, 0.4]) {
      const sum = fn(0.5 - offset) + fn(0.5 + offset);
      expect(sum).toBeCloseTo(1);
    }
  });

  it("custom overshoot changes curve shape", () => {
    const small = easefn.makeEaseInOutBack(1);
    const large = easefn.makeEaseInOutBack(3);
    expect(large(0.2)).not.toBeCloseTo(small(0.2));
  });
});

describe("makeCubicBezier", () => {
  it("f(0) = 0 and f(1) = 1", () => {
    const fn = easefn.makeCubicBezier({ x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 });
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("matches CSS ease (0.25, 0.1, 0.25, 1.0) characteristics", () => {
    const ease = easefn.makeCubicBezier({ x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 });
    // CSS ease starts slow, accelerates, then decelerates
    expect(ease(0.25)).toBeGreaterThan(0.3);
    expect(ease(0.25)).toBeLessThan(0.5);
    expect(ease(0.5)).toBeGreaterThan(0.7);
    expect(ease(0.75)).toBeGreaterThan(0.9);
  });

  it("CSS ease-in (0.42, 0, 1, 1)", () => {
    const fn = easefn.makeCubicBezier({ x1: 0.42, y1: 0, x2: 1, y2: 1 });
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
    // ease-in should be below linear at midpoint
    expect(fn(0.5)).toBeLessThan(0.5);
  });

  it("CSS ease-out (0, 0, 0.58, 1)", () => {
    const fn = easefn.makeCubicBezier({ x1: 0, y1: 0, x2: 0.58, y2: 1 });
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
    // ease-out should be above linear at midpoint
    expect(fn(0.5)).toBeGreaterThan(0.5);
  });

  it("CSS ease-in-out (0.42, 0, 0.58, 1)", () => {
    const fn = easefn.makeCubicBezier({ x1: 0.42, y1: 0, x2: 0.58, y2: 1 });
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(0.5)).toBeCloseTo(0.5, 2);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("linear bezier (0, 0, 1, 1) approximates identity", () => {
    const fn = easefn.makeCubicBezier({ x1: 0, y1: 0, x2: 1, y2: 1 });
    for (const t of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
      expect(fn(t)).toBeCloseTo(t, 2);
    }
  });

  it("is monotonically non-decreasing for valid x values", () => {
    const fn = easefn.makeCubicBezier({ x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 });
    const points = Array.from({ length: 101 }, (_, i) => i / 100);
    const values = points.map((t) => fn(t));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1] - 1e-10);
    }
  });

  it("clamps x1 and x2 to [0, 1]", () => {
    const fn = easefn.makeCubicBezier({ x1: -0.5, y1: 0.5, x2: 1.5, y2: 0.5 });
    // Should still produce valid output (clamped to 0, 0.5, 1, 0.5)
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("allows y values outside [0, 1] (overshoot)", () => {
    const fn = easefn.makeCubicBezier({ x1: 0.5, y1: -0.5, x2: 0.5, y2: 1.5 });
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
    // y values outside [0,1] means output can overshoot
  });

  it("different control points produce different curves", () => {
    const a = easefn.makeCubicBezier({ x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 });
    const b = easefn.makeCubicBezier({ x1: 0.42, y1: 0, x2: 0.58, y2: 1 });
    expect(a(0.5)).not.toBeCloseTo(b(0.5), 2);
  });
});

describe("makeSteps", () => {
  describe("jump-end (default)", () => {
    it("f(0) = 0 and f(1) = 1", () => {
      const fn = easefn.makeSteps({ n: 4 });
      expect(fn(0)).toBe(0);
      expect(fn(1)).toBe(1);
    });

    it("makeSteps(1) behaves like CSS step-end (0 until t=1)", () => {
      const fn = easefn.makeSteps({ n: 1, position: "jump-end" });
      expect(fn(0)).toBe(0);
      expect(fn(0.25)).toBe(0);
      expect(fn(0.5)).toBe(0);
      expect(fn(0.99)).toBe(0);
      expect(fn(1)).toBe(1);
    });

    it("produces n distinct output levels", () => {
      const fn = easefn.makeSteps({ n: 4 });
      const values = new Set(
        [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((t) => fn(t)),
      );
      // 4 steps jump-end: levels are 0, 0.25, 0.5, 0.75, plus 1 at t=1
      expect(values.size).toBe(5);
    });

    it("holds constant within each step interval", () => {
      const fn = easefn.makeSteps({ n: 4 });
      // First interval [0, 0.25): all should be 0
      expect(fn(0.1)).toBe(0);
      expect(fn(0.2)).toBe(0);
      // Second interval [0.25, 0.5): all should be 0.25
      expect(fn(0.25)).toBe(0.25);
      expect(fn(0.3)).toBe(0.25);
    });
  });

  describe("jump-start", () => {
    it("f(0) = 0 and f(1) = 1", () => {
      const fn = easefn.makeSteps({ n: 4, position: "jump-start" });
      expect(fn(0)).toBe(0);
      expect(fn(1)).toBe(1);
    });

    it("makeSteps(1) behaves like CSS step-start (1 from t>0)", () => {
      const fn = easefn.makeSteps({ n: 1, position: "jump-start" });
      expect(fn(0)).toBe(0);
      expect(fn(0.01)).toBe(1);
      expect(fn(0.5)).toBe(1);
      expect(fn(1)).toBe(1);
    });

    it("jumps immediately after t=0", () => {
      const fn = easefn.makeSteps({ n: 4, position: "jump-start" });
      expect(fn(0.01)).toBe(0.25);
    });
  });

  describe("jump-both", () => {
    it("f(0) = 0 and f(1) = 1", () => {
      const fn = easefn.makeSteps({ n: 3, position: "jump-both" });
      expect(fn(0)).toBe(0);
      expect(fn(1)).toBe(1);
    });

    it("first step jumps above 0, last step below 1", () => {
      const fn = easefn.makeSteps({ n: 3, position: "jump-both" });
      // n=3, n+1=4 levels: 0, 1/4, 2/4, 3/4, 1
      expect(fn(0.01)).toBe(0.25);
      expect(fn(0.99)).toBe(0.75);
    });
  });

  describe("jump-none", () => {
    it("f(0) = 0 and f(1) = 1", () => {
      const fn = easefn.makeSteps({ n: 4, position: "jump-none" });
      expect(fn(0)).toBe(0);
      expect(fn(1)).toBe(1);
    });

    it("stays at 0 initially and reaches 1 before end", () => {
      const fn = easefn.makeSteps({ n: 4, position: "jump-none" });
      // n=4, n-1=3 risers: levels 0, 1/3, 2/3, 1
      expect(fn(0.1)).toBeCloseTo(0);
      expect(fn(0.8)).toBeCloseTo(1);
    });

    it("has correct intermediate levels", () => {
      const fn = easefn.makeSteps({ n: 4, position: "jump-none" });
      // interval [0.25, 0.5): floor(t*4)=1, 1/3
      expect(fn(0.3)).toBeCloseTo(1 / 3);
      // interval [0.5, 0.75): floor(t*4)=2, 2/3
      expect(fn(0.6)).toBeCloseTo(2 / 3);
    });
  });

  it("different step counts produce different curves", () => {
    const s3 = easefn.makeSteps({ n: 3 });
    const s5 = easefn.makeSteps({ n: 5 });
    expect(s3(0.4)).not.toBe(s5(0.4));
  });
});

describe("makeEaseInElastic", () => {
  it("default matches easeInElastic", () => {
    const fn = easefn.makeEaseInElastic();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeInElastic(t));
    }
  });

  it("oscillates below 0 near t=1", () => {
    const fn = easefn.makeEaseInElastic();
    const values = [0.3, 0.4, 0.5, 0.6, 0.7].map((t) => fn(t));
    const hasNegative = values.some((v) => v < 0);
    expect(hasNegative).toBe(true);
  });

  it("custom amplitude and period", () => {
    const fn = easefn.makeEaseInElastic({ amplitude: 1.5, period: 0.4 });
    expect(fn(0)).toBe(0);
    expect(fn(1)).toBe(1);
  });
});

describe("makeEaseOutElastic", () => {
  it("default matches easeOutElastic", () => {
    const fn = easefn.makeEaseOutElastic();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeOutElastic(t));
    }
  });

  it("oscillates above 1", () => {
    const fn = easefn.makeEaseOutElastic();
    const values = [0.3, 0.4, 0.5, 0.6, 0.7].map((t) => fn(t));
    const hasAboveOne = values.some((v) => v > 1);
    expect(hasAboveOne).toBe(true);
  });
});

describe("makeEaseInOutElastic", () => {
  it("default matches easeInOutElastic", () => {
    const fn = easefn.makeEaseInOutElastic();
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(fn(t)).toBeCloseTo(easefn.easeInOutElastic(t));
    }
  });

  it("symmetry around t=0.5", () => {
    const fn = easefn.makeEaseInOutElastic();
    for (const offset of [0.1, 0.2, 0.3, 0.4]) {
      const sum = fn(0.5 - offset) + fn(0.5 + offset);
      expect(sum).toBeCloseTo(1, 5);
    }
  });
});
