import { SyntaxKind, TokenFlags } from 'types'

export type ErrorCallback = (message: string, length: number) => void

export interface ILexer {
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
