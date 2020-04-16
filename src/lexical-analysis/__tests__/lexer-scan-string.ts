/* eslint-disable unicorn/number-literal-case */
/* eslint-disable no-magic-numbers */
// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
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
    const textStartPos = text.search(/"this is a plain old 'string'"/)
    const lexer = new LexerImpl(text, onError, textStartPos)

    // act
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe(`this is a plain old 'string'`)
    // eslint-disable-next-line no-useless-escape
    expect(lexer.getTokenText()).toBe(`\"this is a plain old 'string'\"`)
    expect(lexer.getTextPos()).toBe(textStartPos + lexer.getTokenText().length)
  })

  it('should handle string with escaped `quotation mark` (U+0022) = \\"', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape quotation mark"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0022')
    expect(lexer.getTokenText()).toBe('"\\""')
  })
  it('should handle string with escaped `reverse solidus` (U+005C) = \\', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape reverse solidus"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u005C')
    expect(lexer.getTokenText()).toBe(`"\u005C\u005C"`)
  })
  it('should handle string with escaped `solidus` (U+002F) = \\/', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape solidus"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u002F')
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    expect(lexer.getTokenText()).toBe('"/"')
  })
  it('should handle string with escaped `backspace` (U+0008) = \\b', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape backspace"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0008')
    expect(lexer.getTokenText()).toBe('"\\b"')
  })
  it('should handle string with escaped `form feed` (U+000C) = \\f', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape form feed"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u000C')
    expect(lexer.getTokenText()).toBe('"\\f"')
  })
  it('should handle string with escaped `line feed` (U+000A) = \\n', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape line feed"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u000A')
    expect(lexer.getTokenText()).toBe('"\\n"')
  })
  it('should handle string with escaped `carriage return` (U+000D) = \\r', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape carriage return"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u000D')
    expect(lexer.getTokenText()).toBe('"\\r"')
  })
  it('should handle string with escaped `tabulation` (U+0009) = \\t', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape character tabulation"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0009')
    expect(lexer.getTokenText()).toBe('"\\t"')
  })

  it('should handle string with hexadecimal escape = \\u0000', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/"escape hexadecimal digits"/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)

    // act
    lexer.scan() // key
    lexer.scan() // :
    lexer.scan() // whitespace trivia
    lexer.scan()

    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    expect(lexer.getTokenValue()).toBe('\u0000')
    expect(lexer.getTokenText()).toBe('"\\u0000"')
  })

  describe('should handle string with hexadecimal escapes control characters from (U+0000) to (U+001F)', () => {
    const start = text.search(/"hexadecimal escapes control characters"/) // ?
    const end = text.length
    const lexer = new LexerImpl(text, setUpOnError(), start, end, false)
    it('(U+0000) = NULL', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0000\) = NULL"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0000))
      expect(lexer.getTokenText()).toMatch(/"\\u0{4}"/)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
    })

    it('(U+0001) = SHO (Start of Heading)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0001\) = SHO \(Start of Heading\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0001))
      expect(lexer.getTokenText()).toMatch(/"\\u0001"/)
    })

    it('(U+0002) = STX (Start of Text)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0002\) = STX \(Start of Text\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0002))
      expect(lexer.getTokenText()).toMatch(/"\\u0002"/)
    })

    it('(U+0003) = ETX (End of Text)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0003\) = ETX \(End of Text\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0003))
      expect(lexer.getTokenText()).toMatch(/"\\u0003"/)
    })

    it('(U+0004) = ETO (End of Transmission)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0004\) = ETO \(End of Transmission\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0004))
      expect(lexer.getTokenText()).toMatch(/"\\u0004"/)
    })
    it('(U+0005) = ENQ (Enquiry)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0005\) = ENQ \(Enquiry\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0005))
      expect(lexer.getTokenText()).toMatch(/"\\u0005"/)
    })
    it('(U+0006) = ACK (Acknowledge)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0006\) = ACK \(Acknowledge\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0006))
      expect(lexer.getTokenText()).toMatch(/"\\u0006"/)
    })
    it('(U+0007) = BEL (Bell)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0007\) = BEL \(Bell\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0007))
      expect(lexer.getTokenText()).toMatch(/"\\u0007"/)
    })

    it('(U+0008) = BS (Backspace)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0008\) = BS \(Backspace\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0008))
      expect(lexer.getTokenText()).toMatch(/"\\b"/)
    })

    it('(U+0009) = HT (Horizontal Tabulation)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0009\) = HT \(Horizontal Tabulation\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      /*
      NOTE: JSON.stringify coerces known escape sequences as /u0009 to /t
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      */
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0009))
      expect(lexer.getTokenText()).toMatch(/"\\t"/)
    })

    it('(U+000A) = LF (New Line (Nl))', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+000A\) = LF \(New Line \(Nl\)\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      /*
      NOTE: JSON.stringify coerces known escape sequences as /u000A to /n
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      */
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000a))
      expect(lexer.getTokenText()).toMatch(/"\\n"/)
    })
    it('(U+000B) = VT (Vertical Tabulation)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+000B\) = VT \(Vertical Tabulation\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000b))
      expect(lexer.getTokenText()).toMatch(/"\\u000b"/)
    })

    it('(U+000C) = FF (Form Feed)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+000C\) = FF \(Form Feed\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      /*
      NOTE: JSON.stringify coerces known escape sequences as /u000C to /f
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      */
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000c))
      expect(lexer.getTokenText()).toMatch(/"\\f"/)
    })

    it('(U+000D) = CR (Carriage Return)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+000D\) = CR \(Carriage Return\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      /*
      NOTE: JSON.stringify coerces known escape sequences as /u000D to
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      */
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000d))
      expect(lexer.getTokenText()).toMatch(/"\\r"/)
    })

    it('(U+000E) = SO (Shift Out)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+000E\) = SO \(Shift Out\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000e))
      expect(lexer.getTokenText()).toMatch(/"\\u000e"/)
    })
    it('(U+000F) = SI (Shift In)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+000F\) = SI \(Shift In\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x000f))
      expect(lexer.getTokenText()).toMatch(/"\\u000f"/)
    })

    it('(U+0010) = DLE (Data Link Escape)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0010\) = DLE \(Data Link Escape\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0010))
      expect(lexer.getTokenText()).toMatch(/"\\u0010"/)
    })

    it('(U+0011) = DC1 (Device Control One)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0011\) = DC1 \(Device Control One\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0011))
      expect(lexer.getTokenText()).toMatch(/"\\u0011"/)
    })
    it('(U+0012) = DC2 (Device Control Two)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0012\) = DC2 \(Device Control Two\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0012))
      expect(lexer.getTokenText()).toMatch(/"\\u0012"/)
    })
    it('(U+0013) = DC3 (Device Control Three)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0013\) = DC3 \(Device Control Three\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0013))
      expect(lexer.getTokenText()).toMatch(/"\\u0013"/)
    })
    it('(U+0014) = DC4 (Device Control Four)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0014\) = DC4 \(Device Control Four\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0014))
      expect(lexer.getTokenText()).toMatch(/"\\u0014"/)
    })

    it('(U+0015) = NAK (Negative Acknowledge)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0015\) = NAK \(Negative Acknowledge\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0015))
      expect(lexer.getTokenText()).toMatch(/"\\u0015"/)
    })
    it('(U+0016) = SYN (Synchronous Idle)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0016\) = SYN \(Synchronous Idle\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0016))
      expect(lexer.getTokenText()).toMatch(/"\\u0016"/)
    })
    it('(U+0017) = ETB (End of Transmission Block)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+0017\) = ETB \(End of Transmission Block\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0017))
      expect(lexer.getTokenText()).toMatch(/"\\u0017"/)
    })
    it('(U+0018) = CAN (Cancel)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0018\) = CAN \(Cancel\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0018))
      expect(lexer.getTokenText()).toMatch(/"\\u0018"/)
    })
    it('(U+0019) = EM (End of Medium)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+0019\) = EM \(End of Medium\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x0019))
      expect(lexer.getTokenText()).toMatch(/"\\u0019"/)
    })
    it('(U+001A) = SUB (Substitute)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+001A\) = SUB \(Substitute\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001a))
      expect(lexer.getTokenText()).toMatch(/"\\u001a"/)
    })
    it('(U+001B) = ESC (Escape)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+001B\) = ESC \(Escape\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001b))
      expect(lexer.getTokenText()).toMatch(/"\\u001b"/)
    })
    it('(U+001C) = FS (File Separator)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+001C\) = FS \(File Separator\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001c))
      expect(lexer.getTokenText()).toMatch(/"\\u001c"/)
    })
    it('(U+001D) = GS (Group Separator)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+001D\) = GS \(Group Separator\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001d))
      expect(lexer.getTokenText()).toMatch(/"\\u001d"/)
    })
    it('(U+001E) = RS (Record Separator)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(
        /"\(U\+001E\) = RS \(Record Separator\)"/
      )
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001e))
      expect(lexer.getTokenText()).toMatch(/"\\u001e"/)
    })
    it('(U+001F) = US (Unit Separator)', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/"\(U\+001F\) = US \(Unit Separator\)"/)
      lexer.setTextPos(textStartPos)
      // act
      lexer.scan() // key
      lexer.scan() // :
      lexer.scan() // whitespace trivia
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
      expect(lexer.getTokenFlags()).toBe(TokenFlags.UnicodeEscape)
      expect(lexer.getTokenValue()).toBe(String.fromCharCode(0x001f))
      expect(lexer.getTokenText()).toMatch(/"\\u001f"/)
    })
  })
})
