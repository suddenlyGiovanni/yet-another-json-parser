import { Node, SourceFile, SyntaxKind } from 'types'

export class SourceFileImp implements SourceFile {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly _declarationBrand: any

  public end: number

  public endOfFileToken: any

  public fileName!: string

  public id?: number | undefined

  public identifierCount!: number

  public kind: SyntaxKind.SourceFile

  public nodeCount!: number

  public original: Node | undefined

  public parent: Node

  public pos: number

  public statements: any

  public symbolCount!: number

  public text!: string

  constructor(pos: number, end: number) {
    this.pos = pos
    this.end = end
    this.kind = SyntaxKind.SourceFile
    this.id = 0
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.parent = undefined!
    this.original = undefined
  }
}
