/* eslint-disable no-magic-numbers */
/* eslint-disable sonarjs/no-duplicate-string */
import {
  iRightSquareBracketChr,
  isCarriageReturnChr,
  isCarriageReturnToken,
  isCharacterTabulationChr,
  isCharacterTabulationToken,
  isColonChr,
  isColonToken,
  isCommaChr,
  isCommaToken,
  isFalseToken,
  isLeftCurlyBracketChr,
  isLeftCurlyBracketToken,
  isLeftSquareBracketChr,
  isLeftSquareBracketToken,
  isLineFeedChr,
  isLineFeedToken,
  isNullToken,
  isRightCurlyBracketChr,
  isRightCurlyBracketToken,
  isRightSquareBracketToken,
  isSpaceChr,
  isSpaceToken,
  isTrueToken,
} from '../identify'

describe('isLeftSquareBracketToken', () => {
  it('should return `true` for `[`', () => {
    expect.assertions(1)
    expect(isLeftSquareBracketToken('[')).toBe(true)
  })
  it('should return `false` for `]`', () => {
    expect.assertions(1)
    expect(isLeftSquareBracketToken(']')).toBe(false)
  })
  it('should return `false` for `{`', () => {
    expect.assertions(1)
    expect(isLeftSquareBracketToken('{')).toBe(false)
  })
  it('should return `false` for `}`', () => {
    expect.assertions(1)
    expect(isLeftSquareBracketToken('}')).toBe(false)
  })
})

describe('isLeftSquareBracketChr', () => {
  it('should return `true` for left square bracket `[`, unicode position `0x5B` = `91`', () => {
    expect.assertions(1)
    const leftSquareBracketChrCodePoint = `[`.codePointAt(0) || 0
    expect(isLeftSquareBracketChr(leftSquareBracketChrCodePoint)).toBe(true)
  })
})

describe('isRightSquareBracketToken', () => {
  it('should return `true` for `]`', () => {
    expect.assertions(1)
    expect(isRightSquareBracketToken(']')).toBe(true)
  })
  it('should return `false` for `[`', () => {
    expect.assertions(1)
    expect(isRightSquareBracketToken('[')).toBe(false)
  })
  it('should return `false` for `{`', () => {
    expect.assertions(1)
    expect(isRightSquareBracketToken('{')).toBe(false)
  })
  it('should return `false` for `}`', () => {
    expect.assertions(1)
    expect(isRightSquareBracketToken('}')).toBe(false)
  })
})

describe('iRightSquareBracketChr', () => {
  it('should return `true` for left square bracket `]`, unicode position `0x5D` = `93`', () => {
    expect.assertions(1)
    const rightSquareBracketChrCodePoint = `]`.codePointAt(0) || 0
    expect(iRightSquareBracketChr(rightSquareBracketChrCodePoint)).toBe(true)
  })
})

describe('isLeftCurlyBracketToken', () => {
  it('should return `true` for `{`', () => {
    expect.assertions(1)
    expect(isLeftCurlyBracketToken('{')).toBe(true)
  })
  it('should return `false` for `}`', () => {
    expect.assertions(1)
    expect(isLeftCurlyBracketToken('}')).toBe(false)
  })
  it('should return `false` for `[`', () => {
    expect.assertions(1)
    expect(isLeftCurlyBracketToken('[')).toBe(false)
  })
  it('should return `false` for `]`', () => {
    expect.assertions(1)
    expect(isLeftCurlyBracketToken(']')).toBe(false)
  })
})

describe('isLeftCurlyBracketChr', () => {
  it('should return `true` for left curly bracket `{`, unicode position `0x7B` = `123`', () => {
    expect.assertions(1)
    const leftCurlyBracketChrCodePoint = `{`.codePointAt(0) || 0
    expect(isLeftCurlyBracketChr(leftCurlyBracketChrCodePoint)).toBe(true)
  })
})

