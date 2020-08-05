/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { NodeFlags, SyntaxKind } from 'types'
import { Identifier } from 'types/ast'

export class IdentifierImpl implements Identifier {
  public _declarationBrand!: any

  public _expressionBrand!: any

  public end: number

  public flags: NodeFlags

  public escapedText!: string

  public id: number

  public kind: SyntaxKind.Identifier

  public original: undefined

  public parent: never

  public pos: number

  public constructor(kind: SyntaxKind.Identifier, pos: number, end: number) {
    this.pos = pos
    this.end = end
    this.kind = kind
    this.id = 0
    this.flags = NodeFlags.None
    // this.transformFlags = TransformFlags.None
    this.parent = undefined!
    this.original = undefined
    // this.flowNode = undefined
  }
}
