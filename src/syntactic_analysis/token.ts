/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NodeFlags, SyntaxKind } from 'types'
import { Node, Token } from 'types/ast'

export class TokenImpl<TKind extends SyntaxKind> implements Token<TKind> {
  public end: number

  public flags: NodeFlags

  public id?: number

  public kind: TKind

  public original?: Node

  public parent: Node

  public pos: number

  public constructor(kind: TKind, pos: number, end: number) {
    this.pos = pos
    this.end = end
    this.kind = kind
    this.id = 0
    this.flags = NodeFlags.None
    // this.transformFlags = TransformFlags.None
    this.parent = undefined!
  }
}
