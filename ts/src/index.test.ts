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