describe('isRightCurlyBracketToken', () => {
  it('should return `true` for `}`', () => {
    expect.assertions(1)
    expect(isRightCurlyBracketToken('}')).toBe(true)
  })
  it('should return `false` for `{`', () => {
    expect.assertions(1)
    expect(isRightCurlyBracketToken('{')).toBe(false)
  })
  it('should return `false` for `]`', () => {
    expect.assertions(1)
    expect(isRightCurlyBracketToken(']')).toBe(false)
  })
  it('should return `false` for `[`', () => {
    expect.assertions(1)
    expect(isRightCurlyBracketToken('[')).toBe(false)
  })
})

describe('isRightCurlyBracketChr', () => {
  it('should return `true` for right curly bracket `}`, unicode position `0x7D` = `125`', () => {
    expect.assertions(1)
    const rightCurlyBracketChrCodePoint = `}`.codePointAt(0) || 0
    expect(isRightCurlyBracketChr(rightCurlyBracketChrCodePoint)).toBe(true)
  })
})

describe('isColonToken', () => {
  it('should return `true` for `:`', () => {
    expect.assertions(1)
    expect(isColonToken(':')).toBe(true)
  })
  it('should return `false` for `;`', () => {
    expect.assertions(1)
    expect(isColonToken(';')).toBe(false)
  })
  it('should return `false` for `.`', () => {
    expect.assertions(1)
    expect(isColonToken('.')).toBe(false)
  })
  it('should return `false` for `,`', () => {
    expect.assertions(1)
    expect(isColonToken(',')).toBe(false)
  })
})

describe('isColonChr', () => {
  it('should return `true` for colon `:`, unicode position `0x3A` = `58`', () => {
    expect.assertions(1)
    const colonUnicodePoint = `:`.codePointAt(0) || 0
    expect(isColonChr(colonUnicodePoint)).toBe(true)
  })
})

describe('isCommaToken', () => {
  it('should return `true` for `,`', () => {
    expect.assertions(1)
    expect(isCommaToken(',')).toBe(true)
  })

  it('should return `false` for `.`', () => {
    expect.assertions(1)
    expect(isCommaToken('.')).toBe(false)
  })

  it('should return `false` for `:`', () => {
    expect.assertions(1)
    expect(isCommaToken(':')).toBe(false)
  })

  it('should return `false` for `;`', () => {
    expect.assertions(1)
    expect(isCommaToken(';')).toBe(false)
  })
})

describe('isCommaChr', () => {
  it('should return `true` for comma `,`, unicode position `0x2C` = `44`', () => {
    expect.assertions(1)
    const commaUnicodePoint = `,`.codePointAt(0) || 0
    expect(isCommaChr(commaUnicodePoint)).toBe(true)
  })
})

describe('isCharacterTabulationToken', () => {
  it('should return `true` for character tabulation `\\t`', () => {
    expect.assertions(1)
    expect(isCharacterTabulationToken('\t')).toBe(true)
  })

  it('should return `false` for line feed `\\n`', () => {
    expect.assertions(1)
    expect(isCharacterTabulationToken('\n')).toBe(false)
  })

  it('should return `false` for carriage return `\\r`', () => {
    expect.assertions(1)
    expect(isCharacterTabulationToken('\r')).toBe(false)
  })

  it('should return `false` for space `\\s`', () => {
    expect.assertions(1)
    expect(isCharacterTabulationToken(' ')).toBe(false)
  })
})

describe('isCharacterTabulationChr', () => {
  it('should return `true` for tabulation `\\t`, unicode position `0x09` = `9`', () => {
    expect.assertions(1)
    const tabulationUnicodePoint = `\t`.codePointAt(0) || 0
    expect(isCharacterTabulationChr(tabulationUnicodePoint)).toBe(true)
  })
})

describe('isLineFeedToken', () => {
  it('should return `true` for line feed `\\n`', () => {
    expect.assertions(1)
    expect(isLineFeedToken('\n')).toBe(true)
  })

  it('should return `false` for character tabulation `\\t`', () => {
    expect.assertions(1)
    expect(isLineFeedToken('\t')).toBe(false)
  })

  it('should return `false` for carriage return `\\r`', () => {
    expect.assertions(1)
    expect(isLineFeedToken('\r')).toBe(false)
  })

  it('should return `false` for space `\\s`', () => {
    expect.assertions(1)
    expect(isLineFeedToken(' ')).toBe(false)
  })
})

