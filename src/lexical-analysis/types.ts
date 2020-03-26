export const enum SyntaxKind {
  /**
   * JSON Structural Tokens
   * LeftSquareBracket | LeftCurlyBracket | RightSquareBracket | RightCurlyBracket | Colon | Comma
   */

  /**
   * token: `[`
   * description: left square bracket
   * unicode: `U+005B`
   */
  LeftSquareBracket,

  /**
   * token: `{`
   * description: left curly bracket
   * unicode: `U+007B`
   */
  LeftCurlyBracket,

  /**
   * token: `]`
   * description: right square bracket
   * unicode: `U+005D`
   */
  RightSquareBracket,

  /**
   * token: `}`
   * description: right curly bracket
   * unicode: `U+007D`
   */
  RightCurlyBracket,

  /**
   * token: `:`
   * description: colon
   * unicode: `U+003A`
   */
  Colon,

  /**
   * token: `,`
   * description: comma
   * unicode: `U+002C`
   */
  Comma,

  /**
   * JSON Literal NameTokens:
   * True | False | Null
   */

  /**
   * token: `true`
   * description: boolean type `true`
   * unicode: `U+0074` + `U+0072` + `U+0075` + `U+0065`
   */
  True,

  /**
   * token: `false`
   * description: boolean type `false`
   * unicode: `U+0066` + `U+0061` + `U+006C` + `U+0073` + `U+0065`
   */
  False,

  /**
   * token: `null`
   * unicode: `U+006E` + `U+0075` + `U+006C` + `U+006C`
   */
  Null,

  /**
   * WhiteSpaceTokens
   * CharacterTabulation | LineFeed | CarriageReturn | Space
   */

  /**
   * token: `\t`
   * description: character tabulation
   * unicode: `U+0009`
   */
  CharacterTabulation,

  /**
   * token: `\n`
   * description: line feed
   * unicode: `U+000A`
   */
  LineFeed,

  /**
   * token: `\r`
   * description: carriage return
   * unicode: `U+000D`
   */
  CarriageReturn,

  /**
   * token: `\s`
   * description: space
   * unicode: `U+0020`
   */
  Space,
}

export type JSONValueGrammar =
  | SyntaxKind.LeftSquareBracket
  | SyntaxKind.LeftCurlyBracket
  | SyntaxKind.RightSquareBracket
  | SyntaxKind.RightCurlyBracket
  | SyntaxKind.Colon
  | SyntaxKind.Comma
  | SyntaxKind.True
  | SyntaxKind.False
  | SyntaxKind.Null
