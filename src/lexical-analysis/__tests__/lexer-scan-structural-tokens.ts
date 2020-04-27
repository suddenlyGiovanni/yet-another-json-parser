import { LexerImpl } from 'lexical-analysis/lexer'
import { SyntaxKind } from 'types'

describe('lexerImpl - scan - structural tokens', () => {
  it('should return `SyntaxKind.LeftSquareBracket` when encountering a left square bracket `[`', () => {
    // arrange
    expect.hasAssertions()
    const lexer = new LexerImpl({ textInitial: '[]' })
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.LeftSquareBracketToken)
    expect(lexer.scan()).not.toBe(SyntaxKind.LeftSquareBracketToken)
  })

  it('should return `SyntaxKind.RightSquareBracket` when encountering a right square bracket `]`', () => {
    // arrange
    expect.hasAssertions()
    const lexer = new LexerImpl({ textInitial: '[]' })
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).not.toBe(SyntaxKind.RightSquareBracketToken)
    expect(lexer.scan()).toBe(SyntaxKind.RightSquareBracketToken)
  })

  it('should return `SyntaxKind.LeftCurlyBracket` when encountering a left curly bracket `{`', () => {
    // arrange
    expect.hasAssertions()
    const lexer = new LexerImpl({ textInitial: '{}' })
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.LeftCurlyBracketToken)
    expect(lexer.scan()).not.toBe(SyntaxKind.LeftCurlyBracketToken)
  })

  it('should return `SyntaxKind.RightCurlyBracket` when encountering a right curly bracket `}`', () => {
    // arrange
    expect.hasAssertions()
    const lexer = new LexerImpl({ textInitial: '{}' })
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).not.toBe(SyntaxKind.RightCurlyBracketToken)
    expect(lexer.scan()).toBe(SyntaxKind.RightCurlyBracketToken)
  })

  it('should return `SyntaxKind.Colon` when encountering a colon `:`', () => {
    // arrange
    expect.hasAssertions()
    const lexer = new LexerImpl({ textInitial: ' : ' })
    // act
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.ColonToken)
  })

  it('should return `SyntaxKind.Comma` when encountering a comma `,`', () => {
    // arrange
    expect.hasAssertions()
    const textInitial = '"key": "a, b, c",'
    const lexer = new LexerImpl({ textInitial })
    // act
    lexer.scan() // key
    lexer.scan() // colum
    lexer.scan() // StringLiteral
    lexer.scan()
    // assert
    expect(lexer.getToken()).toBe(SyntaxKind.CommaToken)
    expect(lexer.getTokenText()).toBe(',')
    expect(lexer.getTextPos()).toBe(textInitial.length)
  })
})
