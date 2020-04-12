/* eslint-disable unicorn/number-literal-case */
/* eslint-disable no-magic-numbers */
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind, TokenFlags } from 'types'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - scan - string:\n A string is a sequence of Unicode code points wrapped with quotation marks (U+0022). All code points may be placed within the quotation marks except for the code points that must be escaped: (quotation mark, reverse solidus, and the control characters)', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }
  it('should return `StringLiteral` when it encounters a string identified by double quotes (")', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()
    /**
     * @example
     * const textInitial = `"this is a 'string'"`
     * lexer.getTokenValue === `this is a 'string'`
     */
    const lexer = new LexerImpl(`"this is a 'string'"`, onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe(`this is a 'string'`)
    expect(lexer.getTextPos()).toBe(lexer.getText().length)
  })

  it('should handle string with escaped `quotation mark` (U+0022) = \\"', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()
    /**
     * @example
     * const textInitial = `"""`
     * lexer.getTokenValue === `"`
     */
    const lexer = new LexerImpl('"\\u0022"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0022')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `reverse solidus` (U+005C) = \\', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\"`
     * lexer.getTokenValue === `\`
     */
    const lexer = new LexerImpl('"\\u005C"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u005C')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `solidus` (U+002F) = \\/', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"/"`
     * lexer.getTokenValue === `/`
     */
    const lexer = new LexerImpl('"\\u002F"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u002F')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `backspace` (U+0008) = \\b', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\b"`
     * lexer.getTokenValue === `\b`
     */
    const lexer = new LexerImpl('"\\u0008"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0008')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `form feed` (U+000C) = \\f', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\f"`
     * lexer.getTokenValue === `\f`
     */
    const lexer = new LexerImpl('"\\u000C"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u000C')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `line feed` (U+000A) = \\n', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\n"`
     * lexer.getTokenValue === `\n`
     */
    const lexer = new LexerImpl('"\\u000A"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u000A')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `carriage return` (U+000D) = \\r', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\r"`
     * lexer.getTokenValue === `\r`
     */
    const lexer = new LexerImpl('"\\u000D"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u000D')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `tabulation` (U+0009) = \\t', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\t"`
     * lexer.getTokenValue === `\t`
     */
    const lexer = new LexerImpl('"\\u0009"', onError)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0009')
    expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })

  describe('should handle string with hexadecimal escapes control characters from (U+0000) to (U+001F)', () => {
    const lexer = new LexerImpl()
    it('(U+0000) = NULL', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0000"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0000))
    })

    it('(U+0001) = SHO (Start of Heading)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0001"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0001))
    })

    it('(U+0002) = STX (Start of Text)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0002"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0002))
    })

    it('(U+0003) = ETX (End of Text)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0003"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0003))
    })

    it('(U+0004) = ETO (End of Transmission)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0004"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0004))
    })
    it('(U+0005) = ENQ (Enquiry)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0005"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0005))
    })
    it('(U+0006) = ACK (Acknowledge)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0006"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0006))
    })
    it('(U+0007) = BEL (Bell)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0007"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0007))
    })

    it('(U+0008) = BS (Backspace)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0008"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0008))
    })

    it('(U+0009) = HT (Horizontal Tabulation)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0009"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0009))
    })

    it('(U+000A) = LF (New Line (Nl))', () => {
      expect.hasAssertions()
      lexer.setText('"\\u000A"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000a))
    })
    it('(U+000B) = VT (Vertical Tabulation)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u000B"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000b))
    })

    it('(U+000C) = FF (Form Feed)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u000C"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000c))
    })

    it('(U+000D) = CR (Carriage Return)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u000D"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000d))
    })

    it('(U+000E) = SO (Shift Out)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u000E"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000e))
    })
    it('(U+000F) = SI (Shift In)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u000F"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000f))
    })

    it('(U+0010) = DLE (Data Link Escape)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0010"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0010))
    })

    it('(U+0011) = DC1 (Device Control One)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0011"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0011))
    })
    it('(U+0012) = DC2 (Device Control Two)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0012"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0012))
    })
    it('(U+0013) = DC3 (Device Control Three)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0013"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0013))
    })
    it('(U+0014) = DC4 (Device Control Four)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0014"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0014))
    })

    it('(U+0015) = NAK (Negative Acknowledge)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0015"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0015))
    })
    it('(U+0016) = SYN (Synchronous Idle)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0016"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0016))
    })
    it('(U+0017) = ETB (End of Transmission Block)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0017"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0017))
    })
    it('(U+0018) = CAN (Cancel)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0018"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0018))
    })
    it('(U+0019) = EM (End of Medium)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u0019"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0019))
    })
    it('(U+001A) = SUB (Substitute)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u001A"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001a))
    })
    it('(U+001B) = ESC (Escape)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u001B"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001b))
    })
    it('(U+001C) = FS (File Separator)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u001C"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001c))
    })
    it('(U+001D) = GS (Group Separator)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u001D"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001d))
    })
    it('(U+001E) = RS (Record Separator)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u001E"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001e))
    })
    it('(U+001F) = US (Unit Separator)', () => {
      expect.hasAssertions()
      lexer.setText('"\\u001F"')
      expect(lexer.scan()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001f))
    })
  })

  describe('structural tokens', () => {
    it('should return `SyntaxKind.LeftSquareBracket` when encountering a left square bracket `[`', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl('[]')
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.LeftSquareBracket)
      expect(lexer.scan()).not.toBe(SyntaxKind.LeftSquareBracket)
    })

    it('should return `SyntaxKind.RightSquareBracket` when encountering a right square bracket `]`', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl('[]')
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).not.toBe(SyntaxKind.RightSquareBracket)
      expect(lexer.scan()).toBe(SyntaxKind.RightSquareBracket)
    })

    it('should return `SyntaxKind.LeftCurlyBracket` when encountering a left curly bracket `{`', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl('{}')
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.LeftCurlyBracket)
      expect(lexer.scan()).not.toBe(SyntaxKind.LeftCurlyBracket)
    })

    it('should return `SyntaxKind.RightCurlyBracket` when encountering a right curly bracket `}`', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl('{}')
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).not.toBe(SyntaxKind.RightCurlyBracket)
      expect(lexer.scan()).toBe(SyntaxKind.RightCurlyBracket)
    })

    it('should return `SyntaxKind.Colon` when encountering a colon `:`', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(' : ')
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).not.toBe(SyntaxKind.Colon)
      expect(lexer.scan()).toBe(SyntaxKind.Colon)
      expect(lexer.scan()).not.toBe(SyntaxKind.Colon)
    })

    it('should return `SyntaxKind.Comma` when encountering a comma `,`', () => {
      // arrange
      expect.hasAssertions()
      const text = '"key": "a, b, c",'
      const lexer = new LexerImpl(text)
      // assert
      expect(lexer.scan()).not.toBe(SyntaxKind.Comma)
      expect(lexer.scan()).not.toBe(SyntaxKind.Comma)
      expect(lexer.scan()).toBe(SyntaxKind.WhitespaceTrivia)
      expect(lexer.scan()).not.toBe(SyntaxKind.Comma)
      expect(lexer.scan()).toBe(SyntaxKind.Comma)
      expect(lexer.getTextPos()).toBe(text.length)
    })
  })

  describe('literal name tokens', () => {
    it('should return `SyntaxKind.TrueKeyword` when encountering the `true` reserved keyword', () => {
      // arrange
      expect.hasAssertions()
      const text = JSON.stringify({ boolean: true }, null, 2)
      const lexer = new LexerImpl(text)
      // act
      lexer.scan() // LeftCurlyBracket '{'
      lexer.scan() // NewLineTrivia '\n'
      lexer.scan() // WhitespaceTrivia '\s'
      lexer.scan() // StringLiteral 'boolean'
      lexer.scan() // Colon ':'
      lexer.scan() // WhitespaceTrivia '\s'
      // assert
      expect(lexer.scan()).toBe(SyntaxKind.TrueKeyword)
      expect(lexer.getTokenValue()).toBe('true')
      expect(lexer.getTextPos()).toBe(text.lastIndexOf('true') + 'true'.length)
    })
    it('should return `SyntaxKind.FalseKeyword` when encountering the `false` reserved keyword', () => {
      // arrange
      expect.hasAssertions()
      const text = JSON.stringify({ boolean: false }, null, 2)
      const lexer = new LexerImpl(text)
      // act
      lexer.scan() // LeftCurlyBracket '{'
      lexer.scan() // NewLineTrivia '\n'
      lexer.scan() // WhitespaceTrivia '\s'
      lexer.scan() // StringLiteral 'boolean'
      lexer.scan() // Colon ':'
      lexer.scan() // WhitespaceTrivia '\s'
      // assert
      expect(lexer.scan()).toBe(SyntaxKind.FalseKeyword)
      expect(lexer.getTokenValue()).toBe('false')
      expect(lexer.getTextPos()).toBe(
        text.lastIndexOf('false') + 'false'.length
      )
    })

    it('should return `SyntaxKind.NullKeyword` when encountering the `null` reserved keyword', () => {
      // arrange
      expect.hasAssertions()
      const text = JSON.stringify({ nullable: null }, null, 2)
      const lexer = new LexerImpl(text)
      // act
      lexer.scan() // LeftCurlyBracket '{'
      lexer.scan() // NewLineTrivia '\n'
      lexer.scan() // WhitespaceTrivia '\s'
      lexer.scan() // StringLiteral 'boolean'
      lexer.scan() // Colon ':'
      lexer.scan() // WhitespaceTrivia '\s'
      // assert
      expect(lexer.scan()).toBe(SyntaxKind.NullKeyword)
      expect(lexer.getTokenValue()).toBe('null')
      expect(lexer.getTextPos()).toBe(text.lastIndexOf('null') + 'null'.length)
    })

    it('should not care about non legal json literal tokens', () => {
      // arrange
      expect.hasAssertions()
      const text = `{"legalJsonKey":illegalJsonValue}`
      const lexer = new LexerImpl(text)

      // act
      lexer.scan() // SyntaxKind.LeftCurlyBracket
      lexer.getTokenText() // `{`

      lexer.scan() // SyntaxKind.StringLiteral
      lexer.getTokenText() // `legalJsonKey`

      lexer.scan() // SyntaxKind.Colon
      lexer.getTokenText() // `:`

      // assert
      expect(lexer.scan()).toBe(SyntaxKind.Identifier)
      expect(lexer.getTokenText()).toBe('illegalJsonValue')
      expect(lexer.getTokenValue()).toBe('illegalJsonValue')
    })
  })
})
