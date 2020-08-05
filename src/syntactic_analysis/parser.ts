/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrefixUnaryExpression } from 'typescript'

import {
  DiagnosticWithLocation,
  createFileDiagnostic,
} from '../utils/create-file-diagnostic'

import { Lexer } from 'index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { IdentifierImpl } from 'syntactic_analysis/identifier'
import { NodeImpl } from 'syntactic_analysis/node'
import { SourceFileImp } from 'syntactic_analysis/source-file'
import { TokenImpl } from 'syntactic_analysis/token'
import { Node, NodeFlags, SourceFile, SyntaxKind, TokenFlags } from 'types'
import {
  ArrayLiteralExpression,
  BooleanLiteral,
  EndOfFileToken,
  Expression,
  JsonMinusNumericLiteral,
  JsonObjectExpressionStatement,
  LiteralExpression,
  LiteralLikeNode,
  MutableNodeArray,
  NodeArray,
  NullLiteral,
  NumericLiteral,
  StringLiteral,
  Token,
} from 'types/ast'
import { tokenToString } from 'utils/maps'
import { isNodeKind } from 'utils/utilities'

const enum ParsingContext {
  SourceElements, // Elements in source file
  ObjectLiteralMembers, // Members in object literal
  ArrayLiteralMembers, // Members in array literal
  Count, // Number of parsing contexts
}

export class Parser {
  private currentToken: SyntaxKind

  private identifierCount!: number

  private identifiers!: Map<any, any>

  private readonly lexer: Lexer

  private nodeCount!: number

  private parseDiagnostics!: DiagnosticWithLocation[]

  private parseErrorBeforeNextFinishedNode!: boolean

  private parsingContext!: ParsingContext

  private privateIdentifiers!: Map<any, any>

  private sourceFile!: SourceFile

  private sourceText!: string

  private syntaxCursor!: undefined

  public constructor() {
    this.lexer = new LexerImpl({ skipTrivia: true })
    this.currentToken = SyntaxKind.Unknown
    this.initializeState('')
  }

  public createNodeArray<T extends Node>(
    elements: T[],
    pos: number,
    end?: number
  ): NodeArray<T> {
    const array = elements as MutableNodeArray<T>
    array.pos = pos
    array.end = end === undefined ? this.lexer.getStartPos() : end
    return array
  }

  public createSourceFile(fileName: string): SourceFile {
    const sourceFile = new SourceFileImp(0, this.sourceText.length)
    sourceFile.text = this.sourceText
    sourceFile.fileName = fileName

    this.nodeCount += 1
    return sourceFile
  }

  public getNodePos(): number {
    return this.lexer.getStartPos()
  }

  public getSourceText(): string {
    return this.sourceText
  }

  public nextToken(): SyntaxKind {
    this.currentToken = this.lexer.scan()
    return this.currentToken
  }

  public parse(fileName: string, sourceText: string): SourceFile {
    this.initializeState(sourceText)
    this.sourceFile = this.createSourceFile(fileName)

    // Prime the scanner.
    this.nextToken()
    const pos = this.getNodePos()
    if (this.token() === SyntaxKind.EndOfFileToken) {
      this.sourceFile.statements = this.createNodeArray([], pos, pos)
      this.sourceFile.endOfFileToken = this.parseTokenNode<EndOfFileToken>()
    } else {
      const statement = this.createNode(
        SyntaxKind.ExpressionStatement
      ) as JsonObjectExpressionStatement

      switch (this.token()) {
        case SyntaxKind.RightSquareBracketToken:
          statement.expression = this.parseArrayLiteralExpression()
          break
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.NullKeyword:
          statement.expression = this.parseTokenNode<
            BooleanLiteral | NullLiteral
          >()
          break
        case SyntaxKind.MinusToke:
          if (
            this.lookAhead(
              () =>
                this.nextToken() === SyntaxKind.NumericLiteral &&
                this.nextToken() !== SyntaxKind.ColonToken
            )
          ) {
            statement.expression = this.parsePrefixUnaryExpression() as JsonMinusNumericLiteral
          } else {
            statement.expression = this.parseObjectLiteralExpression()
          }
          break
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
          if (
            this.lookAhead(() => this.nextToken() !== SyntaxKind.ColonToken)
          ) {
            statement.expression = this.parseLiteralNode() as
              | StringLiteral
              | NumericLiteral
            break
          }
        // falls through

        default:
          statement.expression = this.parseObjectLiteralExpression() // TODO: implement this
          break
      }
      this.finishNode(statement)
      this.sourceFile.statements = this.createNodeArray([statement], pos)
      this.sourceFile.endOfFileToken = this.parseExpectedToken(
        SyntaxKind.EndOfFileToken,
        'Unexpected_token'
      )
    }
    this.sourceFile.nodeCount = this.nodeCount
    this.sourceFile.identifierCount = this.identifierCount
    this.sourceFile.identifiers = this.identifiers
    this.sourceFile.parseDiagnostics = this.parseDiagnostics

    const result = this.sourceFile
    this.clearState()
    return result
  }

