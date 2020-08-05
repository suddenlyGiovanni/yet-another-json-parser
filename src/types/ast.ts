/* eslint-disable @typescript-eslint/member-ordering */
/*
 * # AST
 *
 * ## Node
 * Node is the of the Abstract Syntax Tree (AST).
 * In general a Node represents non-terminals in the language grammar; however, some terminals are
 * kept in the tree such as identifiers and literals.
 * Two key things make up an AST node's documentation. The node's SyntaxKind which identifies its
 * type within the AST, and its interface, the API the node provides when instantiated into the AST.
 * Distinctive API:
 * * `TextRange`: members that identify the node's start and end in the source file.
 * * `parent?`: Node the parent of the node in the AST.
 *
 * ## SourceFile
 * SourceFile is a top-level AST node that is contained in the `Program`.
 * Distinctive API
 * * SyntaxKind.SourceFile
 * * interface SourceFile
 */

import { PrefixUnaryOperator, UnaryExpression } from 'typescript'

import { NodeFlags, SyntaxKind, TokenFlags } from 'types'

/**
 * Identify the node's start and end in the source file
 *
 * @interface TextRange
 */
export interface TextRange {
  end: number
  pos: number
}

export interface Node extends TextRange {
  kind: SyntaxKind

  flags: NodeFlags

  /**
   * @type {ModifierFlags}
   * @memberof Node
   * @internal
   */
  // modifierFlagsCache: ModifierFlags

  /**
   * Flags for transforms, possibly undefined
   *
   * @type {TransformFlags}
   * @memberof Node
   * @internal
   */
  // transformFlags: TransformFlags

  /**
   * Array of decorators (in document order)
   *
   * @type {NodeArray<Decorator>}
   * @memberof Node
   */
  // decorators?: NodeArray<Decorator>

  /**
   * Array of modifiers
   *
   * @type {ModifiersArray}
   * @memberof Node
   */
  // modifiers?: ModifiersArray

  /**
   * Unique id (used to look up NodeLinks)
   *
   * @type {number}
   * @memberof Node
   * @internal
   */
  id?: number

  /**
   * Parent node (initialized by binding)
   *
   * @type {Node}
   * @memberof Node
   */
  parent: Node

  /**
   * The original node if this is an updated node.
   *
   * @type {Node}
   * @memberof Node
   * @internal
   */
  original?: Node

  /**
   * Symbol declared by node (initialized by binding)
   *
   * @type {symbol}
   * @memberof Node
   * @internal
   */
  // symbol: symbol

  /**
   * Locals associated with node (initialized by binding)
   *
   * @type {SymbolTable}
   * @memberof Node
   * @internal
   */
  // locals?: SymbolTable

  /**
   * Next container in declaration order (initialized by binding)
   *
   * @type {Node}
   * @memberof Node
   * @internal
   */
  // nextContainer?: Node

  /**
   * Local symbol declared by node (initialized by binding only for exported nodes)
   *
   * @type {symbol}
   * @memberof Node
   * @internal
   */
  // localSymbol?: symbol

  /**
   * Associated FlowNode (initialized by binding)
   *
   * @type {FlowNode}
   * @memberof Node
   * @internal
   */
  // flowNode?: FlowNode

  /**
   * Associated EmitNode (initialized by transforms)
   *
   * @type {EmitNode}
   * @memberof Node
   * @internal
   */
  // emitNode?: EmitNode

  /**
   * Used to temporarily assign a contextual type during overload resolution
   *
   * @type {Type}
   * @memberof Node
   * @internal
   */
  // contextualType?: Type

  /**
   * Inference context for contextual type
   *
   * @type {InferenceContext}
   * @memberof Node
   * @internal
   */
  // inferenceContext?: InferenceContext
}
export interface NodeArray<T extends Node> extends ReadonlyArray<T>, TextRange {
  hasTrailingComma?: boolean
}

export type MutableNodeArray<T extends Node> = NodeArray<T> & T[]
export interface Declaration extends Node {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _declarationBrand: any
}

export interface Statement extends Node {
  _statementBrand: any
}

export interface Expression extends Node {
  _expressionBrand: any
}

export interface ExpressionStatement extends Statement {
  kind: SyntaxKind.ExpressionStatement
  expression: Expression
}

export interface Identifier extends Expression, Declaration {
  kind: SyntaxKind.Identifier
  escapedText: string
}

