import { SyntaxKind, TokenFlags } from 'types'

export type ErrorCallback = (message: string, length: number) => void

export interface Lexer {
  /**
   * returns the start position of whitespace before current token
   *
   * @returns {number}
   * @memberof Lexer
   */
  getStartPos(): number

  /**
   * returns the whole text passed to the Lexer
   *
   * @returns {string}
   * @memberof Lexer
   */
  getText(): string

  /**
   * returns the current position (end position of text of current token)
   *
   * @returns {number}
   * @memberof Lexer
   */
  getTextPos(): number

  /**
   * returns the current Syntax Token
   *
   * @returns {SyntaxKind}
   * @memberof Lexer
   */
  getToken(): SyntaxKind

  getTokenFlags(): TokenFlags

  /**
   * returns the Start position of text of current token
   *
   * @returns {number}
   * @memberof Lexer
   */
  getTokenPos(): number

  /**
   * returns the text representation of the current token
   *
   * @returns {string}
   * @memberof Lexer
   */
  getTokenText(): string

  /**
   * returns the current token value
   *
   * @returns {string}
   * @memberof Lexer
   */
  getTokenValue(): string

  /**
   * returns a boolean value indicating if the lexer at the current position
   * is preceded by a line brake:
   * * line feed
   * * carriage return
   * * line separator
   * * paragraph separator
   *
   * @returns {boolean}
   * @memberof Lexer
   */
  hasPrecedingLineBreak(): boolean

  /**
   * checks if the current token is an Identifier
   *
   * @returns {boolean}
   * @memberof Lexer
   */
  isIdentifier(): boolean

  /**
   * returns a boolean value indicating if the token is not terminated correctly to according to
   * the JSON syntax
   *
   * @returns {boolean}
   * @memberof Lexer
   */
  isUnterminated(): boolean
  /**
   * Invokes the provided callback then unconditionally restores the lexer to the state it was in
   * immediately prior to invoking the callback.
   * The result of invoking the callback is returned from this function.
   *
   * @param {() => T} callback
   * @returns {T}
   * @memberof Lexer
   */
  lookAhead<T>(callback: () => T): T

  // hasUnicodeEscape(): boolean

  // isReservedWord(): boolean

  /**
   * steps over the next Token,
   * updates Lexer internal state (position in the scan, current token details etc)
   * and returns the matching SyntaxKind
   *
   * @returns {SyntaxKind}
   * @memberof Lexer
   */
  scan(): SyntaxKind

  setOnError(onError: ErrorCallback | undefined): void

  /**
   * Sets the text for the Lexer to scan. An optional sub-range starting point and length
   * can be provided to have the Lexer only scan a portion of the text.
   *
   * @param {(string | undefined)} text
   * @param {number} [start]
   * @param {number} [length]
   * @memberof Lexer
   */
  setText(text: string | undefined, start?: number, length?: number): void

  /**
   * sets the lexer to the specified position in the text
   *
   * @param {number} textPos
   * @memberof Lexer
   */
  setTextPos(textPos: number): void
}
