/* eslint-disable no-magic-numbers */
import { JSONText, TokenFlags } from '../../../types'
import { Lexer } from '../lexer'
import type { ErrorCallback } from '../lexer'

import { SyntaxKind } from 'lexical-analysis/types'

describe('lexer', () => {
  const mockOnError = jest.fn(
    ((_message: string, _length: number): void => undefined) as ErrorCallback
  )

  const jsonText: JSONText = `{
    "property": null
  }`

  function setUpOnError(): typeof mockOnError {
    mockOnError.mockReset()
    return mockOnError
  }

  it('should not throw if instantiated without any arguments', () => {
    expect.hasAssertions()

    function instantiateLexer(): Lexer {
      return new Lexer()
    }
    expect(instantiateLexer).not.toThrow()
  })

  it('should accepts an optional text, an onError callback fn, a start position, and total text length', () => {
    expect.hasAssertions()

    const start = 0
    const { length } = jsonText
    const onError = setUpOnError()
    function instantiateLexer(): Lexer {
      return new Lexer(jsonText, onError, start, length)
    }
    expect(instantiateLexer).not.toThrow()
  })

  it('should be able to accepts a new `text` to tokenize', () => {
    expect.hasAssertions()
    const scanner = new Lexer()
    scanner.setText(jsonText)
    expect(scanner.getText()).toBe(jsonText)
  })
  it('should be able to accepts a new `text` and the position were to start', () => {
    expect.hasAssertions()
    const scanner = new Lexer()
    const startPos = 4
    const { length } = jsonText
    scanner.setText(jsonText, startPos, length)
    expect(scanner.getText()).toBe(jsonText)
  })

  it('should provide a way to set and retrieve the scanner position', () => {
    expect.hasAssertions()
    const start = 6
    const textPos = 17
    const onError = setUpOnError()
    const scanner = new Lexer(jsonText, onError, start, jsonText.length)

    expect(scanner.getTextPos()).toBe(start)
    scanner.setTextPos(textPos)

    expect(scanner.getTextPos()).toBe(textPos)
  })

  it('should return the current token when `getToken` is invoked', () => {
    expect.hasAssertions()
    const scanner = new Lexer()
    expect(scanner.getToken()).toBe(SyntaxKind.Unknown)
  })

  describe('scan', () => {
    it('should return `EndOfFileToken` if the scanner has reached the end of text', () => {
      expect.hasAssertions()
      const start = jsonText.length
      const { length } = jsonText
      const onError = setUpOnError()
      const scanner = new Lexer(jsonText, onError, start, length)
      const token = scanner.scan()

      expect(token).toBe(SyntaxKind.EndOfFileToken)
    })

    it('should call the onError callback and return `SyntaxKind.Unknown` token if the scanner does not match any know character', () => {
      expect.hasAssertions()
      const textInitial = `💥🧨`
      const onError = setUpOnError()
      const scanner = new Lexer(textInitial, onError)

      const token = scanner.scan()
      expect(token).toBe(SyntaxKind.Unknown)
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith('invalid character', 0)
    })

    it('should error if the scanned character falls out of the Basic Multilingual Plane (BMP) beyond 65,536 code points', () => {
      expect.hasAssertions()
      const textInitial = `${String.fromCodePoint(0x10000)}`
      const onError = setUpOnError()
      const scanner = new Lexer(textInitial, onError)

      expect(scanner.scan()).toBe(SyntaxKind.Unknown)
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith('invalid character', 0)
      expect(scanner.getTextPos()).toBe(2)
    })

    it('should return `NewLineTrivia` if it encounter a line feed', () => {
      // arrange
      expect.hasAssertions()
      const onError = setUpOnError()
      const textWithLineFeed = `text with line feed\n`

      const initialPos = textWithLineFeed.lastIndexOf('feed') + 'feed'.length // ?
      const { length } = textWithLineFeed
      const scanner = new Lexer(textWithLineFeed, onError, initialPos, length)

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
        textWithCarriageReturn.lastIndexOf('return') + 'return'.length // ?
      const { length } = textWithCarriageReturn
      const scanner = new Lexer(
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
        textWithCarriageReturnAndLineFeed.lastIndexOf('feed') + 'feed'.length // ?
      const { length } = textWithCarriageReturnAndLineFeed
      const scanner = new Lexer(
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
  })
})