  public scanError(message: string, length: number): void {
    this.parseErrorAtPosition(this.lexer.getTextPos(), length, message)
  }

  public token(): SyntaxKind {
    return this.currentToken
  }

  private clearState(): void {
    throw new Error('Method not implemented.')
  }

  private createNode(kind: SyntaxKind, pos?: number): Node {
    this.nodeCount += 1
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const p = pos! >= 0 ? pos! : this.lexer.getStartPos()
    if (isNodeKind(kind) || kind === SyntaxKind.Unknown) {
      return new NodeImpl(kind, p, p)
    }
    if (kind === SyntaxKind.Identifier) {
      return new IdentifierImpl(kind, p, p)
    }
    return new TokenImpl(kind, p, p)
  }

  private currentNode(parsingContext: ParsingContext): undefined {
    return undefined
  }

  private finishNode<T extends Node>(node: T, end?: number): T {
    // eslint-disable-next-line no-param-reassign
    node.end = end === undefined ? this.lexer.getStartPos() : end

    // Keep track on the node if we encountered an error while parsing it.  If we did, then
    // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
    // flag so that we don't mark any subsequent nodes.
    if (this.parseErrorBeforeNextFinishedNode) {
      this.parseErrorBeforeNextFinishedNode = false
      // eslint-disable-next-line no-param-reassign
      node.flags |= NodeFlags.ThisNodeHasError
    }
    return node
  }

  private initializeState(sourceText: string): void {
    this.sourceText = sourceText
    this.syntaxCursor = undefined
    this.parseDiagnostics = []
    this.parsingContext = 0
    this.identifiers = new Map()
    this.privateIdentifiers = new Map()
    this.identifierCount = 0
    this.nodeCount = 0
    // contextFlags = NodeFlags.JsonFile
    this.parseErrorBeforeNextFinishedNode = false

    // Initialize and prime the scanner before parsing the source elements.
    this.lexer.setText(this.sourceText)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.lexer.setOnError(this.scanError)
  }

  private isIdentifier(): boolean {
    if (this.token() === SyntaxKind.Identifier) {
      return true
    }
    return this.token() > SyntaxKind.LastKeyword
  }

  // True if positioned at the start of a list element
  private isListElement(parsingContext: ParsingContext): boolean {
    switch (parsingContext) {
      case ParsingContext.SourceElements:
        // case ParsingContext.BlockStatements:
        // If we're in error recovery, then we don't want to treat ';' as an empty statement.
        // The problem is that ';' can show up in far too many contexts, and if we see one
        // and assume it's a statement, then we may bail out inappropriately from whatever
        // we're parsing.  For example, if we have a semicolon in the middle of a class, then
        // we really don't want to assume the class is over and we're on a statement in the
        // outer module.  We just want to consume and move on.

        return this.isStartOfStatement()
        break

      case ParsingContext.ObjectLiteralMembers:
        if (this.token() === SyntaxKind.LeftCurlyBracketToken) {
          return true
        }
        return this.isLiteralPropertyName()

      case ParsingContext.ArrayLiteralMembers:
        if (this.token() === SyntaxKind.CommaToken) {
          return true
        }
      // falls through

      default:
        throw new Error("Non-exhaustive case in 'isListElement'.")
    }
  }

