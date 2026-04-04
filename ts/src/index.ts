/** A function that maps a value t in [0, 1] to a value in [0, 1]. */
export type EaseFn = (t: number) => number;

// --- Basic ---

export const linear: EaseFn = (t) => t;

// --- Quadratic ---

export const easeInQuad: EaseFn = (t) => t * t;

export const easeOutQuad: EaseFn = (t) => t * (2 - t);

export const easeInOutQuad: EaseFn = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// --- Cubic ---

export const easeInCubic: EaseFn = (t) => t * t * t;

export const easeOutCubic: EaseFn = (t) => --t * t * t + 1;

export const easeInOutCubic: EaseFn = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// --- Sine ---

export const easeInSine: EaseFn = (t) => 1 - Math.cos((t * Math.PI) / 2);

export const easeOutSine: EaseFn = (t) => Math.sin((t * Math.PI) / 2);

export const easeInOutSine: EaseFn = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

// --- Exponential ---

export const easeInExpo: EaseFn = (t) =>
  t === 0 ? 0 : Math.pow(2, 10 * (t - 1));

export const easeOutExpo: EaseFn = (t) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const easeInOutExpo: EaseFn = (t) => {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

// --- Circular ---

export const easeInCirc: EaseFn = (t) => 1 - Math.sqrt(1 - t * t);

export const easeOutCirc: EaseFn = (t) => Math.sqrt(1 - --t * t);

export const easeInOutCirc: EaseFn = (t) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - (-2 * t + 2) ** 2) + 1) / 2;

// --- Polynomial (configurable power, generalizes Quad/Cubic) ---

export const makeEaseInPoly =
  (n: number): EaseFn =>
  (t) =>
    t ** n;

export const makeEaseOutPoly =
  (n: number): EaseFn =>
  (t) =>
    1 - (1 - t) ** n;

export const makeEaseInOutPoly =
  (n: number): EaseFn =>
  (t) =>
    t < 0.5 ? 2 ** (n - 1) * t ** n : 1 - (-2 * t + 2) ** n / 2;

// --- Exponential (configurable exponent) ---

export const makeEaseInExpo =
  (exponent: number): EaseFn =>
  (t) =>
    t === 0 ? 0 : Math.pow(2, exponent * (t - 1));

export const makeEaseOutExpo =
  (exponent: number): EaseFn =>
  (t) =>
    t === 1 ? 1 : 1 - Math.pow(2, -exponent * t);

export const makeEaseInOutExpo =
  (exponent: number): EaseFn =>
  (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return t < 0.5
      ? Math.pow(2, 2 * exponent * t - exponent) / 2
      : (2 - Math.pow(2, -2 * exponent * t + exponent)) / 2;
  };

// --- Back (configurable overshoot) ---

const DEFAULT_OVERSHOOT = 1.70158;

export const makeEaseInBack =
  (overshoot = DEFAULT_OVERSHOOT): EaseFn =>
  (t) =>
    t * t * ((overshoot + 1) * t - overshoot);

export const makeEaseOutBack =
  (overshoot = DEFAULT_OVERSHOOT): EaseFn =>
  (t) => {
    t = t - 1;
    return t * t * ((overshoot + 1) * t + overshoot) + 1;
  };

export const makeEaseInOutBack =
  (overshoot = DEFAULT_OVERSHOOT): EaseFn =>
  (t) => {
    const s = overshoot * 1.525;
    if (t < 0.5) {
      return (2 * t) ** 2 * ((s + 1) * 2 * t - s) / 2;
    }
    const u = 2 * t - 2;
    return (u * u * ((s + 1) * u + s) + 2) / 2;
  };

export const easeInBack: EaseFn = makeEaseInBack();
export const easeOutBack: EaseFn = makeEaseOutBack();
export const easeInOutBack: EaseFn = makeEaseInOutBack();

// --- Elastic (configurable amplitude and period) ---

export const makeEaseInElastic = ({
  amplitude = 1,
  period = 0.3,
}: { amplitude?: number; period?: number } = {}): EaseFn => {
  const a = Math.max(amplitude, 1);
  const s = (period / (2 * Math.PI)) * Math.asin(1 / a);
  return (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return -(a * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1 - s) * 2 * Math.PI) / period));
  };
};

