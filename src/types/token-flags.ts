/* eslint-disable no-magic-numbers */
/* eslint-disable no-bitwise */
export const enum TokenFlags {
  None = 0,

  /**
   * @access private
   */
  PrecedingLineBreak = 1 << 0,

  /**
   * @access private
   */
  Unterminated = 1 << 2,

  /**
   * @access private
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
   * @access private
   * @example
   * e.g. `0b1100_0101`
   */
  ContainsSeparator = 1 << 9,

  /**
   * @access private
   */
  UnicodeEscape = 1 << 10,

  /**
   * @access private
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
