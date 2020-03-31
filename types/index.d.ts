/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/number-literal-case */
/* eslint-disable no-magic-numbers */
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
export type JSONText = string

/**
 * Insignificant whitespace is allowed before or after any token.
 * Whitespace is any sequence of one or more of the following code points:
 * - character tabulation (U+0009),
 * - line feed (U+000A),
 * - carriage return (U+000D), and
 * - space (U+0020).
 * Whitespace is not allowed within any token, except that space is allowed in strings.
 */

/* @internal */
export const enum CharacterCodes {
  nullCharacter = 0,
  maxAsciiCharacter = 0x7f,

  /**
   * @example
   * escape chr: `\n`
   * hexNumb: 0x0A
   * decimal: 10
   */
  lineFeed = 0x0a,

  /**
   * @example
   * escape chr: `\r`
   * hexNumb: 0x0D
   * decimal: 13
   */
  carriageReturn = 0x0d,
  lineSeparator = 0x2028,
  paragraphSeparator = 0x2029,
  nextLine = 0x0085,

  // Unicode 3.0 space characters
  /**
   * @example
   * escape chr: `\s`
   * hexNumb: 0x0020
   * decimal: 32
   */
  space = 0x0020,
  nonBreakingSpace = 0x00a0, //
  enQuad = 0x2000,
  emQuad = 0x2001,
  enSpace = 0x2002,
  emSpace = 0x2003,
  threePerEmSpace = 0x2004,
  fourPerEmSpace = 0x2005,
  sixPerEmSpace = 0x2006,
  figureSpace = 0x2007,
  punctuationSpace = 0x2008,
  thinSpace = 0x2009,
  hairSpace = 0x200a,
  zeroWidthSpace = 0x200b,
  narrowNoBreakSpace = 0x202f,
  ideographicSpace = 0x3000,
  mathematicalSpace = 0x205f,
  ogham = 0x1680,

  _ = 0x5f,
  $ = 0x24,

  _0 = 0x30,
  _1 = 0x31,
  _2 = 0x32,
  _3 = 0x33,
  _4 = 0x34,
  _5 = 0x35,
  _6 = 0x36,
  _7 = 0x37,
  _8 = 0x38,
  _9 = 0x39,

  a = 0x61,
  b = 0x62,
  c = 0x63,
  d = 0x64,
  e = 0x65,
  f = 0x66,
  g = 0x67,
  h = 0x68,
  i = 0x69,
  j = 0x6a,
  k = 0x6b,
  l = 0x6c,
  m = 0x6d,
  n = 0x6e,
  o = 0x6f,
  p = 0x70,
  q = 0x71,
  r = 0x72,
  s = 0x73,
  t = 0x74,
  u = 0x75,
  v = 0x76,
  w = 0x77,
  x = 0x78,
  y = 0x79,
  z = 0x7a,

  A = 0x41,
  B = 0x42,
  C = 0x43,
  D = 0x44,
  E = 0x45,
  F = 0x46,
  G = 0x47,
  H = 0x48,
  I = 0x49,
  J = 0x4a,
  K = 0x4b,
  L = 0x4c,
  M = 0x4d,
  N = 0x4e,
  O = 0x4f,
  P = 0x50,
  Q = 0x51,
  R = 0x52,
  S = 0x53,
  T = 0x54,
  U = 0x55,
  V = 0x56,
  W = 0x57,
  X = 0x58,
  Y = 0x59,
  Z = 0x5a,

  /**
   * @example
   * chr: &
   * hexNumb: 0x26
   * decimal: 38
   */
  ampersand = 0x26,

  /**
   * @example
   * chr: *
   * hexNumb: 0x2a
   * decimal: 42
   */
  asterisk = 0x2a,

  /**
   * @example
   * chr: @
   * hexNumb: 0x40
   * decimal: 64
   */
  at = 0x40,

  /**
   * @example
   * chr: \
   * hexNumb: 0x5C
   * decimal: 92
   */
  backslash = 0x5c,

  /**
   * @example
   * chr: `
   * hexNumb: 0x60
   * decimal: 96
   */
  backtick = 0x60,

  /**
   * @example
   * chr: |
   * hexNumb: 0x7C
   * decimal: 124
   */
  bar = 0x7c,

  /**
   * @example
   * chr: ^
   * hexNumb: 0x5E
   * decimal: 94
   */
  caret = 0x5e,

  /**
   * @example
   * chr: }
   * hexNumb: 0x7D
   * decimal: 125
   */
  closeBrace = 0x7d,

  /**
   * @example
   * chr: ]
   * hexNumb: 0x5D
   * decimal: 93
   */
  closeBracket = 0x5d,

  /**
   * @example
   * chr: )
   * hexNumb: 0x29
   * decimal: 41
   */
  closeParen = 0x29,

  /**
   * @example
   * chr: :
   * hexNumb: 0x3A
   * decimal: 58
   */
  colon = 0x3a,

  /**
   * @example
   * chr: ,
   * hexNumb: 0x2C
   * decimal: 44
   */
  comma = 0x2c,

  /**
   * @example
   * chr: .
   * hexNumb: 0x2E
   * decimal: 46
   */
  dot = 0x2e,

  /**
   * @example
   * chr: "
   * hexNumb: 0x22
   * decimal: 34
   */
  doubleQuote = 0x22,

  /**
   * @example
   * chr: =
   * hexNumb: 0x3D
   * decimal: 61
   */
  equals = 0x3d,

  /**
   * @example
   * chr: !
   * hexNumb: 0x21
   * decimal: 33
   */
  exclamation = 0x21,

  /**
   * @example
   * chr: >
   * hexNumb: 0x3E
   * decimal: 62
   */
  greaterThan = 0x3e,

  /**
   * @example
   * chr: #
   * hexNumb: 0x23
   * decimal: 35
   */
  hash = 0x23,

  /**
   * @example
   * chr: <
   * hexNumb: 0x3C
   * decimal: 60
   */
  lessThan = 0x3c,

  /**
   * @example
   * chr: -
   * hexNumb: 0x2D
   * decimal: 45
   */
  minus = 0x2d,

  /**
   * @example
   * chr: {
   * hexNumb: 0x7B
   * decimal: 123
   */
  openBrace = 0x7b,

  /**
   * @example
   * chr: [
   * hexNumb: 0x5B
   * decimal: 91
   */
  openBracket = 0x5b,

  /**
   * @example
   * chr: (
   * hexNumb: 0x28
   * decimal: 40
   */
  openParen = 0x28,

  /**
   * @example
   * chr: %
   * hexNumb: 0x25
   * decimal: 37
   */
  percent = 0x25,

  /**
   * @example
   * chr: +
   * hexNumb: 0x2B
   * decimal: 43
   */
  plus = 0x2b,

  /**
   * @example
   * chr: ?
   * hexNumb: 0x3F
   * decimal: 63
   */
  question = 0x3f,

  /**
   * @example
   * chr: ;
   * hexNumb: 0x3B
   * decimal: 59
   */
  semicolon = 0x3b,

  /**
   * @example
   * chr: '
   * hexNumb: 0x27
   * decimal: 39
   */
  singleQuote = 0x27,

  /**
   * @example
   * chr: /
   * hexNumb: 0x2F
   * decimal: 47
   */
  slash = 0x2f,

  /**
   * @example
   * chr: ~
   * hexNumb: 0x7E
   * decimal: 126
   */
  tilde = 0x7e,

  /**
   * @example
   * escape chr: `\b`
   * hexNumb: 0x08
   * decimal: 8
   */
  backspace = 0x08,

  /**
   * @example
   * escape chr: `\f`
   * hexNumb: 0x0C
   * decimal: 12
   */
  formFeed = 0x0c,
  byteOrderMark = 0xfeff,

  /**
   * @example
   * escape chr: `\t`
   * hexNumb: 0x09
   * decimal: 9
   */
  tab = 0x09,

  /**
   * @example
   * escape chr: `\v`
   * hexNumb: 0x0B
   * decimal: 11
   */
  verticalTab = 0x0b,
}

