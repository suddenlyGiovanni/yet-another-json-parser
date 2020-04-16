/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-magic-numbers */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  isCarriageReturnChr,
  isCharacterTabulationChr,
  isLineFeedChr,
  isSpaceChr,
} from 'lexical-analysis/identify'

import {
  CharacterCodes,
  JSONText,
  KeywordSyntaxKind,
  Lexer,
  SyntaxKind,
  TokenFlags,
} from 'types/index'

import type { ErrorCallback } from 'types/lexer'
import { textToKeywordObject } from 'types/syntax-kind'
import { createMapFromTemplate } from 'utils/create-map'

/**
 * DONE:(whitespace, curly brackets, square brackets, colum, comma, string, null, true, false)
 * TODO: numbers
 * TODO: remove unnecessary complexity
 * TODO: clean the naming
 * TODO: better error emission
 *
 * @class LexerImpl
 * @implements {Lexer}
 */
export class LexerImpl implements Lexer {
  /**
   * upper limit of Basic Multilingual Plane (BMP) 65_536
   *
   * @private
   * @memberof Lexer
   */
  public static readonly UNICODE_BMP_TOP_BOUNDARY = 0x10000

  /** end of text */
  private end!: number

  private onError?: ErrorCallback

  /** Current position (end position of text of current token) */
  private pos!: number

  /**
   * a boolean flag that tells the lexer how it  should treat meaningless whitespace
   *
   * @private
   * @type {boolean}
   * @memberof LexerImpl
   */
  // @ts-ignore
  private skipTrivia: boolean

  /** Start position of whitespace before current token */
  // @ts-ignore
  private startPos!: number

  /** the raw string provided to the Lexer */
  private text!: string

  private readonly textToKeyword = createMapFromTemplate(textToKeywordObject)

  private token!: SyntaxKind

  private tokenFlags: TokenFlags

  /**  Start position of text of current token */
  // @ts-ignore
  private tokenPos!: number

  // @ts-ignore
  private tokenValue!: string

  public constructor(
    textInitial?: JSONText,
    onError?: ErrorCallback,
    start?: number,
    length?: number,
    skipTrivia?: boolean
  ) {
    this.onError = onError
    this.setText(textInitial, start, length)
    this.tokenFlags = TokenFlags.None
    this.skipTrivia = skipTrivia ?? true
  }

  public getStartPos(): number {
    return this.startPos
  }

  public getText(): string {
    return this.text
  }

  public getTextPos(): number {
    return this.pos
  }

  public getToken(): SyntaxKind {
    return this.token
  }

  public getTokenFlags(): TokenFlags {
    return this.tokenFlags
  }

  public getTokenPos(): number {
    return this.tokenPos
  }

  public getTokenText(): string {
    return this.text.substring(this.tokenPos, this.pos)
  }

  public getTokenValue(): string {
    return this.tokenValue
  }

