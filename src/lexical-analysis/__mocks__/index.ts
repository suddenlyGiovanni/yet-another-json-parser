/* eslint-disable no-useless-escape */
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
    // eslint-disable-next-line prettier/prettier, unicorn/number-literal-case
           numbers: [+100, -100, 0.001, -0.0001, 1e100, 0.1e34, -1e-100],
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
      // eslint-disable-next-line prettier/prettier
             'escape quotation mark': '"',
      'escape reverse solidus': '\\',
      // eslint-disable-next-line prettier/prettier
             'escape solidus': '/',
      string: `this is a plain old 'string'`,
      'hexadecimal escapes control characters': {
        '(U+0000) = NULL': '\u0000',
        '(U+0001) = SHO (Start of Heading)': '\u0001',
        '(U+0002) = STX (Start of Text)': '\u0002',
        '(U+0003) = ETX (End of Text)': '\u0003',
        '(U+0004) = ETO (End of Transmission)': '\u0004',
        '(U+0005) = ENQ (Enquiry)': '\u0005',
        '(U+0006) = ACK (Acknowledge)': '\u0006',
        '(U+0007) = BEL (Bell)': '\u0007',
        '(U+0008) = BS (Backspace)': '\u0008',
        '(U+0009) = HT (Horizontal Tabulation)': '\u0009',
        '(U+000A) = LF (New Line (Nl))': '\u000A',
        '(U+000B) = VT (Vertical Tabulation)': '\u000B',
        '(U+000C) = FF (Form Feed)': '\u000C',
        '(U+000D) = CR (Carriage Return)': '\u000D',
        '(U+000E) = SO (Shift Out)': '\u000E',
        '(U+000F) = SI (Shift In)': '\u000F',
        '(U+001A) = SUB (Substitute)': '\u001A',
        '(U+001B) = ESC (Escape)': '\u001B',
        '(U+001C) = FS (File Separator)': '\u001C',
        '(U+001D) = GS (Group Separator)': '\u001D',
        '(U+001E) = RS (Record Separator)': '\u001E',
        '(U+001F) = US (Unit Separator)': '\u001F',
        '(U+0010) = DLE (Data Link Escape)': '\u0010',
        '(U+0011) = DC1 (Device Control One)': '\u0011',
        '(U+0012) = DC2 (Device Control Two)': '\u0012',
        '(U+0013) = DC3 (Device Control Three)': '\u0013',
        '(U+0014) = DC4 (Device Control Four)': '\u0014',
        '(U+0015) = NAK (Negative Acknowledge)': '\u0015',
        '(U+0016) = SYN (Synchronous Idle)': '\u0016',
        '(U+0017) = ETB (End of Transmission Block)': '\u0017',
        '(U+0018) = CAN (Cancel)': '\u0018',
        '(U+0019) = EM (End of Medium)': '\u0019',
      },
    },
    true: true,
  },
  arrayLiteral: [null, true, false, 'string', 1e-100, {}, []],
}

export const text: JSONText = JSON.stringify(JSONtoStringify, null, 2) // ?
