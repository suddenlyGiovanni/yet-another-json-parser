import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind, TokenFlags } from 'types'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - scan - string - A string is a sequence of Unicode code points wrapped with quotation marks (U+0022). All code points may be placed within the quotation marks except for the code points that must be escaped: (quotation mark, reverse solidus, and the control characters)', () => {
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
     * scanner.getTokenValue === `this is a 'string'`
     */
    const scanner = new LexerImpl(`"this is a 'string'"`, onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe(`this is a 'string'`)
    expect(scanner.getTextPos()).toBe(scanner.getText().length)
  })

  it('should handle string with escaped `quotation mark` (U+0022) = \\"', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()
    /**
     * @example
     * const textInitial = `"""`
     * scanner.getTokenValue === `"`
     */
    const scanner = new LexerImpl('"\\u0022"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u0022')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `reverse solidus` (U+005C) = \\', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\"`
     * scanner.getTokenValue === `\`
     */
    const scanner = new LexerImpl('"\\u005C"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u005C')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `solidus` (U+002F) = \\/', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"/"`
     * scanner.getTokenValue === `/`
     */
    const scanner = new LexerImpl('"\\u002F"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u002F')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `backspace` (U+0008) = \\b', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\b"`
     * scanner.getTokenValue === `\b`
     */
    const scanner = new LexerImpl('"\\u0008"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u0008')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `form feed` (U+000C) = \\f', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\f"`
     * scanner.getTokenValue === `\f`
     */
    const scanner = new LexerImpl('"\\u000C"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u000C')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `line feed` (U+000A) = \\n', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\n"`
     * scanner.getTokenValue === `\n`
     */
    const scanner = new LexerImpl('"\\u000A"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u000A')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `carriage return` (U+000D) = \\r', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\r"`
     * scanner.getTokenValue === `\r`
     */
    const scanner = new LexerImpl('"\\u000D"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u000D')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })
  it('should handle string with escaped `tabulation` (U+0009) = \\t', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    /**
     * @example
     * const textInitial = `"\t"`
     * scanner.getTokenValue === `\t`
     */
    const scanner = new LexerImpl('"\\u0009"', onError)

    // act
    scanner.scan()

    // assert
    expect(scanner.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(scanner.getTokenValue()).toBe('\u0009')
    expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
  })

  describe('should handle string with hexadecimal escapes control characters from (U+0000) to (U+001F)', () => {
    const scanner = new LexerImpl()
    it('(U+0000) = NULL', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0000"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0000))
    })

    it('(U+0001) = SHO (Start of Heading)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0001"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0001))
    })

    it('(U+0002) = STX (Start of Text)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0002"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0002))
    })

    it('(U+0003) = ETX (End of Text)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0003"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0003))
    })

    it('(U+0004) = ETO (End of Transmission)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0004"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0004))
    })
    it('(U+0005) = ENQ (Enquiry)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0005"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0005))
    })
    it('(U+0006) = ACK (Acknowledge)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0006"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0006))
    })
    it('(U+0007) = BEL (Bell)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0007"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0007))
    })

    it('(U+0008) = BS (Backspace)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0008"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0008))
    })

    it('(U+0009) = HT (Horizontal Tabulation)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0009"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0009))
    })

    it('(U+000A) = LF (New Line (Nl))', () => {
      expect.hasAssertions()
      scanner.setText('"\\u000A"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x000A))
    })
    it('(U+000B) = VT (Vertical Tabulation)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u000B"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x000B))
    })

    it('(U+000C) = FF (Form Feed)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u000C"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x000C))
    })

    it('(U+000D) = CR (Carriage Return)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u000D"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x000D))
    })

    it('(U+000E) = SO (Shift Out)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u000E"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x000E))
    })
    it('(U+000F) = SI (Shift In)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u000F"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x000F))
    })

    it('(U+0010) = DLE (Data Link Escape)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0010"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0010))
    })

    it('(U+0011) = DC1 (Device Control One)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0011"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0011))
    })
    it('(U+0012) = DC2 (Device Control Two)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0012"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0012))
    })
    it('(U+0013) = DC3 (Device Control Three)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0013"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0013))
    })
    it('(U+0014) = DC4 (Device Control Four)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0014"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0014))
    })

    it('(U+0015) = NAK (Negative Acknowledge)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0015"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0015))
    })
    it('(U+0016) = SYN (Synchronous Idle)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0016"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0016))
    })
    it('(U+0017) = ETB (End of Transmission Block)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0017"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0017))
    })
    it('(U+0018) = CAN (Cancel)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0018"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0018))
    })
    it('(U+0019) = EM (End of Medium)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u0019"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x0019))
    })
    it('(U+001A) = SUB (Substitute)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u001A"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x001A))
    })
    it('(U+001B) = ESC (Escape)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u001B"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x001B))
    })
    it('(U+001C) = FS (File Separator)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u001C"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x001C))
    })
    it('(U+001D) = GS (Group Separator)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u001D"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x001D))
    })
    it('(U+001E) = RS (Record Separator)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u001E"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x001E))
    })
    it('(U+001F) = US (Unit Separator)', () => {
      expect.hasAssertions()
      scanner.setText('"\\u001F"')
      expect(scanner.scan()).toBe(SyntaxKind.StringLiteral)
      expect(scanner.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(scanner.getTokenValue()).toBe(String.fromCharCode(0x001F))
    })
  })

  describe('structural tokens', () => {
    it('should return `SyntaxKind.LeftSquareBracket` when encountering a left square bracket `[`', () => {
      // arrange
      expect.hasAssertions()
      const scanner = new LexerImpl('[]')
      // act
      scanner.scan()
      // assert
      expect(scanner.getToken()).toBe(SyntaxKind.LeftSquareBracket)
      expect(scanner.scan()).not.toBe(SyntaxKind.LeftSquareBracket)
    })

    it('should return `SyntaxKind.RightSquareBracket` when encountering a right square bracket `]`', () => {
      // arrange
      expect.hasAssertions()
      const scanner = new LexerImpl('[]')
      // act
      scanner.scan()
      // assert
      expect(scanner.getToken()).not.toBe(SyntaxKind.RightSquareBracket)
      expect(scanner.scan()).toBe(SyntaxKind.RightSquareBracket)
    })

    it('should return `SyntaxKind.LeftCurlyBracket` when encountering a left curly bracket `{`', () => {
      // arrange
      expect.hasAssertions()
      const scanner = new LexerImpl('{}')
      // act
      scanner.scan()
      // assert
      expect(scanner.getToken()).toBe(SyntaxKind.LeftCurlyBracket)
      expect(scanner.scan()).not.toBe(SyntaxKind.LeftCurlyBracket)
    })

    it('should return `SyntaxKind.RightCurlyBracket` when encountering a right curly bracket `}`', () => {
      // arrange
      expect.hasAssertions()
      const scanner = new LexerImpl('{}')
      // act
      scanner.scan()
      // assert
      expect(scanner.getToken()).not.toBe(SyntaxKind.RightCurlyBracket)
      expect(scanner.scan()).toBe(SyntaxKind.RightCurlyBracket)
    })

    it('should return `SyntaxKind.Colon` when encountering a colon `:`', () => {
      // arrange
      expect.hasAssertions()
      const scanner = new LexerImpl(' : ')
      // act
      scanner.scan()
      // assert
      expect(scanner.getToken()).not.toBe(SyntaxKind.Colon)
      expect(scanner.scan()).toBe(SyntaxKind.Colon)
      expect(scanner.scan()).not.toBe(SyntaxKind.Colon)
    })

    it('should return `SyntaxKind.Comma` when encountering a comma `,`', () => {
      // arrange
      expect.hasAssertions()
      const text = '"key": "a, b, c",'
      const scanner = new LexerImpl(text)
      // assert
      expect(scanner.scan()).not.toBe(SyntaxKind.Comma)
      expect(scanner.scan()).not.toBe(SyntaxKind.Comma)
      expect(scanner.scan()).toBe(SyntaxKind.WhitespaceTrivia)
      expect(scanner.scan()).not.toBe(SyntaxKind.Comma)
      expect(scanner.scan()).toBe(SyntaxKind.Comma)
      expect(scanner.getTextPos()).toBe(text.length)
    })
  })

  describe('literal name tokens', () => {
    it('should return `SyntaxKind.TrueKeyword` when encountering the `true` reserved keyword', () => {
      // arrange
      expect.hasAssertions()
      const text = JSON.stringify({ boolean: true }, null, 2)
      const scanner = new LexerImpl(text)
      // act
      scanner.scan() // LeftCurlyBracket '{'
      scanner.scan() // NewLineTrivia '\n'
      scanner.scan() // WhitespaceTrivia '\s'
      scanner.scan() // StringLiteral 'boolean'
      scanner.scan() // Colon ':'
      scanner.scan() // WhitespaceTrivia '\s'
      // assert
      expect(scanner.scan()).toBe(SyntaxKind.TrueKeyword)
      expect(scanner.getTokenValue()).toBe('true')
      expect(scanner.getTextPos()).toBe(
        text.lastIndexOf('true') + 'true'.length
      )
    })
    it('should return `SyntaxKind.FalseKeyword` when encountering the `false` reserved keyword', () => {
      // arrange
      expect.hasAssertions()
      const text = JSON.stringify({ boolean: false }, null, 2)
      const scanner = new LexerImpl(text)
      // act
      scanner.scan() // LeftCurlyBracket '{'
      scanner.scan() // NewLineTrivia '\n'
      scanner.scan() // WhitespaceTrivia '\s'
      scanner.scan() // StringLiteral 'boolean'
      scanner.scan() // Colon ':'
      scanner.scan() // WhitespaceTrivia '\s'
      // assert
      expect(scanner.scan()).toBe(SyntaxKind.FalseKeyword)
      expect(scanner.getTokenValue()).toBe('false')
      expect(scanner.getTextPos()).toBe(
        text.lastIndexOf('false') + 'false'.length
      )
    })

    it('should return `SyntaxKind.NullKeyword` when encountering the `null` reserved keyword', () => {
      // arrange
      expect.hasAssertions()
      const text = JSON.stringify({ nullable: null }, null, 2)
      const scanner = new LexerImpl(text)
      // act
      scanner.scan() // LeftCurlyBracket '{'
      scanner.scan() // NewLineTrivia '\n'
      scanner.scan() // WhitespaceTrivia '\s'
      scanner.scan() // StringLiteral 'boolean'
      scanner.scan() // Colon ':'
      scanner.scan() // WhitespaceTrivia '\s'
      // assert
      expect(scanner.scan()).toBe(SyntaxKind.NullKeyword)
      expect(scanner.getTokenValue()).toBe('null')
      expect(scanner.getTextPos()).toBe(
        text.lastIndexOf('null') + 'null'.length
      )
    })

    it('should not care about non legal json literal tokens', () => {
      // arrange
      expect.hasAssertions()
      const text = `{"legalJsonKey":illegalJsonValue}`
      const scanner = new LexerImpl(text)

      // act
      scanner.scan() // SyntaxKind.LeftCurlyBracket
      scanner.getTokenText() // `{`

      scanner.scan() // SyntaxKind.StringLiteral
      scanner.getTokenText() // `legalJsonKey`

      scanner.scan() // SyntaxKind.Colon
      scanner.getTokenText() // `:`

      // assert
      expect(scanner.scan()).toBe(SyntaxKind.Identifier)
      expect(scanner.getTokenText()).toBe('illegalJsonValue')
      expect(scanner.getTokenValue()).toBe('illegalJsonValue')
    })
  })
})