export interface SourceFile extends Declaration {
  /**
   * @type {SyntaxKind.SourceFile}
   * @memberof SourceFile
   */
  kind: SyntaxKind.SourceFile

  /**
   * @type {NodeArray<Statement>}
   * @memberof SourceFile
   */
  statements: NodeArray<Statement>

  /**
   * @type {Token<SyntaxKind.EndOfFileToken>}
   * @memberof SourceFile
   */
  endOfFileToken: Token<SyntaxKind.EndOfFileToken>

  /**
   * @type {string}
   * @memberof SourceFile
   */
  fileName: string

  /**
   * @type {Path}
   * @memberof SourceFile
   * @internal
   */
  // path: Path

  /**
   * @type {string}
   * @memberof SourceFile
   */
  text: string

  /**
   * Map from a string to an interned string
   *
   * @type {Map<string>}
   * @memberof SourceFile
   * @internal
   */
  // identifiers: Map<string>

  /**
   * @type {number}
   * @memberof SourceFile
   * @internal
   */
  nodeCount: number

  /**
   * @type {number}
   * @memberof SourceFile
   * @internal
   */
  identifierCount: number

  /**
   * @type {number}
   * @memberof SourceFile
   * @internal
   */
  symbolCount: number
}

export interface Token<TKind extends SyntaxKind> extends Node {
  kind: TKind
}

export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken>

export interface BooleanLiteral extends Expression {
  kind: SyntaxKind.TrueKeyword | SyntaxKind.FalseKeyword
}

export interface NullLiteral extends Expression {
  kind: SyntaxKind.NullKeyword
}

export interface JsonObjectExpressionStatement extends ExpressionStatement {
  expression:
    | ArrayLiteralExpression
    | BooleanLiteral
    | NullLiteral
    | JsonMinusNumericLiteral
    | NumericLiteral
    | StringLiteral
  // | ObjectLiteralExpression
}

export interface ArrayLiteralExpression extends Expression {
  kind: SyntaxKind.ArrayLiteralExpression
  elements: NodeArray<Expression>
  /* @internal */
  multiLine?: boolean
}

export interface JsonMinusNumericLiteral extends Expression {
  kind: SyntaxKind.PrefixUnaryExpression
  operator: SyntaxKind.MinusToken
  // operand: NumericLiteral
}

/**
 * The text property of a LiteralExpression stores the interpreted value of the literal in text form.
 * For a StringLiteral, or any literal of a template, this means quotes have been removed and
 * escapes have been converted to actual characters.
 * For a NumericLiteral, the stored value is the toString() representation of the number.
 * For example 1, 1.00, and 1e0 are all stored as just "1".
 *
 * @export
 * @interface LiteralLikeNode
 * @augments {Node}
 */
export interface LiteralLikeNode extends Node {
  text: string
  isUnterminated?: boolean
  hasExtendedUnicodeEscape?: boolean
}

/**
 * The text property of a LiteralExpression stores the interpreted value of the literal in text form.
 * For a StringLiteral, or any literal of a template, this means quotes have been removed and escapes
 * have been converted to actual characters.
 * For a NumericLiteral, the stored value is the toString() representation of the number.
 * For example 1, 1.00, and 1e0 are all stored as just "1".
 *
 * @interface LiteralExpression
 * @augments {LiteralLikeNode}
 * @augments {Expression}
 */
export interface LiteralExpression extends LiteralLikeNode, Expression {
  _literalExpressionBrand: any
}

export interface NumericLiteral extends LiteralExpression, Declaration {
  kind: SyntaxKind.NumericLiteral
  /* @internal */
  numericLiteralFlags: TokenFlags
}

export interface StringLiteral extends LiteralExpression, Declaration {
  kind: SyntaxKind.StringLiteral

  /**
   * Allows a StringLiteral to get its text from another node (used by transforms).
   *
   * @type {(Identifier | StringLiteral | NumericLiteral)}
   * @memberof StringLiteral
   * @internal
   */
  textSourceNode?: Identifier | StringLiteral | NumericLiteral

  /**
   * Note: this is only set when synthesizing a node, not during parsing.
   *
   * @type {boolean}
   * @memberof StringLiteral
   * @internal
   */
  singleQuote?: boolean
}

export interface PrefixUnaryExpression extends Expression {
  kind: SyntaxKind.PrefixUnaryExpression
  operator: PrefixUnaryOperator
  operand: UnaryExpression
}