describe('isLineFeedChr', () => {
  it('should return `true` for line feed `\\n`, unicode position `0x0A` = `10`', () => {
    expect.assertions(1)
    const lineFeedUnicodePoint = `\n`.codePointAt(0) || 0
    expect(isLineFeedChr(lineFeedUnicodePoint)).toBe(true)
  })
})

describe('isCarriageReturnToken', () => {
  it('should return `true` for carriage return `\\r`', () => {
    expect.assertions(1)
    expect(isCarriageReturnToken('\r')).toBe(true)
  })

  it('should return `false` for line feed `\\n`', () => {
    expect.assertions(1)
    expect(isCarriageReturnToken('\n')).toBe(false)
  })

  it('should return `false` for character tabulation `\\t`', () => {
    expect.assertions(1)
    expect(isCarriageReturnToken('\t')).toBe(false)
  })

  it('should return `false` for space `\\s`', () => {
    expect.assertions(1)
    expect(isCarriageReturnToken(' ')).toBe(false)
  })
})

describe('isCarriageReturnChr', () => {
  it('should return `true` for carriage return `\\r`', () => {
    expect.assertions(1)
    const carriageReturnUnicodePoint = `\r`.codePointAt(0) || 0
    expect(isCarriageReturnChr(carriageReturnUnicodePoint)).toBe(true)
  })
})

describe('isSpaceToken', () => {
  it('should return `true` for space `\\s`', () => {
    expect.assertions(1)
    expect(isSpaceToken(' ')).toBe(true)
  })
  it('should return `false` for carriage return `\\r`', () => {
    expect.assertions(1)
    expect(isSpaceToken('\r')).toBe(false)
  })

  it('should return `false` for line feed `\\n`', () => {
    expect.assertions(1)
    expect(isSpaceToken('\n')).toBe(false)
  })

  it('should return `false` for character tabulation `\\t`', () => {
    expect.assertions(1)
    expect(isSpaceToken('\t')).toBe(false)
  })
})

describe('isSpaceChr', () => {
  it('should return `true` for space ` `, unicode position `0x0020` = `32`', () => {
    expect.assertions(1)
    const spaceChrCodePoint = ` `.codePointAt(0) || 0
    expect(isSpaceChr(spaceChrCodePoint)).toBe(true)
  })
})

describe('isTrueToken', () => {
  it('should return boolean `true` for "true"', () => {
    expect.assertions(1)
    expect(isTrueToken('true')).toBe(true)
  })
  it('should return boolean `false` for "TRUE"', () => {
    expect.assertions(1)
    expect(isTrueToken('TRUE')).toBe(false)
  })

  it('should return boolean `false` for "FALSE"', () => {
    expect.assertions(1)
    expect(isTrueToken('FALSE')).toBe(false)
  })
})

describe('isFalseToken', () => {
  it('should return boolean `true` for "false"', () => {
    expect.assertions(1)
    expect(isFalseToken('false')).toBe(true)
  })
  it('should return boolean `false` for "FALSE"', () => {
    expect.assertions(1)
    expect(isFalseToken('FALSE')).toBe(false)
  })

  it('should return boolean `false` for "TRUE"', () => {
    expect.assertions(1)
    expect(isFalseToken('TRUE')).toBe(false)
  })
})

describe('isNullToken', () => {
  it('should return `true` for "null"', () => {
    expect.assertions(1)
    expect(isNullToken('null')).toBe(true)
  })
  it('should return `false` for "NULL"', () => {
    expect.assertions(1)
    expect(isNullToken('NULL')).toBe(false)
  })

  it('should return `false` for "UNDEFINED"', () => {
    expect.assertions(1)
    expect(isNullToken('UNDEFINED')).toBe(false)
  })
})