export const makeEaseOutElastic = ({
  amplitude = 1,
  period = 0.3,
}: { amplitude?: number; period?: number } = {}): EaseFn => {
  const a = Math.max(amplitude, 1);
  const s = (period / (2 * Math.PI)) * Math.asin(1 / a);
  return (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return a * Math.pow(2, -10 * t) * Math.sin(((t - s) * 2 * Math.PI) / period) + 1;
  };
};

export const makeEaseInOutElastic = ({
  amplitude = 1,
  period = 0.45,
}: { amplitude?: number; period?: number } = {}): EaseFn => {
  const a = Math.max(amplitude, 1);
  const s = (period / (2 * Math.PI)) * Math.asin(1 / a);
  return (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) {
      return -(a * Math.pow(2, 20 * t - 10) * Math.sin(((20 * t - 10 - 2 * s) * Math.PI) / period)) / 2;
    }
    return (a * Math.pow(2, -20 * t + 10) * Math.sin(((20 * t - 10 - 2 * s) * Math.PI) / period)) / 2 + 1;
  };
};

export const easeInElastic: EaseFn = makeEaseInElastic();
export const easeOutElastic: EaseFn = makeEaseOutElastic();
export const easeInOutElastic: EaseFn = makeEaseInOutElastic();

// --- Cubic Bezier (CSS cubic-bezier() compatible) ---

const BEZIER_NEWTON_ITERATIONS = 4;
const BEZIER_NEWTON_MIN_SLOPE = 0.001;
const BEZIER_SUBDIVISION_PRECISION = 1e-7;
const BEZIER_SUBDIVISION_MAX_ITERATIONS = 10;

function sampleCurveX(ax: number, bx: number, cx: number, t: number): number {
  return ((ax * t + bx) * t + cx) * t;
}

function sampleCurveY(ay: number, by: number, cy: number, t: number): number {
  return ((ay * t + by) * t + cy) * t;
}

function sampleCurveDerivativeX(ax: number, bx: number, cx: number, t: number): number {
  return (3 * ax * t + 2 * bx) * t + cx;
}

function solveCurveX(ax: number, bx: number, cx: number, x: number): number {
  // Newton-Raphson
  let t = x;
  for (let i = 0; i < BEZIER_NEWTON_ITERATIONS; i++) {
    const slope = sampleCurveDerivativeX(ax, bx, cx, t);
    if (Math.abs(slope) < BEZIER_NEWTON_MIN_SLOPE) break;
    const currentX = sampleCurveX(ax, bx, cx, t) - x;
    t -= currentX / slope;
  }

  // If Newton didn't converge, fall back to binary search
  if (t < 0 || t > 1) t = x;

  let lo = 0;
  let hi = 1;
  t = x;

  for (let i = 0; i < BEZIER_SUBDIVISION_MAX_ITERATIONS; i++) {
    const currentX = sampleCurveX(ax, bx, cx, t) - x;
    if (Math.abs(currentX) < BEZIER_SUBDIVISION_PRECISION) return t;
    if (currentX > 0) {
      hi = t;
    } else {
      lo = t;
    }
    t = (lo + hi) / 2;
  }

  return t;
}

export const makeCubicBezier = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}): EaseFn => {
  // Clamp x values to [0, 1] per CSS spec
  const cx1 = Math.min(1, Math.max(0, x1));
  const cx2 = Math.min(1, Math.max(0, x2));

  // Pre-compute polynomial coefficients
  const cx = 3 * cx1;
  const bx = 3 * (cx2 - cx1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return sampleCurveY(ay, by, cy, solveCurveX(ax, bx, cx, t));
  };
};

// --- Steps (CSS steps() compatible) ---

export type StepPosition = 'jump-start' | 'jump-end' | 'jump-both' | 'jump-none';

export const makeSteps = ({
  n,
  position = 'jump-end',
}: {
  n: number;
  position?: StepPosition;
}): EaseFn => {
  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    switch (position) {
      case 'jump-start':
        return Math.ceil(t * n) / n;
      case 'jump-end':
        return Math.floor(t * n) / n;
      case 'jump-both':
        return Math.ceil(t * n) / (n + 1);
      case 'jump-none':
        return Math.floor(t * n) / (n - 1);
    }
  };
};

// --- Bounce ---

export const easeOutBounce: EaseFn = (t) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

export const easeInBounce: EaseFn = (t) => 1 - easeOutBounce(1 - t);

export const easeInOutBounce: EaseFn = (t) =>
  t < 0.5
    ? (1 - easeOutBounce(1 - 2 * t)) / 2
    : (1 + easeOutBounce(2 * t - 1)) / 2;