  public hasPrecedingLineBreak(): boolean {
    return this.tokenFlags === TokenFlags.PrecedingLineBreak
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public scan(): SyntaxKind {
    this.startPos = this.pos
    // eslint-disable-next-line no-constant-condition, sonarjs/no-one-iteration-loop
    while (true) {
      this.tokenPos = this.pos

      if (this.pos >= this.end) {
        this.token = SyntaxKind.EndOfFileToken
        return this.token
      }

      let ch: number = this.codePointAt(this.text, this.pos)

      switch (ch) {
        case CharacterCodes.lineFeed:
        case CharacterCodes.carriageReturn:
          this.tokenFlags |= TokenFlags.PrecedingLineBreak
          if (
            isCarriageReturnChr(ch) &&
            this.pos + 1 < this.end &&
            isLineFeedChr(this.text.charCodeAt(this.pos + 1))
          ) {
            // consume both CR and LF
            this.pos += 2
          } else {
            this.pos += 1
          }

          this.token = SyntaxKind.NewLineTrivia
          return this.token

        case CharacterCodes.tab:
        case CharacterCodes.verticalTab:
        case CharacterCodes.space:
        case CharacterCodes.formFeed:
          while (
            this.pos < this.end &&
            this.isWhiteSpaceSingleLine(this.codePointAt(this.text, this.pos))
          ) {
            this.pos += 1
          }
          this.token = SyntaxKind.WhitespaceTrivia
          return this.token

        //  structural tokens:
        case CharacterCodes.openBracket:
          this.pos += 1
          this.token = SyntaxKind.LeftSquareBracket
          return this.token

        case CharacterCodes.closeBracket:
          this.pos += 1
          this.token = SyntaxKind.RightSquareBracket
          return this.token

        case CharacterCodes.openBrace:
          this.pos += 1
          this.token = SyntaxKind.LeftCurlyBracket
          return this.token

        case CharacterCodes.closeBrace:
          this.pos += 1
          this.token = SyntaxKind.RightCurlyBracket
          return this.token

        case CharacterCodes.colon:
          this.pos += 1
          this.token = SyntaxKind.Colon
          return this.token

        case CharacterCodes.comma:
          this.pos += 1
          this.token = SyntaxKind.Comma
          return this.token

        case CharacterCodes.doubleQuote:
          this.tokenValue = this.scanString()
          this.token = SyntaxKind.StringLiteral
          return this.token

        case CharacterCodes.minus:
          this.pos += 1
          this.token = SyntaxKind.MinusToken
          return this.token

        case CharacterCodes._0:
        case CharacterCodes._1:
        case CharacterCodes._2:
        case CharacterCodes._3:
        case CharacterCodes._4:
        case CharacterCodes._5:
        case CharacterCodes._6:
        case CharacterCodes._7:
        case CharacterCodes._8:
        case CharacterCodes._9: {
          const { type, value } = this.scanNumber()
          this.token = type
          this.tokenValue = value
          return this.token
        }

        default:
          if (this.isIdentifierStart(ch)) {
            this.pos += this.charSize(ch)
            while (
              this.pos < this.end &&
              this.isIdentifierPart(
                // eslint-disable-next-line no-cond-assign
                (ch = this.codePointAt(this.text, this.pos))
              )
            ) {
              this.pos += this.charSize(ch)
            }

            this.tokenValue = this.text.substring(this.tokenPos, this.pos)
            this.token = this.getIdentifierToken()
            return this.token
          }
          if (this.isWhiteSpaceSingleLine(ch)) {
            this.pos += this.charSize(ch)
            // eslint-disable-next-line no-continue
            continue
          } else if (this.isLineBreak(ch)) {
            this.tokenFlags |= TokenFlags.PrecedingLineBreak
            this.pos += this.charSize(ch)
            // eslint-disable-next-line no-continue
            continue
          }

          this.error(
            `invalid character.\ncould not match unicode position (${ch}) equivalent to character (${String.fromCharCode(
              ch
            )})`
          )
          this.pos += this.charSize(ch)
          this.token = SyntaxKind.Unknown
          return this.token
      }
    }
  }

  public setOnError(onError: ErrorCallback | undefined): void {
    this.onError = onError
  }

  public setText(
    newText: string | undefined,
    start?: number | undefined,
    length?: number | undefined
  ): void {
    this.text = newText || ''
    this.end = length === undefined ? this.text.length : length
    this.setTextPos(start || 0)
  }

  public setTextPos(textPos: number): void {
    this.pos = textPos
    this.startPos = textPos
    this.tokenPos = textPos
    this.token = SyntaxKind.Unknown
    this.tokenValue = undefined!
  }

  private charSize(ch: number): 1 | 2 {
    if (ch >= LexerImpl.UNICODE_BMP_TOP_BOUNDARY) {
      return 2
    }
    return 1
  }

  private codePointAt(string: string, position: number): number {
    return string.codePointAt(position)!
  }

  private error(message: string): void

  private error(message: string, errPos: number, length: number): void

  // eslint-disable-next-line default-param-last
  private error(message: string, errorPos = this.pos, length?: number): void {
    if (this.onError) {
      const oldPos = this.pos
      this.pos = errorPos
      this.onError(message, length || 0)
      this.pos = oldPos
    }
  }

  private getIdentifierToken(): SyntaxKind.Identifier | KeywordSyntaxKind {
    const { length } = this.tokenValue
    if (length >= 2 && length <= 11) {
      const ch = this.tokenValue.charCodeAt(0)
      if (ch >= CharacterCodes.a && ch <= CharacterCodes.z) {
        const literalNameToken = this.textToKeyword.get(this.tokenValue)
        if (literalNameToken !== undefined) {
          return literalNameToken
        }
      }
    }
    return SyntaxKind.Identifier
  }

  private isDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._9
  }

