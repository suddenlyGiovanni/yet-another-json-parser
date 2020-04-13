# The JSON Data Interchange Syntax

source: [Standard ECMA-404: The JSON Data Interchange Syntax](http://www.ecma-international.org/publications/standards/Ecma-404.htm)

## JSON Text

A JSON text is a **sequence of tokens** formed from **_Unicode_** code points **that conforms to the JSON value grammar**.
The set of tokens includes six structural tokens, strings, numbers, and three literal name tokens

The six **structural tokens**:

| Token | Unicode  |                      |
| :---: | :------: | :------------------- |
|  `[`  | `U+005B` | left square bracket  |
|  `{`  | `U+007B` | left curly bracket   |
|  `]`  | `U+005D` | right square bracket |
|  `}`  | `U+007D` | right curly bracket  |
|  `:`  | `U+003A` | colon                |
|  `,`  | `U+002C` | comma                |

These are the three **literal name tokens**:

|    Token    |               Unicode                |
| :---------: | :----------------------------------: |
| **`true`**  |    `U+0074 U+0072 U+0075 U+0065`     |
| **`false`** | `U+0066 U+0061 U+006C U+0073 U+0065` |
| **`null`**  |    `U+006E U+0075 U+006C U+006C`     |

**Insignificant whitespace** is allowed before or after any token. Whitespace is any sequence of one or more of the following code points:

|                      |      | Unicode  |
| :------------------- | :--: | :------: |
| character tabulation | `\t` | `U+0009` |
| line feed            | `\n` | `U+000A` |
| carriage return      | `\r` | `U+000D` |
| space                | `\s` | `U+0020` |

Whitespace is not allowed within any token, except that space is allowed in strings

## JSON Values

A JSON value can be an object, array, number, string, true, false, or null.
![json values](/media/value.png)

### Numbers

A number is a sequence of decimal digits with no superfluous leading zero.

- It may have a preceding minus sign (`U+002D`).
- It may have a fractional part prefixed by a decimal point (`U+002E`).
- It may have an exponent, prefixed by **e** (`U+0065`) or **E** (`U+0045`) and optionally **+** (`U+002B`) or **-** (`U+002D`). The digits are the code points `U+0030` through `U+0039`.

![json number](/media/number.png)

Numeric values that cannot be represented as sequences of digits (such as Infinity and NaN)
are not permitted.

### String

A string is a sequence of Unicode code points wrapped with quotation marks (`U+0022`).
All code points may be placed within the quotation marks except for the code points
that must be escaped:

- quotation mark (`U+0022`),
- reverse solidus (`U+005C`),
- and the control characters (`U+0000`) to (`U+001F`).
  There are two-character escape sequence representations of some characters.

| escape sequence | representation                                | unicode  |
| :-------------: | --------------------------------------------- | :------: |
|      `\"`       | represents the quotation mark character       | `U+0022` |
|      `\\`       | represents the reverse solidus character      | `U+005C` |
|      `\/`       | represents the solidus character              | `U+002F` |
|      `\b`       | represents the backspace character            | `U+0008` |
|      `\f`       | represents the form feed character            | `U+000C` |
|      `\n`       | represents the line feed character            | `U+000A` |
|      `\r`       | represents the carriage return character      | `U+000D` |
|      `\t`       | represents the character tabulation character | `U+0009` |

So, for example, a string containing only a single reverse solidus character
may be represented as `"\\"`.

Any code point may be represented as a hexadecimal escape sequence. The meaning of such a hexadecimal number is determined by ISO/IEC 10646. If the code point is in the Basic Multilingual Plane (`U+0000` through `U+FFFF`), then it may be represented as a six-character sequence: a reverse solidus, followed by the lowercase letter u, followed by four hexadecimal digits that encode the code point.

Hexadecimal digits can be digits (`U+0030` through `U+0039`) or the hexadecimal letters A through F in uppercase (`U+0041` through `U+0046`) or lowercase (`U+0061` through `U+0066`). So, for example, a string containing only a single reverse solidus character may be represented as `"\u005C"`.

The following four cases all produce the same result:

- `"\u002F"`
- `"\u002f"`
- `"\/"`
- `"/"`

To escape a code point that is not in the Basic Multilingual Plane, the character may be represented as a twelve-character sequence, encoding the UTF-16 surrogate pair corresponding to the code point.
So for example, a string containing only the `G clef` character (`U+1D11E`) may be represented as `"\uD834\uDD1E"`.
However, whether a processor of JSON texts interprets such a surrogate pair as a single code point or as an explicit surrogate pair is a semantic decision that is determined by the specific processor.

Note that the JSON grammar permits code points for which Unicode does not currently provide character assignments.

![string](/media/string.png)

### Objects

An object structure is represented as **a pair of curly bracket** tokens **surrounding zero or more name/value pairs**.
A name is a `string`.
A single colon token (`:`) follows each name, separating the **`name`** from the **`value`**.
A single comma token (`,`) separates a value from a following name.
The JSON syntax does not impose any restrictions on the strings used as names, does not require that name strings be unique, and does not assign any significance to the ordering of name/value pairs.
These are all semantic considerations that may be defined by JSON processors or in specifications defining specific uses of JSON for data interchange.

![object](/media/object.png)

### Arrays

An array structure is **a pair of square bracket** tokens **surrounding zero or more values**.
The **values are separated by commas**.
The JSON syntax does not define any specific meaning to the ordering of the values. However, the JSON array structure is often used in situations where there is some semantics to the ordering.

![array](/media/array.png)