  private isListTerminator(kind: ParsingContext): boolean {
    if (this.token() === SyntaxKind.EndOfFileToken) {
      // Being at the end of the file ends all lists.
      return true
    }
    switch (kind) {
      case ParsingContext.ObjectLiteralMembers:
        return this.token() === SyntaxKind.RightCurlyBracketToken
      case ParsingContext.ArrayLiteralMembers:
        return this.token() === SyntaxKind.RightSquareBracketToken
      default:
        return false
    }
  }

  private isLiteralPropertyName(): boolean {
    return (
      LexerImpl.tokenIsIdentifierOrKeyword(this.token()) ||
      this.token() === SyntaxKind.StringLiteral ||
      this.token() === SyntaxKind.NumericLiteral
    )
  }

  private isStartOfExpression(): boolean {
    if (this.isStartOfLeftHandSideExpression()) {
      return true
    }
    if (this.token() === SyntaxKind.MinusToken) {
      return true
    }
    return this.isIdentifier()
  }

  private isStartOfLeftHandSideExpression(): boolean {
    switch (this.token()) {
      case SyntaxKind.NullKeyword:
      case SyntaxKind.TrueKeyword:
      case SyntaxKind.FalseKeyword:
      case SyntaxKind.NumericLiteral:
      case SyntaxKind.StringLiteral:
      case SyntaxKind.LeftCurlyBracketToken:
      case SyntaxKind.LeftSquareBracketToken:
      case SyntaxKind.Identifier:
        return true
      default:
        return this.isIdentifier()
    }
  }

  private isStartOfStatement(): boolean {
    if (this.token() === SyntaxKind.LeftCurlyBracketToken) {
      return true
    }
    return this.isStartOfExpression()
  }

  /**
   * Invokes the provided callback then unconditionally restores the parser to the state it was in
   * immediately prior to invoking the callback.
   * The result of invoking the callback is returned from this function.
   *
   * @private
   * @template T
   * @param {() => T} callback
   * @returns {T}
   * @memberof Parser
   */
  private lookAhead<T>(callback: () => T): T {
    throw new Error('Method not implemented.')
    // return this.speculationHelper(callback, /*isLookAhead*/ true);
  }

  private parseArgumentOrArrayLiteralElement(): Expression {
    if (this.token() === SyntaxKind.CommaToken) {
      return this.createNode(SyntaxKind.OmittedExpression) as Expression
    }

    return this.parseAssignmentExpressionOrHigher() // FIXME: implement this maybe?
  }

  private parseArrayLiteralExpression(): ArrayLiteralExpression {
    const node = this.createNode(
      SyntaxKind.ArrayLiteralExpression
    ) as ArrayLiteralExpression

    this.parseExpected(SyntaxKind.LeftSquareBracketToken)

    if (this.lexer.hasPrecedingLineBreak()) {
      node.multiLine = true
    }

    node.elements = this.parseDelimitedList(
      ParsingContext.ArrayLiteralMembers,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.parseArgumentOrArrayLiteralElement
    )

    this.parseExpected(SyntaxKind.RightSquareBracketToken)

    return this.finishNode(node)
  }

  private parseAssignmentExpressionOrHigher(): Expression {
    throw new Error('Method not implemented.')
  }

