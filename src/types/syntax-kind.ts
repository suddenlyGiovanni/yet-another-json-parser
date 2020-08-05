import { MapLike } from 'types'

export type JSONStructuralTokens =
  | SyntaxKind.LeftSquareBracketToken
  | SyntaxKind.LeftCurlyBracketToken
  | SyntaxKind.RightSquareBracketToken
  | SyntaxKind.RightCurlyBracketToken
  | SyntaxKind.ColonToken
  | SyntaxKind.CommaToken

export type JSONLiteralNameTokens =
  | SyntaxKind.TrueKeyword
  | SyntaxKind.FalseKeyword
  | SyntaxKind.NullKeyword

export type WhiteSpaceTokens =
  | SyntaxKind.CharacterTabulationToken
  | SyntaxKind.LineFeedToken
  | SyntaxKind.CarriageReturnToken
  | SyntaxKind.SpaceToken

/**
 * * literal
 * * Pseudo-literals
 * * Punctuation
 * * Assignments
 * * Identifiers and PrivateIdentifiers
 * * Reserved words
 * * Strict mode reserved words
 * * Contextual keywords
 *
 * // Parse tree nodes
 * * Names
 * * Signature elements
 * * TypeMember
 * * Type
 * * Binding patterns
 * * Expression
 * * Misc
 * * Element
 * * Module references
 * * JSX
 * * Clauses
 * * Property assignments
 * * Enum
 * * Unparsed
 * * Top-level nodes
 * * JSDoc nodes
 * * The * type
 * * The ? type
 * * Synthesized list
 * * Transformation nodes
 * * Enum value count
 * * Markers
 *
 *
 * @export
 * @enum {number}
 */
export const enum SyntaxKind {
  /** Bottom type representing an unknown token */
  Unknown,

  /** Token representing the termination of the whole text */
  EndOfFileToken,
  SingleLineCommentTrivia,
  MultiLineCommentTrivia,
  NewLineTrivia,
  WhitespaceTrivia,

  // Literals

  NumericLiteral,

  StringLiteral,

  // Punctuation

  /**
   * token: `[`
   * description: left square bracket
   * unicode code point: `U+005B`
   */
  LeftSquareBracketToken,

  /**
   * token: `{`
   * description: left curly bracket
   * unicode code point: `U+007B`
   */
  LeftCurlyBracketToken,

  /**
   * token: `]`
   * description: right square bracket
   * unicode code point: `U+005D`
   */
  RightSquareBracketToken,

  /**
   * token: `}`
   * description: right curly bracket
   * unicode code point: `U+007D`
   */
  RightCurlyBracketToken,

  /**
   * token: `:`
   * description: colon
   * unicode code point: `U+003A`
   */
  ColonToken,

  /**
   * token: `,`
   * description: comma
   * unicode code point: `U+002C`
   */
  CommaToken,

  /**
   * token: `\t`
   * description: character tabulation
   * unicode code point: `U+0009`
   */
  CharacterTabulationToken,

  /**
   * token: `\n`
   * description: line feed
   * unicode code point: `U+000A`
   */
  LineFeedToken,

  /**
   * token: `\r`
   * description: carriage return
   * unicode code point: `U+000D`
   */
  CarriageReturnToken,

  /**
   * token: `\s`
   * description: space
   * unicode code point: `U+0020`
   */
  SpaceToken,

  /**
   * token: `-`
   * description: hyphen-minus
   * unicode code point: `U+002D`
   */
  MinusToken,

  // Assignments

  // Identifiers and PrivateIdentifiers

  Identifier,

  // Reserved words

  /**
   * token: `true`
   * description: boolean type `true`
   * unicode code point: `U+0074` + `U+0072` + `U+0075` + `U+0065`
   */
  TrueKeyword,

  /**
   * token: `false`
   * description: boolean type `false`
   * unicode code point: `U+0066` + `U+0061` + `U+006C` + `U+0073` + `U+0065`
   */
  FalseKeyword,

  /**
   * token: `null`
   * unicode code point: `U+006E` + `U+0075` + `U+006C` + `U+006C`
   */
  NullKeyword, // <- LastKeyword and LastToken and LastContextualKeyword

  // Strict mode reserved words

  // Contextual keywords

  // <- Parse tree nodes

  // Names

  // Signature elements

  // TypeMember

  // Type

  // Binding patterns

  // Expression
  ArrayLiteralExpression,
  PrefixUnaryExpression,
  OmittedExpression,

  // Misc

  // Element
  ExpressionStatement,

  // Module references

  // JSX

  // Clauses

  // Property assignments

  // Enum

  // Unparsed

  // Top-level nodes

  SourceFile,

  // JSDoc nodes

  // The * type

  // The ? type

  // Synthesized list

  // Transformation nodes

  // Enum value count

  // Markers

  FirstKeyword = TrueKeyword,

  LastKeyword = NullKeyword,

  FirstPunctuation = LeftSquareBracketToken,

  LastPunctuation = MinusToken,

  FirstToken = Unknown,

  LastToken = NullKeyword,

  FirstTriviaToken = SingleLineCommentTrivia,

  LastTriviaToken = WhitespaceTrivia,

  FirstLiteralToken = NumericLiteral,

  LastLiteralToken = StringLiteral,

  FirstNode = ArrayLiteralExpression,
}

export type KeywordSyntaxKind =
  | SyntaxKind.TrueKeyword
  | SyntaxKind.FalseKeyword
  | SyntaxKind.NullKeyword

export type JSONValueGrammar =
  | SyntaxKind.LeftSquareBracketToken
  | SyntaxKind.LeftCurlyBracketToken
  | SyntaxKind.RightSquareBracketToken
  | SyntaxKind.RightCurlyBracketToken
  | SyntaxKind.ColonToken
  | SyntaxKind.CommaToken
  | SyntaxKind.TrueKeyword
  | SyntaxKind.FalseKeyword
  | SyntaxKind.NullKeyword
