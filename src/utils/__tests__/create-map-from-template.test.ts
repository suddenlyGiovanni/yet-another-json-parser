/* eslint-disable no-magic-numbers */
import { MapLike } from 'types'
import { createMapFromTemplate } from 'utils/create-map'

describe('createMapFromTemplate', () => {
  const enum SyntaxKind {
    Unknown, // 0
    EndOfFileToken, // 1
    SingleLineCommentTrivia, // 2
    MultiLineCommentTrivia, // 3
    NewLineTrivia, // 4
    WhitespaceTrivia, // 5
  }

  const mapLikeTemplate: MapLike<SyntaxKind> = {
    endOfFileToken: SyntaxKind.EndOfFileToken,
    multiLineCommentTrivia: SyntaxKind.MultiLineCommentTrivia,
    newLineTrivia: SyntaxKind.NewLineTrivia,
    singleLineCommentTrivia: SyntaxKind.SingleLineCommentTrivia,
    unknown: SyntaxKind.Unknown,
    whitespaceTrivia: SyntaxKind.WhitespaceTrivia,
  }
  it('should accept a MapLike object as template', () => {
    expect.assertions(1)
    // arrange
    const fn = (): Map<string | number, SyntaxKind> =>
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
