/* eslint-disable sonarjs/no-duplicate-string */
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

  describe('public API', () => {
    it('should allow the user to `retrieve` the whole `text` to provided to the lexer (`getText`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl({ textInitial: text })
      // assert
      expect(lexer.getText()).toBe(text)
    })

    it('should allow the user to tokenize the next sensible text part (`scan`)', () => {
      expect.hasAssertions()
      const { scan } = new LexerImpl({ textInitial: text })
      expect(scan).toBeDefined()
    })

    // Position APIs:
    describe('position API', () => {
      it('should allow the user to `get` `the start position` of the current token (`getTokenPos`)', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl({ start: textStartPos, textInitial: text }) // ["]JSONValueGrammar": ...
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
        const lexer = new LexerImpl({ start: textStartPos, textInitial: text }) // ["]JSONValueGrammar": ...
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
        const lexer = new LexerImpl({ start: textStartPos, textInitial: text }) // ["]JSONValueGrammar": ...
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
      const lexer = new LexerImpl({ textInitial: text })
      const setTextPos = (): void => lexer.setTextPos(textStartPos)
      // assert
      expect(setTextPos).not.toThrow()
      expect(lexer.getTextPos()).toBe(textStartPos)
    })

    it('should allow the user to `hook up` an custom error handler that will call in case of errors (`setOnError`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl()
      const onErrorListener = setUpOnError()
      const setOnError = (): void => lexer.setOnError(onErrorListener)
      // assert
      expect(setOnError).not.toThrow()
    })

    it('should allow the user to `read` the `token type` at the current position (`getToken`)', () => {
      // arrange
      expect.hasAssertions()
      const lexer = new LexerImpl({
        start: textStartPos,
        textInitial: text,
      })
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
      const lexer = new LexerImpl({ start: textStartPos, textInitial: text })
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
      const lexer = new LexerImpl({ start: textStartPos, textInitial: text })
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
      const lexer = new LexerImpl({
        start: textStartPos,
        textInitial: text,
      })
      const { getTokenFlags } = lexer
      // act
      lexer.scan()
      // assert
      expect(getTokenFlags).toBeDefined()
      expect(lexer.getTokenFlags()).toBe(TokenFlags.None)
    })

    describe('isIdentifier', () => {
      it('should allow the user to query if the token is an Identifier, (`isIdentifier`)', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl()
        const { isIdentifier } = lexer
        // assert
        expect(isIdentifier).toBeDefined()
      })
      it('should return `false` when the current token is not an Identifier', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl({ start: textStartPos, textInitial: text })
        // act
        lexer.scan()
        // assert
        expect(lexer.getToken()).not.toBe(SyntaxKind.Identifier)
        expect(lexer.isIdentifier()).toBe(false)
      })
      it('should return `true` when the current token is an Identifier', () => {
        // arrange
        expect.hasAssertions()
        const start = text.search(/true/)
        const lexer = new LexerImpl({ start, textInitial: text })
        // act
        lexer.scan()
        // assert
        expect(lexer.getToken()).toBe(SyntaxKind.TrueKeyword)
        expect(lexer.isIdentifier()).toBe(true)
      })
    })

    describe('hasPrecedingLineBreak', () => {
      it('should be defined', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl({
          start: textStartPos,
          textInitial: text,
        })
        const { hasPrecedingLineBreak } = lexer
        // act
        // assert
        expect(hasPrecedingLineBreak).toBeDefined()
      })

      it('should return `false` when no preceding line-brake has been encountered', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl({
          skipTrivia: true,
          start: 0,
          textInitial: text,
        })
        // act
        lexer.scan()
        // assert
        expect(lexer.hasPrecedingLineBreak()).toBe(false)
      })

      it('should return `true` when a preceding line-brake has been encountered', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl({
          skipTrivia: true,
          start: 1,
          textInitial: text,
        })
        // act
        lexer.scan()
        // assert
        expect(lexer.hasPrecedingLineBreak()).toBe(true)
      })
    })

    describe('isUnterminated', () => {
      it('should be defined', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl()
        const { isUnterminated } = lexer
        // assert
        expect(isUnterminated).toBeDefined()
      })

      it('should return `false` if the text has been lexed correctly', () => {
        // arrange
        expect.hasAssertions()
        const lexer = new LexerImpl({
          skipTrivia: true,
          start: 0,
          textInitial: text,
        })
        // act
        lexer.scan()
        // assert
        expect(lexer.isUnterminated()).toBe(false)
      })
      it('should return `true` if the text has not terminated not correctly', () => {
        expect.hasAssertions()
        const textInitial = '"Unterminated string literal \r"'
        const start = textInitial.length - 3
        const lexer = new LexerImpl({
          skipTrivia: true,
          start,
          textInitial,
        })
        // act
        lexer.scan()
        // assert
        expect(lexer.isUnterminated()).toBe(true)
      })
    })

    describe('hasUnicodeEscape', () => {
      it('should be defined', () => {
        // arrange
        expect.hasAssertions()
        const { hasUnicodeEscape } = new LexerImpl()
        // assert
        expect(hasUnicodeEscape).toBeDefined()
      })

      it("should return `false` if the lexer hasn't encounter an unicode escape sequence", () => {
        // arrange
        expect.hasAssertions()
        const start = text.search(/"this is a plain old 'string'"/)
        const lexer = new LexerImpl({
          skipTrivia: true,
          start,
          textInitial: text,
        })
        // act
        lexer.scan()
        // assert
        expect(lexer.hasUnicodeEscape()).toBe(false)
      })

      it('should return `true` if the lexer has encounter an unicode escape sequence', () => {
        // arrange
        expect.hasAssertions()
        const start = text.search(/"escape hexadecimal digits"/)
        const lexer = new LexerImpl({
          skipTrivia: true,
          start,
          textInitial: text,
        })
        // act
        lexer.scan() // key
        lexer.scan() // :
        lexer.scan() // string value
        // assert
        expect(lexer.hasUnicodeEscape()).toBe(true)
      })
    })
  })
})
