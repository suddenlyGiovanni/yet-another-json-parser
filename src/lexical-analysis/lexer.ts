/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-magic-numbers */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { CharacterCodes, JSONText, TokenFlags } from '../../types'

import {
  isCarriageReturnChr,
  isCharacterTabulationChr,
  isLineFeedChr,
  isSpaceChr,
} from 'lexical-analysis/identify'
import { SyntaxKind } from 'lexical-analysis/types'

export type ErrorCallback = (message: string, length: number) => void

// TODO: class Lexer implements Scanner
export class Lexer {
  /** the raw string provided to the Lexer */
  private text!: string

  /** Current position (end position of text of current token) */
  private pos!: number

  /** end of text */
  private end!: number

  /** Start position of whitespace before current token */
  // @ts-ignore
  private startPos!: number

  /**  Start position of text of current token */
  // @ts-ignore
  private tokenPos!: number

  private token!: SyntaxKind

  private tokenFlags: TokenFlags

  // @ts-ignore
  private tokenValue!: string

  private readonly onError?: ErrorCallback

  public constructor(
    textInitial?: JSONText,
    onError?: ErrorCallback,
    start?: number,
    length?: number
  ) {
    this.onError = onError
    this.setText(textInitial, start, length)
    this.tokenFlags = TokenFlags.None
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

  public getText(): string {
    return this.text
  }

  public getTextPos(): number {
    return this.pos
  }

  public setTextPos(textPos: number): void {
    this.pos = textPos
    this.startPos = textPos
    this.tokenPos = textPos
    this.token = SyntaxKind.Unknown
    this.tokenValue = undefined!
  }

  public getToken(): SyntaxKind {
    return this.token
  }

  public getTokenFlags(): TokenFlags {
    return this.tokenFlags
  }

  public getTokenValue(): string {
    return this.tokenValue
  }

  public hasPrecedingLineBreak(): boolean {
    return this.tokenFlags === TokenFlags.PrecedingLineBreak
  }

  public scan(): SyntaxKind {
    this.startPos = this.pos
    // eslint-disable-next-line no-constant-condition, sonarjs/no-one-iteration-loop
    while (true) {
      this.tokenPos = this.pos

      if (this.pos >= this.end) {
        // TODO: log to check if we end up in this case, please remove it!!
        console.log(this.pos, this.end)
        this.token = SyntaxKind.EndOfFileToken
        return this.token
      }

      const ch: number = this.codePointAt(this.text, this.pos)

      console.log(
        `unicode position (${ch}) equivalent to character (${String.fromCharCode(
          ch
        )})`
      )
      switch (ch) {
        case CharacterCodes.lineFeed:
        case CharacterCodes.carriageReturn:
          this.tokenFlags = TokenFlags.PrecedingLineBreak
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

        case CharacterCodes.doubleQuote:
          // TODO: enable this:
          this.tokenValue = this.scanString()
          this.token = SyntaxKind.StringLiteral
          return this.token

        default:
          // TODO: Remove this Fall through console log
          // eslint-disable-next-line no-console
          console.log(
            `could not match unicode position (${ch}) equivalent to character (${String.fromCharCode(
              ch
            )})`
          )
          this.error('invalid character')
          this.pos += this.charSize(ch)
          this.token = SyntaxKind.Unknown
          return this.token
      }
    }
  }

  private scanString(): string {
    const quote = this.codePointAt(this.text, this.pos)
    this.pos += 1 // step in one place
    let result = ''
    let start: number = this.pos // new starting position

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.pos >= this.end) {
        // eslint-disable-next-line unicorn/prefer-string-slice
        result += this.text.substring(start, this.pos)
        this.tokenFlags = TokenFlags.Unterminated
        this.error('Unterminated string literal')
        break
      }
      const ch = this.codePointAt(this.text, this.pos)

      if (ch === quote) {
        // eslint-disable-next-line unicorn/prefer-string-slice
        result += this.text.substring(start, this.pos)
        this.pos += 1
        break
      }

      if (ch === CharacterCodes.backslash) {
        // eslint-disable-next-line unicorn/prefer-string-slice
        result += this.text.substring(start, this.pos)
        result += this.scanEscapeSequence()
        start = this.pos
        // eslint-disable-next-line no-continue
        continue
      }

      if (this.isLineBreak(ch)) {
        // eslint-disable-next-line unicorn/prefer-string-slice
        result += this.text.substring(start, this.pos)
        this.tokenFlags = TokenFlags.Unterminated
        this.error('Unterminated string literal')
        break
      }

      this.pos += 1
    }

    return result
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

      // TODO: implement UnicodeEscape
      // case CharacterCodes.u:
      //   /* '\u{DDDDDDDD}' */
      //   if (
      //     this.pos < this.end &&
      //     isLeftCurlyBracketChr(this.codePointAt(this.text, this.pos))
      //   ) {
      //     this.pos += 1
      //     this.tokenFlags = TokenFlags.ExtendedUnicodeEscape
      //     return this.scanExtendedUnicodeEscape()
      //   }

      //   this.tokenFlags = TokenFlags.UnicodeEscape
      //   /* '\uDDDD' */
      //   return this.scanHexadecimalEscape(/* numDigits */ 4)

      // TODO: implement hexadecimalEscape
      // case CharacterCodes.x:
      //   /* '\xDD' */
      //   return this.scanHexadecimalEscape(/* numDigits */ 2)

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

  private isLineBreak(ch: number): boolean {
    return (
      isLineFeedChr(ch) ||
      isCarriageReturnChr(ch) ||
      ch === CharacterCodes.lineSeparator ||
      ch === CharacterCodes.paragraphSeparator
    )
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

  private codePointAt(s: string, i: number): number {
    return s.codePointAt(i)!
  }

  private charSize(ch: number): 1 | 2 {
    if (ch >= 0x10000) {
      return 2
    }
    return 1
  }
}
