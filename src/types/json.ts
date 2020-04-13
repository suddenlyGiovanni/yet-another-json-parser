/**
 * A JSON text is a sequence of tokens formed from Unicode code points that conforms to the JSON
 * value grammar. The set of tokens includes six structural tokens, strings, numbers, and three
 * literal name tokens.
 */
export type JSONText<T extends string = string> = T

export interface JSONObject {
  [key: string]: JSONValue
}

export type JSONArray = Array<JSONValue>
export type JSONValue =
  | null
  | true
  | false
  | string
  | number
  | JSONObject
  | JSONArray

/**
 * Insignificant whitespace is allowed before or after any token.
 * Whitespace is any sequence of one or more of the following code points:
 * - character tabulation (U+0009),
 * - line feed (U+000A),
 * - carriage return (U+000D), and
 * - space (U+0020).
 * Whitespace is not allowed within any token, except that space is allowed in strings.
 */
