import { JSONText, JSONValue } from 'types'

/* eslint-disable no-magic-numbers */
export const JSONtoStringify: JSONValue = {
  JSONValueGrammar: {
    literalNameTokens: [true, false, null],
    structuralTokens: ['[', '{', ']', '}', ':', ','],
  },
  JSONValues: {
    arrays: [null, true, false, 'string', 1e-100, {}, []],
    false: false,
    null: null,
    numbers: [+100, -100, +0.001, -0.0001, +1e100, -1e-100],
    objects: {
      array: [],
      false: false,
      null: null,
      number: 1e-100,
      object: {},
      string: 'string',
      true: true,
    },
    strings: {
      'escape backspace': '\b',
      'escape carriage return': '\r',
      'escape character tabulation': '\t',
      'escape form feed': '\f',
      'escape hexadecimal digits': '\u0000',
      'escape line feed': '\n',
      'escape quotation mark': '"',
      'escape reverse solidus': '\\',
      'escape solidus': '/',
      string: 'string',
    },
    true: true,
  },
  arrayLiteral: [null, true, false, 'string', 1e-100, {}, []],
}

export const text: JSONText = JSON.stringify(JSONtoStringify, null, 2)
