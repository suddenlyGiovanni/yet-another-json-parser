/* eslint-disable no-magic-numbers */

// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__/index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind, TokenFlags } from 'types'
import { ErrorCallback } from 'types/lexer'

describe('lexerImpl - API', () => {
  const onErrorMock = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  function setUpOnError(): typeof onErrorMock {
    onErrorMock.mockReset()
    return onErrorMock
  }

  const stringElementToMatch = '"JSONValueGrammar"'
  const textStartPos = text.search(new RegExp(stringElementToMatch))

  describe('lexer instantiation', () => {
    it('should allow for no parameters specification', () => {
      // arrange
      expect.hasAssertions()
      const instantiateLexer = (): LexerImpl => new LexerImpl()
      // assert
      expect(instantiateLexer).not.toThrow()
    })

    it('should allow for `text` to be specified', () => {
      // arrange
      expect.hasAssertions()
      // act
      const instantiateLexer = (): LexerImpl => new LexerImpl(text)
      // assert
      expect(instantiateLexer).not.toThrow()
    })

    it('should allow for `text` and an `onError` callback function to be specified,', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()
      // act
      const instantiateLexer = (): LexerImpl => new LexerImpl(text, onError)
      // assert
      expect(instantiateLexer).not.toThrow()
    })

    it('should allow for `text`,`onError` and `start` position of lexing to be specified,', () => {
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

    it('should allow for `text`,`onError`, `start` and `end` position of lexing to be specified,', () => {
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

  describe('public API', () => {
    it('should allow the user to `retrieve` the whole `text` to provided to the lexer (`getText`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text)
      // assert
      expect(lexer.getText()).toBe(text)
    })

    it('should allow the user to tokenize the next sensible text part (`scan`)', () => {
      expect.hasAssertions()
      const { scan } = new LexerImpl(text)
      expect(scan).toBeDefined()
    })

    // Position APIs:
    describe('position API', () => {
      it('should allow the user to `get` `the start position` of the current token (`getTokenPos`)', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl(text, setUpOnError(), textStartPos) // ["]JSONValueGrammar": ...
        // act
        lexer.scan() // "[JSONValueGrammar]"
        const tokenPos = lexer.getTokenPos()
        const textAtPos = text[tokenPos]
        // assert
        expect(tokenPos).toBe(textStartPos)
        expect(textAtPos).toBe('"')
      })

      it('should allow the user to `get` `the end position of text` for the current token (`getTextPos`)', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl(text, setUpOnError(), textStartPos) // ["]JSONValueGrammar": ...
        // act
        lexer.scan() // "[JSONValueGrammar]": ...
        const textPos = lexer.getTextPos() // "JSONValueGrammar"[:] ...
        const textAtPosition = text[textPos] // :
        // assert
        expect(textPos).toBe(textStartPos + stringElementToMatch.length)
        expect(textAtPosition).toBe(':')
      })

      it('should allow the user to `get` the `start position` of whitespace for the current token (`getStartPos`)', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl(text, setUpOnError(), textStartPos) // ["]JSONValueGrammar": ...
        // act
        lexer.scan() // "[JSONValueGrammar]"
        const startPos = lexer.getStartPos() // ["]JSONValueGrammar"
        const textAtPos = text[startPos] // "
        // assert
        expect(startPos).toBe(textStartPos)
        expect(textAtPos).toBe('"')
      })
    })

    it('should allow the user to `set` a new `text` to be tokenized (`setText`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl()
      expect(lexer.getText()).toBe('')
      // act
      lexer.setText(text)
      // assert
      expect(lexer.getText()).toBe(text)
      expect(lexer.getTextPos()).toBe(0)
    })

    it('should allow the user to `set` a new `text` and specify an optional `start` and `end` position (`setText`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl()
      const start = text.indexOf('"JSONValues"')
      const end = text.length
      const setText = (): void => lexer.setText(text, start, end)
      // assert
      expect(setText).not.toThrow()
      expect(lexer.getText()).toBe(text)
      expect(lexer.getTextPos()).toBe(start)
    })

    it('should allow the user to `set` a new `start` position (`setTextPos`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text)
      const setTextPos = (): void => lexer.setTextPos(textStartPos)
      // assert
      expect(setTextPos).not.toThrow()
      expect(lexer.getTextPos()).toBe(textStartPos)
    })

    it('should allow the user to `hook up` an custom error handler that will call in case of errors (`setOnError`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text)
      const onErrorListener = setUpOnError()
      const setOnError = (): void => lexer.setOnError(onErrorListener)
      // assert
      expect(setOnError).not.toThrow()
    })

    it('should allow the user to `read` the `token type` at the current position (`getToken`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
      const { getToken } = lexer
      // act
      lexer.scan()
      // assert
      expect(getToken).toBeDefined()
      expect(lexer.getToken()).toBe(SyntaxKind.StringLiteral)
    })

    it('should allow the user to `read` the `token value` at the current position (`getTokenValue`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
      const { getTokenValue } = lexer
      // act
      lexer.scan()
      // assert
      expect(getTokenValue).toBeDefined()
      expect(lexer.getTokenValue()).toBe('JSONValueGrammar')
    })

    it('should allow the user to `read` the `text representation` of the token at the current position (`getTokenText`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
      const { getTokenText } = lexer
      // act
      lexer.scan()
      // assert
      expect(getTokenText).toBeDefined()
      expect(lexer.getTokenText()).toBe('"JSONValueGrammar"')
    })

    it('should allow the user to `read` the `token flag` of the token at the current position (`getTokenFlags`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl(text, setUpOnError(), textStartPos)
      const { getTokenFlags } = lexer
      // act
      lexer.scan()
      // assert
      expect(getTokenFlags).toBeDefined()
      expect(lexer.getTokenFlags()).toBe(TokenFlags.None)
    })
  })
})
