/* eslint-disable no-magic-numbers */
// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind } from 'types'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - scan - number:\n A number is a sequence of decimal digits with no superfluous leading zero. It may have a preceding minus sign. It may have a fractional part prefixed by a decimal point. It may have an exponent, prefixed by `e` or `E` and optionally `+`  or `-`. The digits are the code points U+0030 through U+0039.', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }
  it('should return `NumericLiteral` when it encounters a positive integer number as `100`', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/100/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.NumericLiteral)
    expect(lexer.getTokenValue()).toBe('100')
  })

  it('should return `NumericLiteral` when it encounters a negative integer number as `-100`', () => {
    // arrange
    expect.hasAssertions()
    const startTextPos = text.search(/-100/) // ?
    const lexer = new LexerImpl(text, setUpOnError(), startTextPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.MinusToken)
    expect(lexer.scan()).toBe(SyntaxKind.NumericLiteral)
    expect(lexer.getTokenValue()).toBe('100')
  })
  it('should return `NumericLiteral` when it encounters a number with a fractional part prefixed by a decimal point as `0.001`', () => {
    // arrange
    expect.hasAssertions()
    const startTextPos = text.search(/0.001/)
    const lexer = new LexerImpl(text, setUpOnError(), startTextPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.NumericLiteral)
    expect(lexer.getTokenValue()).toBe('0.001')
    expect(lexer.getTokenText()).toBe('0.001')
  })

  describe('should return `NumericLiteral` when it encounters a number with an exponent, prefixed by `e` (`U+0065`) or `E` (`U+0045`) and optionally `+` (`U+002B`) or `-` (`U+002D`).The digits are the code points (`U+0030`) through (`U+0039`).', () => {
    it('should handle `1e+100` as input', () => {
      // arrange
      expect.hasAssertions()
      const textStartPos = text.search(/1e\+100/)
      const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.NumericLiteral)
      expect(lexer.getTokenText()).toBe('1e+100')
      expect(lexer.getTokenValue()).toBe('1e+100')
    })

    it('should handle `0.1E+34` as input', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl('0.1E+34')
      // act
      lexer.scan()
      // assert
      expect(lexer.getToken()).toBe(SyntaxKind.NumericLiteral)
      expect(lexer.getTokenValue()).toBe('1e+33')
      expect(lexer.getTokenText()).toBe('0.1E+34')
    })
    it('should handle `-1e-100` as input', () => {
      // arrange
      expect.hasAssertions()
      // eslint-disable-next-line prettier/prettier
      const textStartPos = text.search(/-1e-100/) // ?
      const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
      // act
      lexer.scan()
      // assert
      expect(lexer.scan()).toBe(SyntaxKind.NumericLiteral)
      expect(lexer.getTokenValue()).toBe('1e-100')
      expect(lexer.getTokenText()).toBe('1e-100')
    })
  })
})
