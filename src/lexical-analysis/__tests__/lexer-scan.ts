/* eslint-disable no-magic-numbers */
// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind, TokenFlags } from 'types/index'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - scan', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }
  it('should return `EndOfFileToken` if the lexer has reached the end of text', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.length
    const textEndPos = text.length
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos, textEndPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.EndOfFileToken)
  })

  it('should call the onError callback and return `SyntaxKind.Unknown` token if the lexer does not match any know character', () => {
    // arrange
    expect.hasAssertions()
    const textInitial = `💥🧨`

    const onError = setUpOnError()
    const lexer = new LexerImpl(textInitial, onError)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.Unknown)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0]).toContain('invalid character')
  })

  it('should error if the scanned character falls out of the Basic Multilingual Plane (BMP) beyond 65_536 code points', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()
    const chCodePointOutOfBasicMultilingualPlane =
      LexerImpl.UNICODE_BMP_TOP_BOUNDARY
    const illegalText = String.fromCodePoint(
      chCodePointOutOfBasicMultilingualPlane
    )
    const scanner = new LexerImpl(illegalText, onError)
    // act
    scanner.scan()
    // expect
    expect(scanner.getToken()).toBe(SyntaxKind.Unknown)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0]).toContain('invalid character')
    expect(scanner.getTextPos()).toBe(2)
  })

  it('should return `NewLineTrivia` if it encounter a line feed', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/\n/)
    const textEndPos = text.length
    const lexer = new LexerImpl(
      text,
      setUpOnError(),
      textStartPos,
      textEndPos,
      false
    )
    // act
    lexer.scan()
    // assert
    expect(lexer.getTokenFlags()).toBe(TokenFlags.PrecedingLineBreak)
    expect(lexer.getTextPos()).toBe(textStartPos + 1)
    expect(lexer.getToken()).toBe(SyntaxKind.NewLineTrivia)
  })

  it('should return `NewLineTrivia` if it encounter a carriage return', () => {
    // arrange
    expect.hasAssertions()
    const textWithCarriageReturn = `text with carriage return\r`
    const textStartPos = textWithCarriageReturn.search(/\r/)
    const textEndPos = textWithCarriageReturn.length
    const lexer = new LexerImpl(
      textWithCarriageReturn,
      setUpOnError(),
      textStartPos,
      textEndPos,
      false
    )
    // act
    lexer.scan()
    // assert
    expect(lexer.getTokenFlags()).toBe(TokenFlags.PrecedingLineBreak)
    expect(lexer.getTextPos()).toBe(textStartPos + 1)
    expect(lexer.getToken()).toBe(SyntaxKind.NewLineTrivia)
    expect(lexer.scan()).toBe(SyntaxKind.EndOfFileToken)
  })

  it('should return `NewLineTrivia` if it encounter a carriage return and a line feed', () => {
    // arrange
    expect.hasAssertions()
    const textWithCarriageReturnAndLineFeed = `text with carriage return and line feed\r\n`
    const textStartPos = textWithCarriageReturnAndLineFeed.search(/\r/)
    const textEndPos = textWithCarriageReturnAndLineFeed.length
    const lexer = new LexerImpl(
      textWithCarriageReturnAndLineFeed,
      setUpOnError(),
      textStartPos,
      textEndPos,
      false
    )
    // act
    lexer.scan()
    // assert
    expect(lexer.getTokenFlags()).toBe(TokenFlags.PrecedingLineBreak)
    expect(lexer.getTextPos()).toBe(textStartPos + 2)
    expect(lexer.getToken()).toBe(SyntaxKind.NewLineTrivia)
    expect(lexer.scan()).toBe(SyntaxKind.EndOfFileToken)
  })

  it('should return `WhitespaceTrivia` if it encounter an Insignificant whitespace', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    const textWithWhiteSpaces = 'text  \f\v\twith whites space'
    const textStartPos = textWithWhiteSpaces.search(/text/) + 'text'.length // ?
    const textEndPos = textWithWhiteSpaces.length
    const lexer = new LexerImpl(
      textWithWhiteSpaces,
      onError,
      textStartPos,
      textEndPos
    )
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.WhitespaceTrivia)
    expect(lexer.getTextPos()).toBe(textWithWhiteSpaces.lastIndexOf('with'))
  })

  it('should return `MinusToken` if it encounter a minus sign (-)', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/-100/)
    const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.MinusToken)
  })
})
