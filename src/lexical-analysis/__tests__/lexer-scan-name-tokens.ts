// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind } from 'types'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - scan - literal name tokens', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }
  const lexer = new LexerImpl(text, setUpOnError())
  it('should return `SyntaxKind.TrueKeyword` when encountering the `true` reserved keyword', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/true/)
    lexer.setTextPos(textStartPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.TrueKeyword)
    expect(lexer.getTokenValue()).toBe('true')
    expect(lexer.getTokenText()).toMatch(/true/)
  })
  it('should return `SyntaxKind.FalseKeyword` when encountering the `false` reserved keyword', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/false/)
    lexer.setTextPos(textStartPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.FalseKeyword)
    expect(lexer.getTokenValue()).toBe('false')
    expect(lexer.getTokenText()).toMatch(/false/)
  })

  it('should return `SyntaxKind.NullKeyword` when encountering the `null` reserved keyword', () => {
    // arrange
    expect.hasAssertions()
    const textStartPos = text.search(/null/)
    lexer.setTextPos(textStartPos)
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.NullKeyword)
    expect(lexer.getTokenValue()).toBe('null')
    expect(lexer.getTokenText()).toMatch(/null/)
  })

  it('should not care about non legal json literal tokens', () => {
    // arrange
    expect.hasAssertions()
    const scanner = new LexerImpl(`{"legalJsonKey":illegalJsonValue}`)

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
