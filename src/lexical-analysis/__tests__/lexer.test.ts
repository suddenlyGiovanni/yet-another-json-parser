/* eslint-disable unicorn/number-literal-case */
/* eslint-disable no-magic-numbers */
import { LexerImpl } from 'lexical-analysis/lexer'
import { JSONText, SyntaxKind, TokenFlags } from 'types/index'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  const jsonText: JSONText = `{
    "property": null
  }`

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }

  describe('scan', () => {
    it('should return `EndOfFileToken` if the scanner has reached the end of text', () => {
      expect.hasAssertions()
      const start = jsonText.length
      const { length } = jsonText
      const onError = setUpOnError()
      const scanner = new LexerImpl(jsonText, onError, start, length)
      const token = scanner.scan()

      expect(token).toBe(SyntaxKind.EndOfFileToken)
    })

    it('should call the onError callback and return `SyntaxKind.Unknown` token if the scanner does not match any know character', () => {
      expect.hasAssertions()
      const textInitial = `💥🧨`
      const onError = setUpOnError()
      const scanner = new LexerImpl(textInitial, onError)

      const token = scanner.scan()
      expect(token).toBe(SyntaxKind.Unknown)
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith('invalid character', 0)
    })

    it('should error if the scanned character falls out of the Basic Multilingual Plane (BMP) beyond 65_536 code points', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()
      const scanner = new LexerImpl(
        `${String.fromCodePoint(LexerImpl.UNICODE_BMP_TOP_BOUNDARY)}`,
        onError
      )

      // act
      scanner.scan()

      // expect
      expect(scanner.getToken()).toBe(SyntaxKind.Unknown)
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith('invalid character', 0)
      expect(scanner.getTextPos()).toBe(2)
    })

    it('should return `NewLineTrivia` if it encounter a line feed', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()
      const textWithLineFeed = `text with line feed\n`

      const initialPos = textWithLineFeed.lastIndexOf('feed') + 'feed'.length
      const { length } = textWithLineFeed
      const scanner = new LexerImpl(
        textWithLineFeed,
        onError,
        initialPos,
        length
      )

      // act
      scanner.scan()

      // assert
      expect(scanner.getTokenFlags()).toBe(TokenFlags.PrecedingLineBreak)
      expect(scanner.getTextPos()).toBe(initialPos + 1)
      expect(scanner.getToken()).toBe(SyntaxKind.NewLineTrivia)
      expect(scanner.scan()).toBe(SyntaxKind.EndOfFileToken)
    })

    it('should return `NewLineTrivia` if it encounter a carriage return', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()
      const textWithCarriageReturn = `text with carriage return\r`

      const initialPos =
        textWithCarriageReturn.lastIndexOf('return') + 'return'.length
      const { length } = textWithCarriageReturn
      const scanner = new LexerImpl(
        textWithCarriageReturn,
        onError,
        initialPos,
        length
      )

      // act
      scanner.scan()

      // assert
      expect(scanner.getTokenFlags()).toBe(TokenFlags.PrecedingLineBreak)
      expect(scanner.getTextPos()).toBe(initialPos + 1)
      expect(scanner.getToken()).toBe(SyntaxKind.NewLineTrivia)
      expect(scanner.scan()).toBe(SyntaxKind.EndOfFileToken)
    })

    it('should return `NewLineTrivia` if it encounter a carriage return and a line feed', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()
      const textWithCarriageReturnAndLineFeed = `text with carriage return and line feed\r\n`

      const initialPos =
        textWithCarriageReturnAndLineFeed.lastIndexOf('feed') + 'feed'.length
      const { length } = textWithCarriageReturnAndLineFeed
      const scanner = new LexerImpl(
        textWithCarriageReturnAndLineFeed,
        onError,
        initialPos,
        length
      )

      // act
      scanner.scan()

      // assert
      expect(scanner.getTokenFlags()).toBe(TokenFlags.PrecedingLineBreak)
      expect(scanner.getTextPos()).toBe(initialPos + 2)
      expect(scanner.getToken()).toBe(SyntaxKind.NewLineTrivia)
      expect(scanner.scan()).toBe(SyntaxKind.EndOfFileToken)
    })

    it('should return `WhitespaceTrivia` if it encounter an Insignificant whitespace', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()

      const textWithWhiteSpaces = 'text  \f\v\twith whites space'
      const initialPos = textWithWhiteSpaces.lastIndexOf('text') + 'text'.length
      const end = textWithWhiteSpaces.length
      const scanner = new LexerImpl(
        textWithWhiteSpaces,
        onError,
        initialPos,
        end
      )

      // act
      scanner.scan()

      // assert
      expect(scanner.getToken()).toBe(SyntaxKind.WhitespaceTrivia)
      expect(scanner.getTextPos()).toBe(textWithWhiteSpaces.lastIndexOf('with'))
    })

    it('should return `MinusToken` if it encounter a minus sign (-)', () => {
      // arrange
      expect.hasAssertions()
      const text: JSONText = JSON.stringify(-100)
      const scanner = new LexerImpl(text)
      // act
      scanner.scan()
      // assert
      expect(scanner.getToken()).toBe(SyntaxKind.MinusToken)
    })

    describe('number - A number is a sequence of decimal digits with no superfluous leading zero. It may have a preceding minus sign. It may have a fractional part prefixed by a decimal point. It may have an exponent, prefixed by `e` or `E` and optionally `+`  or `-`. The digits are the code points U+0030 through U+0039.', () => {
      it('should return `NumericLiteral` when it encounters a positive integer number as `100`', () => {
        // arrange
        expect.hasAssertions()
        const text = JSON.stringify(100)
        const scanner = new LexerImpl(text)
        // act
        scanner.scan()
        // assert
        expect(scanner.getToken()).toBe(SyntaxKind.NumericLiteral)
        expect(scanner.getTokenValue()).toBe('100')
      })

      it('should return `NumericLiteral` when it encounters a negative integer number as `-100`', () => {
        // arrange
        expect.hasAssertions()
        const text = JSON.stringify(-100)
        const scanner = new LexerImpl(text)
        // act
        scanner.scan()
        // assert
        expect(scanner.getToken()).toBe(SyntaxKind.MinusToken)
        expect(scanner.scan()).toBe(SyntaxKind.NumericLiteral)
        expect(scanner.getTokenValue()).toBe('100')
      })
      it('should return `NumericLiteral` when it encounters a number with a fractional part prefixed by a decimal point as `0.15`', () => {
        // arrange
        expect.hasAssertions()
        const text = JSON.stringify(0.15)
        const scanner = new LexerImpl(text)
        // act
        scanner.scan()
        // assert
        expect(scanner.getToken()).toBe(SyntaxKind.NumericLiteral)
        expect(scanner.getTokenText()).toBe('0.15')
      })

      describe('should return `NumericLiteral` when it encounters a number with an exponent, prefixed by `e` (`U+0065`) or `E` (`U+0045`) and optionally `+` (`U+002B`) or `-` (`U+002D`).The digits are the code points (`U+0030`) through (`U+0039`).', () => {
        it('should handle `2e200` as input', () => {
          // arrange
          expect.hasAssertions()
          const text = '2e200'
          const scanner = new LexerImpl(text)
          // act
          scanner.scan()
          // assert
          expect(scanner.getToken()).toBe(SyntaxKind.NumericLiteral)
          expect(scanner.getTokenValue()).toBe('2e+200')
        })

        it('should handle `0.1E+34` as input', () => {
          // arrange
          expect.hasAssertions()
          // eslint-disable-next-line prettier/prettier
          const text = '0.1E+34'
          const scanner = new LexerImpl(text)
          // act
          scanner.scan()
          // assert
          expect(scanner.getToken()).toBe(SyntaxKind.NumericLiteral)
          expect(scanner.getTokenValue()).toBe('1e+33')
        })
        it('should handle `-1e-100` as input', () => {
          // arrange
          expect.hasAssertions()
          // eslint-disable-next-line prettier/prettier
          const text = '-1e-100'
          const scanner = new LexerImpl(text)
          // act
          scanner.scan()
          // assert
          expect(scanner.scan()).toBe(SyntaxKind.NumericLiteral)
          expect(scanner.getTokenValue()).toBe('1e-100')
        })
      })
    })
  })
})
