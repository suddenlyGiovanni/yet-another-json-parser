/* eslint-disable no-magic-numbers */
/* eslint-disable jest/require-to-throw-message */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line jest/no-mocks-import
// import { text } from 'lexical-analysis/__mocks__/index'
import { Parser } from 'syntactic_analysis/parser'
import { SyntaxKind } from 'types'

describe('parser', () => {
  it('should instantiate successfully', () => {
    // arrange
    expect.hasAssertions()
    const instantiate = (): Parser => new Parser()
    // assert
    expect(instantiate).not.toThrow()
    expect(instantiate()).toBeInstanceOf(Parser)
  })

  describe('public api', () => {
    it('should allow to retrieve the current Source Text (`getSourceText`)', () => {
      // arrange
      expect.hasAssertions()
      const parser = new Parser()
      const { getSourceText } = parser
      // assert
      expect(getSourceText).toBeDefined()
      expect(typeof parser.getSourceText()).toBe('string')
      expect(parser.getSourceText()).toBe('')
    })

    it('should allow to retrieve the current token (`token`)', () => {
      // arrange
      expect.hasAssertions()
      const parser = new Parser()
      const { token } = parser
      // assert
      expect(token).toBeDefined()
      expect(typeof parser.token()).toBe('number')
      expect(parser.token()).toBe(SyntaxKind.Unknown)
    })

    it('should allow to retrieve the next token (`nextToken`)', () => {
      // arrange
      expect.hasAssertions()
      const parser = new Parser()
      const { nextToken } = parser
      // assert
      expect(nextToken).toBeDefined()
      expect(typeof parser.nextToken()).toBe('number')
      expect(parser.nextToken()).toBe(SyntaxKind.EndOfFileToken)
    })

    it('should allow to retrieve the node position within the source text (`getNodePos`)', () => {
      // arrange
      expect.hasAssertions()
      const parser = new Parser()
      const { getNodePos } = parser
      // assert
      expect(getNodePos).toBeDefined()
      expect(parser.getNodePos()).toBe(0)
    })

    it('scanError', () => {
      // arrange
      expect.hasAssertions()
      const parser = new Parser()
      const { scanError } = parser
      const message = 'error message'
      const length = 0
      const lazyScanError = (): void => parser.scanError(message, length)
      // assert
      expect(scanError).toBeDefined()
      expect(lazyScanError).not.toThrow()
    })
  })

  describe('parse', () => {
    it('should expose a parse method', () => {
      // arrange
      expect.hasAssertions()
      const { parse } = new Parser()
      // assert
      expect(parse).toBeDefined()
    })
  })
})
