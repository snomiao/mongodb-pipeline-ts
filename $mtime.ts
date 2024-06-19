import enhancedMs from "enhanced-ms";

type $before = { $lt: Date };
type $after = { $gt: Date };
type $stale = { $not: { $gt: Date } };
type $fresh = { $gte: Date };

export function $stale(at: Date): $stale;
export function $stale(interval: number): $stale;
/**
 * Parse a human readable timeframe string to milliseconds.
 * @param input Timeframe string before now.
 * @example
 * ms('2 seconds') // => 2000
 * ms('2 minutes and 30 seconds') // => 150000
 * ms('1.5 days and 1.5 hours') // => 135000000
 *
 * ms('2 hours - 30 minutes') // => 5400000
 * ms('1 day * 365') // => 31536000000
 * ms('1.5 days + 1.5 hours') // => 135000000
 *
 * ms('1 week - 3 days * 2') // => 86400000
 * ms('(1 week - 3 days) * 2') // => 691200000
 */
export function $stale(duration: string): $stale;
export function $stale(x: Date | number | string): $stale;
export function $stale(x: Date | number | string) {
  if (typeof x === "string") return $stale(enhancedMs(x));
  if (typeof x === "number") return $stale(new Date(+new Date() - x));
  return { $not: { $gt: x } };
}
export function $fresh(at: Date): $fresh;
export function $fresh(interval: number): $fresh;
/**
 * Parse a human readable timeframe string to milliseconds.
 * @param input Timeframe string before now.
 * @example
 * ms('2 seconds') // => 2000
 * ms('2 minutes and 30 seconds') // => 150000
 * ms('1.5 days and 1.5 hours') // => 135000000
 *
 * ms('2 hours - 30 minutes') // => 5400000
 * ms('1 day * 365') // => 31536000000
 * ms('1.5 days + 1.5 hours') // => 135000000
 *
 * ms('1 week - 3 days * 2') // => 86400000
 * ms('(1 week - 3 days) * 2') // => 691200000
 */
export function $fresh(duration: string): $fresh;
export function $fresh(x: Date | number | string): $fresh;
export function $fresh(x: Date | number | string) {
  if (typeof x === "string") return $fresh(enhancedMs(x));
  if (typeof x === "number") return $fresh(new Date(+new Date() - x));
  return { $gte: x };
}

export function $before(at: Date): $before;
export function $before(interval: number): $before;
/**
 * Parse a human readable timeframe string to milliseconds.
 * @param input Timeframe string before now.
 * @example
 * ms('2 seconds') // => 2000
 * ms('2 minutes and 30 seconds') // => 150000
 * ms('1.5 days and 1.5 hours') // => 135000000
 *
 * ms('2 hours - 30 minutes') // => 5400000
 * ms('1 day * 365') // => 31536000000
 * ms('1.5 days + 1.5 hours') // => 135000000
 *
 * ms('1 week - 3 days * 2') // => 86400000
 * ms('(1 week - 3 days) * 2') // => 691200000
 */
export function $before(duration: string): $before;
export function $before(x: Date | string | number): $before;
export function $before(x: Date | string | number) {
  if (typeof x === "string") return $before(enhancedMs(x));
  if (typeof x === "number") return $before(new Date(+new Date() - x));
  return { $lt: x };
}

export function $after(at: Date): $after;
export function $after(interval: number): $after;
/**
 * Parse a human readable timeframe string to milliseconds.
 * @param input Timeframe string before now.
 * @example
 * ms('2 seconds') // => 2000
 * ms('2 minutes and 30 seconds') // => 150000
 * ms('1.5 days and 1.5 hours') // => 135000000
 *
 * ms('2 hours - 30 minutes') // => 5400000
 * ms('1 day * 365') // => 31536000000
 * ms('1.5 days + 1.5 hours') // => 135000000
 *
 * ms('1 week - 3 days * 2') // => 86400000
 * ms('(1 week - 3 days) * 2') // => 691200000
 */
export function $after(duration: string): $after;
export function $after(x: Date | string | number): $after;
export function $after(x: Date | string | number) {
  if (typeof x === "string") return $after(enhancedMs(x));
  if (typeof x === "number") return $after(new Date(+new Date() - x));
  return { $gt: x };
}