  private parseDelimitedList<T extends Node>(
    kind: ParsingContext,
    parseElement: () => T
  ): NodeArray<T> {
    const saveParsingContext = this.parsingContext
    this.parsingContext |= 1 << kind
    const list = []
    const listPos = this.getNodePos()
    let commaStart = -1 // Meaning the previous token was not a comma

    while (true) {
      if (this.isListElement(kind)) {
        list.push(this.parseListElement(kind, parseElement))
        commaStart = this.lexer.getStartPos()
        // something
        commaStart = -1 // Back to the state where the last token was not a comma
        if (this.isListTerminator(kind)) {
          break
        }

        // We didn't get a comma, and the list wasn't terminated, explicitly parse
        // out a comma so we give a good error message.
        this.parseExpected(SyntaxKind.CommaToken)
        continue
      }

      if (this.isListTerminator(kind)) {
        break
      }
    }

    this.parsingContext = saveParsingContext
    const result = this.createNodeArray(list, listPos)
    // Recording the trailing comma is deliberately done after the previous
    // loop, and not just if we see a list terminator. This is because the list
    // may have ended incorrectly, but it is still important to know if there
    // was a trailing comma.
    // Check if the last token was a comma.
    if (commaStart >= 0) {
      // Always preserve a trailing comma by marking it on the NodeArray
      result.hasTrailingComma = true
    }
    return result
  }

  private parseErrorAt(start: number, end: number, message: string): void {
    this.parseErrorAtPosition(start, end - start, message)
    throw new Error('Method not implemented.')
  }

  private parseErrorAtCurrentToken(message: string): void {
    this.parseErrorAt(
      this.lexer.getTokenPos(),
      this.lexer.getTextPos(),
      message
    )
  }

  private parseErrorAtPosition(
    start: number,
    length: number,
    message: string
  ): void {
    const lastError: DiagnosticWithLocation | undefined =
      this.parseDiagnostics.length === 0
        ? undefined
        : this.parseDiagnostics[this.parseDiagnostics.length - 1]

    if (!lastError || start !== lastError.start) {
      this.parseDiagnostics.push(
        createFileDiagnostic(this.sourceFile, start, length, message)
      )
    }

    // Mark that we've encountered an error.  We'll set an appropriate bit on the next
    // node we finish so that it can't be reused incrementally.
    this.parseErrorBeforeNextFinishedNode = true
  }

  private parseExpected(
    kind: SyntaxKind,
    diagnosticMessage?: string,
    shouldAdvance = true
  ): boolean {
    if (this.token() === kind) {
      if (shouldAdvance) {
        this.nextToken()
      }
      return true
    }
    // Report specific message if provided with one.  Otherwise, report generic fallback message.
    if (diagnosticMessage) {
      this.parseErrorAtCurrentToken(diagnosticMessage)
    } else {
      this.parseErrorAtCurrentToken(`expected ${tokenToString(kind)}`)
    }
    return false
  }

  private parseExpectedToken<TKind extends SyntaxKind>(
    t: TKind,
    diagnosticMessage?: string
  ): Token<TKind> {
    throw new Error('Method not implemented.')
  }

  private parseListElement<T extends Node>(
    parsingContext: ParsingContext,
    parseElement: () => T
  ): T {
    // const node = this.currentNode(parsingContext)
    // if (node) {
    //   return this.consumeNode(node) as T
    // }

    return parseElement()
  }

  private parseLiteralLikeNode(kind: SyntaxKind): LiteralLikeNode {
    const node = this.createNode(kind) as LiteralLikeNode

    node.text = this.lexer.getTokenValue()

    if (this.lexer.isUnterminated()) {
      node.isUnterminated = true
    }

    if (node.kind === SyntaxKind.NumericLiteral) {
      ;(node as NumericLiteral).numericLiteralFlags =
        this.lexer.getTokenFlags() & TokenFlags.NumericLiteralFlags
    }

    this.nextToken()
    this.finishNode(node)
    return node
  }

  private parseLiteralNode(): LiteralExpression {
    return this.parseLiteralLikeNode(this.token()) as LiteralExpression
  }

  private parseObjectLiteralExpression(): any {
    throw new Error('Method not implemented.')
  }

  private parsePrefixUnaryExpression(): PrefixUnaryExpression {
    const node = this.createNode(
      SyntaxKind.PrefixUnaryExpression
    ) as PrefixUnaryExpression
    throw new Error('Method not implemented.')
  }

  private parseTokenNode<T extends Node>(): T {
    const node = this.createNode(this.token()) as T
    this.nextToken()
    return this.finishNode(node)
  }
}
