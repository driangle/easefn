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
