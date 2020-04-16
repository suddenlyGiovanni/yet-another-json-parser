// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - instantiation', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }
  it('should allow the user to create `a new instance` of LexerImpl `without specifying any parameters`', () => {
    // arrange
    expect.hasAssertions()
    const instantiateLexer = (): LexerImpl => new LexerImpl()
    // assert
    expect(instantiateLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl and provide a `text` to be parsed', () => {
    // arrange
    expect.hasAssertions()
    // act
    const instantiateLexer = (): LexerImpl => new LexerImpl(text)
    // assert
    expect(instantiateLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl with `text` and an `onError` callback function', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()
    // act
    const instantiateLexer = (): LexerImpl => new LexerImpl(text, onError)
    // assert
    expect(instantiateLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl with `text`,`onError` and a `start` position for the lexer', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    const start = text.search(/"JSONValueGrammar"/)
    // act
    const instantiateLexer = (): LexerImpl =>
      new LexerImpl(text, onError, start)
    // assert
    expect(instantiateLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl with `text`,`onError`, `start` and `end` position for the lexer', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()

    const start = text.search(/"JSONValueGrammar"/)
    const end = text.indexOf('}')
    // act
    const instantiateLexer = (): LexerImpl =>
      new LexerImpl(text, onError, start, end)
    // assert
    expect(instantiateLexer).not.toThrow()
  })
})