export const enum TokenFlags {
  None = 0,

  /**
   * @internal
   */
  PrecedingLineBreak = 1 << 0,

  /**
   * @internal
   */
  Unterminated = 1 << 2,

  /**
   * @internal
   */
  ExtendedUnicodeEscape = 1 << 3,

  /**
   * @example
   * e.g. `10e2`
   */
  Scientific = 1 << 4,

  /**
   * @example
   * e.g. `0777`
   */
  Octal = 1 << 5,

  /**
   * @example
   * e.g. `0x00000000`
   */
  HexSpecifier = 1 << 6, //

  /**
   * @example
   * e.g. `0b0110010000000000`
   */
  BinarySpecifier = 1 << 7,

  /**
   * @example
   * e.g. `0o777`
   */
  OctalSpecifier = 1 << 8,

  /**
   * @internal
   * @example
   * e.g. `0b1100_0101`
   */
  ContainsSeparator = 1 << 9,

  /**
   * @internal
   */
  UnicodeEscape = 1 << 10,

  /**
   * @internal
   * @example
   * e.g. `\uhello`
   */
  ContainsInvalidEscape = 1 << 11,

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  NumericLiteralFlags = Scientific |
    Octal |
    HexSpecifier |
    BinaryOrOctalSpecifier |
    ContainsSeparator,
}
