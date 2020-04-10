/* eslint-disable no-magic-numbers */
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind } from 'types'

describe('lexerImpl - scan - number:\n A number is a sequence of decimal digits with no superfluous leading zero. It may have a preceding minus sign. It may have a fractional part prefixed by a decimal point. It may have an exponent, prefixed by `e` or `E` and optionally `+`  or `-`. The digits are the code points U+0030 through U+0039.', () => {
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
