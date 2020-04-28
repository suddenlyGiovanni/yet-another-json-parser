import { MapLike, SyntaxKind } from 'types'
import {
  createMapFromTemplate,
  stringToKeyword,
  stringToToken,
  textToKeyword,
  textToToken,
  tokenToString,
} from 'utils/maps'

describe('createMapFromTemplate', () => {
  const enum WhitespaceSyntaxKind {
    Unknown, // 0
    EndOfFileToken, // 1
    SingleLineCommentTrivia, // 2
    MultiLineCommentTrivia, // 3
    NewLineTrivia, // 4
    WhitespaceTrivia, // 5
  }

  const mapLikeTemplate: MapLike<WhitespaceSyntaxKind> = {
    endOfFileToken: WhitespaceSyntaxKind.EndOfFileToken,
    multiLineCommentTrivia: WhitespaceSyntaxKind.MultiLineCommentTrivia,
    newLineTrivia: WhitespaceSyntaxKind.NewLineTrivia,
    singleLineCommentTrivia: WhitespaceSyntaxKind.SingleLineCommentTrivia,
    unknown: WhitespaceSyntaxKind.Unknown,
    whitespaceTrivia: WhitespaceSyntaxKind.WhitespaceTrivia,
  }
  it('should accept a MapLike object as template', () => {
    expect.assertions(1)
    // arrange
    const fn = (): Map<string | number, WhitespaceSyntaxKind> =>
      createMapFromTemplate(mapLikeTemplate)

    // assert
    expect(fn).not.toThrow()
  })

  it('should return the correct `Map` given a proper MapLike object as template', () => {
    expect.assertions(1)
    // arrange
    const expectedMap = new Map(Object.entries(mapLikeTemplate))
    // assert
    expect(createMapFromTemplate(mapLikeTemplate)).toStrictEqual(expectedMap)
  })
})

describe('type maps', () => {
  it('`textToKeyword` should allow all Map operation over textToKeywordObject dictionary', () => {
    expect.hasAssertions()

    expect(textToKeyword.has('false')).toBe(true)
    expect(stringToKeyword('false')).toBe(SyntaxKind.FalseKeyword)

    expect(textToKeyword.has('null')).toBe(true)
    expect(stringToKeyword('null')).toBe(SyntaxKind.NullKeyword)

    expect(textToKeyword.has('true')).toBe(true)
    expect(stringToKeyword('true')).toBe(SyntaxKind.TrueKeyword)

    expect(textToKeyword.has('undefined')).toBe(false)
    expect(stringToKeyword('undefined')).toBeUndefined()
  })

  it('`textToToken` should allow all Map operation over all syntax token dictionary', () => {
    expect.hasAssertions()

    expect(textToToken.has('not in the map')).toBe(false)
    expect(typeof stringToToken('not in the map')).toBe('undefined')

    expect(textToToken.has('false')).toBe(true)
    expect(stringToToken('false')).toBe(SyntaxKind.FalseKeyword)

    expect(textToToken.has('null')).toBe(true)
    expect(stringToToken('null')).toBe(SyntaxKind.NullKeyword)

    expect(textToToken.has('true')).toBe(true)
    expect(stringToToken('true')).toBe(SyntaxKind.TrueKeyword)

    expect(textToToken.has(',')).toBe(true)
    expect(stringToToken(',')).toBe(SyntaxKind.CommaToken)

    expect(textToToken.has(':')).toBe(true)
    expect(stringToToken(':')).toBe(SyntaxKind.ColonToken)

    expect(textToToken.has('[')).toBe(true)
    expect(stringToToken('[')).toBe(SyntaxKind.LeftSquareBracketToken)

    expect(textToToken.has(']')).toBe(true)
    expect(stringToToken(']')).toBe(SyntaxKind.RightSquareBracketToken)

    expect(textToToken.has('{')).toBe(true)
    expect(stringToToken('{')).toBe(SyntaxKind.LeftCurlyBracketToken)

    expect(textToToken.has('}')).toBe(true)
    expect(stringToToken('}')).toBe(SyntaxKind.RightCurlyBracketToken)

    expect(textToToken.has('-')).toBe(true)
    expect(stringToToken('-')).toBe(SyntaxKind.MinusToken)
  })

  it('tokenToString', () => {
    expect.hasAssertions()

    expect(tokenToString(SyntaxKind.FalseKeyword)).toBe('false')

    expect(tokenToString(SyntaxKind.TrueKeyword)).toBe('true')

    expect(tokenToString(SyntaxKind.NullKeyword)).toBe('null')

    expect(tokenToString(SyntaxKind.CommaToken)).toBe(',')

    expect(tokenToString(SyntaxKind.ColonToken)).toBe(':')

    expect(tokenToString(SyntaxKind.LeftSquareBracketToken)).toBe('[')

    expect(tokenToString(SyntaxKind.RightSquareBracketToken)).toBe(']')

    expect(tokenToString(SyntaxKind.LeftCurlyBracketToken)).toBe('{')

    expect(tokenToString(SyntaxKind.RightCurlyBracketToken)).toBe('}')

    expect(tokenToString(SyntaxKind.MinusToken)).toBe('-')

    expect(tokenToString(SyntaxKind.EndOfFileToken)).toBeUndefined()
  })
})
