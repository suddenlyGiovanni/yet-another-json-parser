/**
 * `AssertEqual` checks whether a given type T is equal to an expected type Expected:
 * 1- Is T a subtype of Expected?
 * 2- Is Expected a subtype of T?
 * If both are true then T is equal to Expected.
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

/**
 * A JSON text is a sequence of tokens formed from Unicode code points that conforms to the JSON
 * value grammar. The set of tokens includes six structural tokens, strings, numbers, and three
 * literal name tokens.
 */
type JSONText = string

export enum StructuralTokens {
  '[' = 'U+005B', // left square bracket
  '{' = 'U+007B', // left curly bracket
  ']' = 'U+005D', // right square bracket
  '}' = 'U+007D', // right curly bracket
  ':' = 'U+003A', // colon
  ',' = 'U+002C', // comma
}

export enum LiteralNameTokens {
  'true' = 'U+0074 U+0072 U+0075 U+0065', // true
  'false' = 'U+0066 U+0061 U+006C U+0073 U+0065', // false
  'null' = 'U+006E U+0075 U+006C U+006C', // null
}

/**
 * Insignificant whitespace is allowed before or after any token.
 * Whitespace is any sequence of one or more of the following code points:
 * - character tabulation (U+0009),
 * - line feed (U+000A),
 * - carriage return (U+000D), and
 * - space (U+0020).
 * Whitespace is not allowed within any token, except that space is allowed in strings.
 */
