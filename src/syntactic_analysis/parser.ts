/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle */
import {
  DiagnosticWithLocation,
  createFileDiagnostic,
} from '../utils/create-file-diagnostic'

import { Lexer } from 'index'
import { LexerImpl } from 'lexical-analysis/lexer'
import { SourceFile, SyntaxKind } from 'types'

export class Parser {
  private currentToken: SyntaxKind

  private identifierCount!: number

  private identifiers!: Map<any, any>

  private readonly lexer: Lexer

  private nodeCount!: number

  private parseDiagnostics!: DiagnosticWithLocation[]

  private parseErrorBeforeNextFinishedNode!: boolean

  private parsingContext!: number

  private privateIdentifiers!: Map<any, any>

  private sourceFile!: SourceFile

  private sourceText!: string

  public constructor() {
    this.lexer = new LexerImpl({ skipTrivia: true })
    this.currentToken = SyntaxKind.Unknown
    this.initializeState('')
  }

  public getNodePos(): number {
    return this.lexer.getStartPos()
  }

  public getSourceText(): string {
    return this.sourceText
  }

  public nextToken(): SyntaxKind {
    return this.nextTokenWithoutCheck()
  }

  public parse(fileName: string, sourceText: string): void {}

  public scanError(message: string, length: number): void {
    this.parseErrorAtPosition(this.lexer.getTextPos(), length, message)
  }

  public token(): SyntaxKind {
    return this.currentToken
  }

  private initializeState(sourceText: string): void {
    this.sourceText = sourceText
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

  private nextTokenWithoutCheck(): SyntaxKind {
    this.currentToken = this.lexer.scan()
    return this.currentToken
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
}
