import { KeywordSyntaxKind, MapLike, SyntaxKind } from 'types'

/**
 * Create a new map from a template object is provided, the map will copy entries from it.
 *
 * @export
 * @template K
 * @template T
 * @param {Record<K, T>} template
 * @returns {Map<K, T>}
 */
export function createMapFromTemplate<K extends string | number, T>(
  template: Record<K, T>
): Map<K, T> {
  const map: Map<K, T> = new Map()

  // Copies keys/values from template. Note that for..in will not throw if
  // template is undefined, and instead will just exit the loop.

  // eslint-disable-next-line no-restricted-syntax
  for (const key in template) {
    if (template.hasOwnProperty(key)) {
      map.set(key, template[key])
    }
  }

  return map
}

export const textToKeywordObject: MapLike<KeywordSyntaxKind> = {
  false: SyntaxKind.FalseKeyword,
  null: SyntaxKind.NullKeyword,
  true: SyntaxKind.TrueKeyword,
}

export const textToKeyword = createMapFromTemplate(textToKeywordObject)

export function stringToKeyword(string: string): KeywordSyntaxKind | undefined {
  return textToKeyword.get(string)
}

export const textToToken = createMapFromTemplate<string, SyntaxKind>({
  ...textToKeywordObject,
  ',': SyntaxKind.CommaToken,
  ':': SyntaxKind.ColonToken,
  '[': SyntaxKind.LeftSquareBracketToken,
  ']': SyntaxKind.RightSquareBracketToken,
  '{': SyntaxKind.LeftCurlyBracketToken,
  '}': SyntaxKind.RightCurlyBracketToken,
  '-': SyntaxKind.MinusToken,
})

export function stringToToken(string: string): SyntaxKind | undefined {
  return textToToken.get(string)
}

function makeReverseMap(source: Map<string, number>): string[] {
  const result: string[] = []
  source.forEach((value, name): void => {
    result[value] = name
  })
  return result
}

const tokenStrings = makeReverseMap(textToToken)
export function tokenToString(token: SyntaxKind): string | undefined {
  return tokenStrings[token]
}