  private isIdentifierPart(ch: number): boolean {
    return (
      (ch >= CharacterCodes.A && ch <= CharacterCodes.Z) ||
      (ch >= CharacterCodes.a && ch <= CharacterCodes.z) ||
      (ch >= CharacterCodes._0 && ch <= CharacterCodes._9) ||
      ch === CharacterCodes.$ ||
      ch === CharacterCodes._
    )
  }

  private isIdentifierStart(ch: number): boolean {
    return (
      (ch >= CharacterCodes.A && ch <= CharacterCodes.Z) ||
      (ch >= CharacterCodes.a && ch <= CharacterCodes.z) ||
      ch === CharacterCodes.$ ||
      ch === CharacterCodes._
    )
  }

  private isLineBreak(ch: number): boolean {
    return (
      isLineFeedChr(ch) ||
      isCarriageReturnChr(ch) ||
      ch === CharacterCodes.lineSeparator ||
      ch === CharacterCodes.paragraphSeparator
    )
  }

  private isWhiteSpaceSingleLine(ch: number): boolean {
    return (
      isSpaceChr(ch) ||
      isCharacterTabulationChr(ch) ||
      ch === CharacterCodes.verticalTab ||
      ch === CharacterCodes.formFeed ||
      ch === CharacterCodes.nonBreakingSpace ||
      ch === CharacterCodes.nextLine ||
      ch === CharacterCodes.ogham ||
      (ch >= CharacterCodes.enQuad && ch <= CharacterCodes.zeroWidthSpace) ||
      ch === CharacterCodes.narrowNoBreakSpace ||
      ch === CharacterCodes.mathematicalSpace ||
      ch === CharacterCodes.ideographicSpace ||
      ch === CharacterCodes.byteOrderMark
    )
  }

  private scanEscapeSequence(): string {
    this.pos += 1
    if (this.pos >= this.end) {
      this.error('Unexpected end of text')
      return ''
    }
    const ch = this.codePointAt(this.text, this.pos)
    this.pos += 1
    switch (ch) {
      case CharacterCodes._0:
        // '\01'
        return '\0'

      case CharacterCodes.b:
        return '\b'

      case CharacterCodes.t:
        return '\t'

      case CharacterCodes.n:
        return '\n'

      case CharacterCodes.v:
        return '\v'

      case CharacterCodes.f:
        return '\f'

      case CharacterCodes.r:
        return '\r'

      case CharacterCodes.singleQuote:
        return "'"

      case CharacterCodes.doubleQuote:
        return '"'

      case CharacterCodes.u:
        this.tokenFlags |= TokenFlags.UnicodeEscape
        /* '\uDDDD' */
        return this.scanHexadecimalEscape()

      // @ts-ignore
      case CharacterCodes.carriageReturn:
        if (
          this.pos < this.end &&
          isLineFeedChr(this.codePointAt(this.text, this.pos))
        ) {
          this.pos += 1
        }

      // falls through
      case CharacterCodes.lineFeed:
      case CharacterCodes.lineSeparator:
      case CharacterCodes.paragraphSeparator:
        return ''

      default:
        return String.fromCharCode(ch)
    }
  }

  /**
   * Scans the given number of hexadecimal digits in the text,
   * returning -1 if the given number is unavailable.
   */
  private scanExactNumberOfHexDigits(): number {
    const valueString = this.scanHexDigits()
    return valueString ? Number.parseInt(valueString, 16) : -1
  }

