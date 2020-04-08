/**
 * `AssertEqual` checks whether a given type T is equal to an expected type Expected:
 * 1- Is T a subtype of Expected?
 * 2- Is Expected a subtype of T?
 * If both are true then T is equal to Expected.
 *
 * @example
 * function createPoint(x: number, y: number) {
 *  return {x, y};
 * }
 *
 * const cond1: AssertEqual<
 *    typeof createPoint,
 *    (x: number, y: number) => { x: number; y: number }
 *  > = true
 *
 * const cond2: AssertEqual<
 *    ReturnType<typeof createPoint>,
 *    { x: number; y: number }
 *  > = true
 */

export type AssertEqual<T, Expected> = T extends Expected
  ? Expected extends T
    ? true
    : never
  : never
