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

  const monotonic = [...easeInFunctions, ...easeOutFunctions].filter((n) => !n.includes("Bounce"));
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

describe("easeInPoly", () => {
  it("n=2 matches easeInQuad", () => {
    const poly2 = easefn.easeInPoly(2);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly2(t)).toBeCloseTo(easefn.easeInQuad(t));
    }
  });

  it("n=3 matches easeInCubic", () => {
    const poly3 = easefn.easeInPoly(3);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly3(t)).toBeCloseTo(easefn.easeInCubic(t));
    }
  });

  it("higher n produces steeper curve", () => {
    const poly4 = easefn.easeInPoly(4);
    const poly2 = easefn.easeInPoly(2);
    expect(poly4(0.5)).toBeLessThan(poly2(0.5));
  });
});

describe("easeOutPoly", () => {
  it("n=2 matches easeOutQuad", () => {
    const poly2 = easefn.easeOutPoly(2);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly2(t)).toBeCloseTo(easefn.easeOutQuad(t));
    }
  });

  it("boundary conditions", () => {
    const poly5 = easefn.easeOutPoly(5);
    expect(poly5(0)).toBeCloseTo(0);
    expect(poly5(1)).toBeCloseTo(1);
  });
});

describe("easeInOutPoly", () => {
  it("n=2 matches easeInOutQuad", () => {
    const poly2 = easefn.easeInOutPoly(2);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly2(t)).toBeCloseTo(easefn.easeInOutQuad(t));
    }
  });

  it("n=3 matches easeInOutCubic", () => {
    const poly3 = easefn.easeInOutPoly(3);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      expect(poly3(t)).toBeCloseTo(easefn.easeInOutCubic(t));
    }
  });

  it("symmetry around t=0.5", () => {
    const poly4 = easefn.easeInOutPoly(4);
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

describe("easeInBack", () => {
  it("boundary conditions with default overshoot", () => {
    const fn = easefn.easeInBack();
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("goes below 0 (overshoots)", () => {
    const fn = easefn.easeInBack();
    expect(fn(0.2)).toBeLessThan(0);
  });

  it("larger overshoot produces more negative values", () => {
    const small = easefn.easeInBack(1);
    const large = easefn.easeInBack(3);
    expect(large(0.2)).toBeLessThan(small(0.2));
  });
});

describe("easeOutBack", () => {
  it("boundary conditions with default overshoot", () => {
    const fn = easefn.easeOutBack();
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("goes above 1 (overshoots)", () => {
    const fn = easefn.easeOutBack();
    expect(fn(0.8)).toBeGreaterThan(1);
  });
});

describe("easeInOutBack", () => {
  it("boundary conditions", () => {
    const fn = easefn.easeInOutBack();
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(1)).toBeCloseTo(1);
  });

  it("symmetry around t=0.5", () => {
    const fn = easefn.easeInOutBack();
    for (const offset of [0.1, 0.2, 0.3, 0.4]) {
      const sum = fn(0.5 - offset) + fn(0.5 + offset);
      expect(sum).toBeCloseTo(1);
    }
  });

  it("custom overshoot changes curve shape", () => {
    const small = easefn.easeInOutBack(1);
    const large = easefn.easeInOutBack(3);
    expect(large(0.2)).not.toBeCloseTo(small(0.2));
  });
});

describe("easeInElastic", () => {
  it("boundary conditions with defaults", () => {
    const fn = easefn.easeInElastic();
    expect(fn(0)).toBe(0);
    expect(fn(1)).toBe(1);
  });

  it("oscillates below 0 near t=1", () => {
    const fn = easefn.easeInElastic();
    const values = [0.3, 0.4, 0.5, 0.6, 0.7].map((t) => fn(t));
    const hasNegative = values.some((v) => v < 0);
    expect(hasNegative).toBe(true);
  });

  it("custom amplitude and period", () => {
    const fn = easefn.easeInElastic({ amplitude: 1.5, period: 0.4 });
    expect(fn(0)).toBe(0);
    expect(fn(1)).toBe(1);
  });
});

describe("easeOutElastic", () => {
  it("boundary conditions with defaults", () => {
    const fn = easefn.easeOutElastic();
    expect(fn(0)).toBe(0);
    expect(fn(1)).toBe(1);
  });

  it("oscillates above 1", () => {
    const fn = easefn.easeOutElastic();
    const values = [0.3, 0.4, 0.5, 0.6, 0.7].map((t) => fn(t));
    const hasAboveOne = values.some((v) => v > 1);
    expect(hasAboveOne).toBe(true);
  });
});

describe("easeInOutElastic", () => {
  it("boundary conditions with defaults", () => {
    const fn = easefn.easeInOutElastic();
    expect(fn(0)).toBe(0);
    expect(fn(1)).toBe(1);
  });

  it("symmetry around t=0.5", () => {
    const fn = easefn.easeInOutElastic();
    for (const offset of [0.1, 0.2, 0.3, 0.4]) {
      const sum = fn(0.5 - offset) + fn(0.5 + offset);
      expect(sum).toBeCloseTo(1, 5);
    }
  });
});
