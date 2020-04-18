// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { ErrorCallback, Lexer } from 'types/lexer'

describe('lexerImpl - instantiation', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }

  const stringElementToMatch = '"JSONValueGrammar"'
  const textStartPos = text.search(new RegExp(stringElementToMatch))

  it('should allow the user to create `a new instance` of LexerImpl `without specifying any parameters`', () => {
    // arrange
    expect.hasAssertions()
    const createLexer = (): Lexer => new LexerImpl()
    // assert
    expect(createLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl and provide a `text` to be parsed', () => {
    // arrange
    expect.hasAssertions()
    // act
    const createLexer = (): Lexer => new LexerImpl({ textInitial: text })
    // assert
    expect(createLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl with `text` and an `onError` callback function', () => {
    // arrange
    expect.hasAssertions()
    const onError = setUpOnError()
    // act
    const createLexer = (): Lexer =>
      new LexerImpl({ onError, textInitial: text })
    // assert
    expect(createLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl with `text`,`onError` and a `start` position for the lexer', () => {
    // arrange
    expect.hasAssertions()

    // act
    const createLexer = (): Lexer =>
      new LexerImpl({
        onError: setUpOnError(),
        start: textStartPos,
        textInitial: text,
      })
    // assert
    expect(createLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl with `text`,`onError`, `start` and `end` position for the lexer', () => {
    // arrange
    expect.hasAssertions()
    const end = text.indexOf('}')
    // act
    const instantiateLexer = (): Lexer =>
      new LexerImpl({
        length: end,
        onError: setUpOnError(),
        start: textStartPos,
        textInitial: text,
      })
    // assert
    expect(instantiateLexer).not.toThrow()
  })

  it('should allow the user to create `a new instance` of LexerImpl and specify how whitespaces should be handled', () => {
    // arrange
    expect.hasAssertions()
    const createLexer = (): Lexer =>
      new LexerImpl({
        length: text.length,
        onError: setUpOnError(),
        skipTrivia: true,
        start: textStartPos,
        textInitial: text,
      })
    // assert
    expect(createLexer).not.toThrow()
  })
})
