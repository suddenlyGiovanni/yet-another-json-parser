// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind } from 'types'

describe('lexerImpl - API - lookahead', () => {
  const lexer = new LexerImpl({
    skipTrivia: true,
    start: 1,
    textInitial: text,
  })
  it('should allow the user to call a `lookahead` method to look to the next tokens', () => {
    // arrange
    expect.hasAssertions()
    const { lookAhead } = lexer
    // assert
    expect(lookAhead).toBeDefined()
  })

  it("should throw if the user doesn't provide a predicate function as callback for `lookahead`", () => {
    // arrange
    expect.hasAssertions()
    const callback = jest.fn(() => '')
    const lookAhead = (): unknown => lexer.lookAhead(callback)
    // assert
    expect(lookAhead).not.toThrow()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveReturnedWith('')
  })

  it('should `not reset` the lexer state if the callback `returned truthy`', () => {
    // arrange
    expect.hasAssertions()
    const savePos = lexer.getTextPos()
    // const saveStartPos = lexer.getStartPos()
    const saveTokenPos = lexer.getTokenPos()
    const saveToken = lexer.getToken()
    const saveTokenValue = lexer.getTokenValue()
    const saveTokenFlags = lexer.getTokenFlags()
    const truthyCallback = jest.fn(() => {
      return lexer.scan() === SyntaxKind.StringLiteral
    })
    const lookAhead = (): boolean => lexer.lookAhead(truthyCallback)
    // act
    lookAhead()
    // assert
    expect(truthyCallback).toHaveBeenCalledTimes(1)
    expect(truthyCallback).toHaveReturnedWith(true)
    expect(lexer.getTextPos()).not.toBe(savePos)
    // expect(lexer.getStartPos()).not.toBe(saveStartPos)
    expect(lexer.getTokenPos()).not.toBe(saveTokenPos)
    expect(lexer.getToken()).not.toBe(saveToken)
    expect(lexer.getTokenValue()).not.toBe(saveTokenValue)
    expect(lexer.getTokenFlags()).not.toBe(saveTokenFlags)
  })
  it('should `reset` the lexer state if the callback `reruns falsy`', () => {
    // arrange
    expect.hasAssertions()
    lexer.setTextPos(text.search(/:/))

    const savePos = lexer.getTextPos()
    const saveStartPos = lexer.getStartPos()
    const saveTokenPos = lexer.getTokenPos()
    const saveToken = lexer.getToken()
    const saveTokenValue = lexer.getTokenValue()
    const saveTokenFlags = lexer.getTokenFlags()
    const falsyCallback = jest.fn(() => {
      lexer.scan()
      return lexer.getToken() !== SyntaxKind.ColonToken
    })
    const lookAhead = (): boolean => lexer.lookAhead(falsyCallback)
    // act
    lookAhead()
    // assert
    expect(falsyCallback).toHaveBeenCalledTimes(1)
    expect(falsyCallback).toHaveReturnedWith(false)
    expect(lexer.getTextPos()).toBe(savePos)
    expect(lexer.getStartPos()).toBe(saveStartPos)
    expect(lexer.getTokenPos()).toBe(saveTokenPos)
    expect(lexer.getToken()).toBe(saveToken)
    expect(lexer.getTokenValue()).toBe(saveTokenValue)
    expect(lexer.getTokenFlags()).toBe(saveTokenFlags)
  })
})
