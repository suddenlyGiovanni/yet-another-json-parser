/* eslint-disable sonarjs/no-duplicate-string */
import {
  isCarriageReturnToken,
  isCharacterTabulationToken,
  isColonToken,
  isCommaToken,
  isFalseToken,
  isLeftCurlyBracketToken,
  isLeftSquareBracketToken,
  isLineFeedToken,
  isNullToken,
  isRightCurlyBracketToken,
  isRightSquareBracketToken,
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