  private scanHexDigits(): string {
    function isChValidHexDigitUpperCaseLetter(characterCode: number): boolean {
      return (
        characterCode >= CharacterCodes.A && characterCode <= CharacterCodes.F
      )
    }

    function isChValidHexDigitLowerCaseLetter(characterCode: number): boolean {
      return (
        characterCode >= CharacterCodes.a && characterCode <= CharacterCodes.f
      )
    }

    function isChValidHexDigitsNumber(characterCode: number): boolean {
      return (
        characterCode >= CharacterCodes._0 && characterCode <= CharacterCodes._9
      )
    }

    function isChValidLowerCaseHexDigits(characterCode: number): boolean {
      return (
        isChValidHexDigitsNumber(characterCode) ||
        isChValidHexDigitLowerCaseLetter(characterCode)
      )
    }

    let valueChars: number[] = []
    while (valueChars.length < 4) {
      let ch = this.codePointAt(this.text, this.pos)
      if (isChValidHexDigitUpperCaseLetter(ch)) {
        const codePositionDistanceLowerToUppercase =
          CharacterCodes.a - CharacterCodes.A
        // standardize hex literals to lowercase
        ch += codePositionDistanceLowerToUppercase
      } else if (!isChValidLowerCaseHexDigits(ch)) {
        break
      }
      valueChars.push(ch)
      this.pos += 1
    }
    if (valueChars.length < 4) {
      valueChars = []
    }
    return String.fromCharCode(...valueChars)
  }

  private scanHexadecimalEscape(): string {
    const escapedValue = this.scanExactNumberOfHexDigits()

    if (escapedValue >= 0) {
      return String.fromCharCode(escapedValue)
    }
    this.error('Hexadecimal digit expected')
    return ''
  }

  private scanNumber(): {
    type: SyntaxKind.NumericLiteral
    value: string
  } {
    const start = this.pos
    this.scanNumberFragment()
    let decimalFragment: string | undefined

    if (this.codePointAt(this.text, this.pos) === CharacterCodes.dot) {
      // scan the fraction part of the number
      this.pos += 1
      decimalFragment = this.scanNumberFragment()
    }
    let end = this.pos

    if (
      this.codePointAt(this.text, this.pos) === CharacterCodes.E ||
      this.codePointAt(this.text, this.pos) === CharacterCodes.e
    ) {
      this.pos += 1

      this.tokenFlags |= TokenFlags.Scientific
      if (
        this.codePointAt(this.text, this.pos) === CharacterCodes.plus ||
        this.codePointAt(this.text, this.pos) === CharacterCodes.minus
      ) {
        this.pos += 1
      }

      /**
       * @example
       * -0.01e-100
       * sign = [-]0.01e-100
       * mainFragment = -[0].01e-100
       * decimalToken = -0[.]01e-100
       * decimalFragment = -0.[01]e-100
       * preNumericPart = -0.01[e-]100
       * finalFragment = -0.01e-[100]
       * */
      const finalFragment = this.scanNumberFragment()
      if (!finalFragment) {
        this.error('expect a digit after the scientific notation marker ')
      } else {
        end = this.pos
      }
    }

    const results: string = this.text.substring(start, end)

    if (
      decimalFragment !== undefined ||
      this.tokenFlags & TokenFlags.Scientific
    ) {
      return {
        type: SyntaxKind.NumericLiteral,
        value: String(Number(results)), // if value is not an integer, it can be safely coerced to a number
      }
    }

    this.tokenValue = results
    this.token = SyntaxKind.NumericLiteral
    return {
      type: this.token,
      value: this.tokenValue,
    }
  }

  private scanNumberFragment(): string {
    const start = this.pos
    const result = ''

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const ch = this.codePointAt(this.text, this.pos)
      if (this.isDigit(ch)) {
        this.pos += 1
        // eslint-disable-next-line no-continue
        continue
      }
      break
    }

    return result + this.text.substring(start, this.pos)
  }

  private scanString(): string {
    const quote = this.codePointAt(this.text, this.pos)
    this.pos += 1 // step in one place
    let result = ''
    let start: number = this.pos // new starting position

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.pos >= this.end) {
        result += this.text.substring(start, this.pos)
        this.tokenFlags |= TokenFlags.Unterminated
        this.error('Unterminated string literal')
        break
      }
      const ch = this.codePointAt(this.text, this.pos)

      if (ch === quote) {
        result += this.text.substring(start, this.pos)
        this.pos += 1
        break
      }

      if (ch === CharacterCodes.backslash) {
        result += this.text.substring(start, this.pos)
        result += this.scanEscapeSequence()
        start = this.pos
        // eslint-disable-next-line no-continue
        continue
      }

      if (this.isLineBreak(ch)) {
        result += this.text.substring(start, this.pos)
        this.tokenFlags |= TokenFlags.Unterminated
        this.error('Unterminated string literal')
        break
      }

      this.pos += 1
    }

    return result
  }
}
