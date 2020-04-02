import { ErrorCallback } from 'lexical-analysis/lexer'
import { TokenFlags } from 'types/index'

export const enum SyntaxKind {
  /** Bottom type representing an unknown token */
  Unknown,

  /** Token representing the termination of the whole text */
  EndOfFileToken,
  SingleLineCommentTrivia,
  MultiLineCommentTrivia,
  NewLineTrivia,
  WhitespaceTrivia,

  /*
    JSON Structural Tokens
    LeftSquareBracket | LeftCurlyBracket | RightSquareBracket | RightCurlyBracket | Colon | Comma
  */

  /**
   * token: `[`
   * description: left square bracket
   * unicode code point: `U+005B`
   */
  LeftSquareBracket,

  /**
   * token: `{`
   * description: left curly bracket
   * unicode code point: `U+007B`
   */
  LeftCurlyBracket,

  /**
   * token: `]`
   * description: right square bracket
   * unicode code point: `U+005D`
   */
  RightSquareBracket,

  /**
   * token: `}`
   * description: right curly bracket
   * unicode code point: `U+007D`
   */
  RightCurlyBracket,

  /**
   * token: `:`
   * description: colon
   * unicode code point: `U+003A`
   */
  Colon,

  /**
   * token: `,`
   * description: comma
   * unicode code point: `U+002C`
   */
  Comma,

  /*
    JSON Literal NameTokens:
    True | False | Null
  */

  /**
   * token: `true`
   * description: boolean type `true`
   * unicode code point: `U+0074` + `U+0072` + `U+0075` + `U+0065`
   */
  True,

  /**
   * token: `false`
   * description: boolean type `false`
   * unicode code point: `U+0066` + `U+0061` + `U+006C` + `U+0073` + `U+0065`
   */
  False,

  /**
   * token: `null`
   * unicode code point: `U+006E` + `U+0075` + `U+006C` + `U+006C`
   */
  Null,

  /*
    WhiteSpaceTokens
    CharacterTabulation | LineFeed | CarriageReturn | Space
  */

  /**
   * token: `\t`
   * description: character tabulation
   * unicode code point: `U+0009`
   */
  CharacterTabulation,

  /**
   * token: `\n`
   * description: line feed
   * unicode code point: `U+000A`
   */
  LineFeed,

  /**
   * token: `\r`
   * description: carriage return
   * unicode code point: `U+000D`
   */
  CarriageReturn,

  /**
   * token: `\s`
   * description: space
   * unicode code point: `U+0020`
   */
  Space,

  // Literals

  NumericLiteral,

  StringLiteral,

  Identifier,

  // Reserved words
  TrueKeyword,
  FalseKeyword,
  NullKeyword,
}

export type KeywordSyntaxKind =
  | SyntaxKind.TrueKeyword
  | SyntaxKind.FalseKeyword
  | SyntaxKind.NullKeyword

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

export interface Scanner {
  /**
   * returns the start position of whitespace before current token
   * @returns {number}
   * @memberof Scanner
   */
  getStartPos(): number

  /**
   * returns the current Syntax Token
   * @returns {SyntaxKind}
   * @memberof Scanner
   */
  getToken(): SyntaxKind

  /**
   * returns the current position (end position of text of current token)
   * @returns {number}
   * @memberof Scanner
   */
  getTextPos(): number

  /**
   * returns the Start position of text of current token
   * @returns {number}
   * @memberof Scanner
   */
  getTokenPos(): number

  /**
   * returns the text representation of the current token
   * @returns {string}
   * @memberof Scanner
   */
  getTokenText(): string

  /**
   * returns the current token value
   * @returns {string}
   * @memberof Scanner
   */
  getTokenValue(): string

  // hasUnicodeEscape(): boolean

  // hasPrecedingLineBreak(): boolean

  // isIdentifier(): boolean

  // isReservedWord(): boolean

  // isUnterminated(): boolean

  getTokenFlags(): TokenFlags

  /**
   * steps over the next Token,
   * updates Scanner internal state (position in the scan, current token details etc)
   * and returns the matching SyntaxKind
   * @returns {SyntaxKind}
   * @memberof Scanner
   */
  scan(): SyntaxKind

  /**
   * returns the whole text passed to the scanner
   * @returns {string}
   * @memberof Scanner
   */
  getText(): string

  setOnError(onError: ErrorCallback | undefined): void

  /**
   * sets the lexer to the specified position in the text
   * @param {number} textPos
   * @memberof Scanner
   */
  setTextPos(textPos: number): void

  /**
   * Sets the text for the scanner to scan. An optional sub-range starting point and length
   * can be provided to have the scanner only scan a portion of the text.
   * @param {(string | undefined)} text
   * @param {number} [start]
   * @param {number} [length]
   * @memberof Scanner
   */
  setText(text: string | undefined, start?: number, length?: number): void
}
