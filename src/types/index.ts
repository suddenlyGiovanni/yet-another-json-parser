/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/number-literal-case */
/* eslint-disable no-magic-numbers */

export { CharacterCodes } from 'types/character-codes'
export { AssertEqual } from 'types/assert-equal'
export { TokenFlags } from 'types/token-flags'
export { MapLike } from 'types/map-like'
export {
  SyntaxKind,
  JSONValueGrammar,
  KeywordSyntaxKind,
} from 'types/syntax-kind'
export { Lexer  } from 'types/lexer'

/**
 * A JSON text is a sequence of tokens formed from Unicode code points that conforms to the JSON
 * value grammar. The set of tokens includes six structural tokens, strings, numbers, and three
 * literal name tokens.
 */
export type JSONText = string

/**
 * Insignificant whitespace is allowed before or after any token.
 * Whitespace is any sequence of one or more of the following code points:
 * - character tabulation (U+0009),
 * - line feed (U+000A),
 * - carriage return (U+000D), and
 * - space (U+0020).
 * Whitespace is not allowed within any token, except that space is allowed in strings.
 */
