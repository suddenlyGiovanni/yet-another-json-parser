/* eslint-disable no-control-regex */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable unicorn/better-regex */
/* eslint-disable @typescript-eslint/prefer-includes */
// import { SyntaxKind } from './types'

import { CharacterCodes } from '../../types'

/**
 * token: `[`
 * description: left square bracket
 * unicode code point: `U+005B`
 */
const LEFT_SQUARE_BRACKET: RegExp = /\u005B/

/**
 * token: `]`
 * description: right square bracket
 * unicode code point: `U+005D`
 */
const RIGHT_SQUARE_BRACKET: RegExp = /\u005D/

/**
 * token: `{`
 * description: left curly bracket
 * unicode code point: `U+007B`
 */
const LEFT_CURLY_BRACKET: RegExp = /\u007B/

/**
 * token: `}`
 * description: right curly bracket
 * unicode code point: `U+007D`
 */
const RIGHT_CURLY_BRACKET: RegExp = /\u007D/

/**
 * token: `:`
 * description: colon
 * unicode code point: `U+003A`
 */
const COLON: RegExp = /\u003A/

/**
 * token: `,`
 * description: comma
 * unicode code point: `U+002C`
 */
const COMMA: RegExp = /\u002C/

/**
 * token: `\t`
 * description: character tabulation
 * unicode code point: `U+0009`
 */
const CHARACTER_TABULATION: RegExp = /\u0009/

/**
 * token: `\n`
 * description: line feed
 * unicode code point: `U+000A`
 */
const LINE_FEED: RegExp = /\u000A/

/**
 * token: `\r`
 * description: carriage return
 * unicode code point: `U+000D`
 */
const CARRIAGE_RETURN: RegExp = /\u000D/

/**
 * token: `\s`
 * description: space
 * unicode code point: `U+0020`
 */
const SPACE: RegExp = /\u0020/

/**
 * token: `true`
 * description: boolean type `true`
 * unicode code point: `U+0074` + `U+0072` + `U+0075` + `U+0065`
 */
const TRUE: RegExp = /\b(true)\b/

/**
 * token: `false`
 * description: boolean type `false`
 * unicode code point: `U+0066` + `U+0061` + `U+006C` + `U+0073` + `U+0065`
 */
const FALSE: RegExp = /\b(false)\b/

/**
 * token: `null`
 * unicode code point: `U+006E` + `U+0075` + `U+006C` + `U+006C`
 */
const NULL: RegExp = /\b(null)\b/

export function isLeftSquareBracketToken(character: string): boolean {
  return LEFT_SQUARE_BRACKET.test(character)
}

export function isLeftSquareBracketChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.openBracket {
  return chrCodePoint === CharacterCodes.openBracket
}
export function isRightSquareBracketToken(character: string): boolean {
  return RIGHT_SQUARE_BRACKET.test(character)
}

export function iRightSquareBracketChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.closeBracket {
  return chrCodePoint === CharacterCodes.closeBracket
}

export function isLeftCurlyBracketToken(character: string): boolean {
  return LEFT_CURLY_BRACKET.test(character)
}

export function isLeftCurlyBracketChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.openBrace {
  return chrCodePoint === CharacterCodes.openBrace
}

export function isRightCurlyBracketToken(character: string): boolean {
  return RIGHT_CURLY_BRACKET.test(character)
}

export function isRightCurlyBracketChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.closeBrace {
  return chrCodePoint === CharacterCodes.closeBrace
}

export function isColonToken(character: string): boolean {
  return COLON.test(character)
}

export function isColonChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.colon {
  return chrCodePoint === CharacterCodes.colon
}

export function isCommaToken(character: string): boolean {
  return COMMA.test(character)
}

export function isCommaChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.comma {
  return chrCodePoint === CharacterCodes.comma
}

export function isCharacterTabulationToken(character: string): boolean {
  return CHARACTER_TABULATION.test(character)
}

export function isCharacterTabulationChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.tab {
  return chrCodePoint === CharacterCodes.tab
}

export function isLineFeedToken(character: string): boolean {
  return LINE_FEED.test(character)
}

export function isLineFeedChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.lineFeed {
  return chrCodePoint === CharacterCodes.lineFeed
}

export function isCarriageReturnToken(character: string): boolean {
  return CARRIAGE_RETURN.test(character)
}

export function isCarriageReturnChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.carriageReturn {
  return chrCodePoint === CharacterCodes.carriageReturn
}

export function isSpaceToken(character: string): boolean {
  return SPACE.test(character)
}

export function isSpaceChr(
  chrCodePoint: number
): chrCodePoint is CharacterCodes.space {
  return chrCodePoint === CharacterCodes.space
}

export function isTrueToken(characters: string): boolean {
  return TRUE.test(characters)
}

export function isFalseToken(characters: string): boolean {
  return FALSE.test(characters)
}

export function isNullToken(characters: string): boolean {
  return NULL.test(characters)
}
