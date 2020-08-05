/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Node, NodeFlags, SyntaxKind } from 'types'

export class NodeImpl implements Node {
  public end: number

  public flags: NodeFlags

  public id?: number

  public kind: SyntaxKind

  public original?: Node

  public parent: Node

  public pos: number

  public constructor(kind: SyntaxKind, pos: number, end: number) {
    this.pos = pos
    this.end = end
    this.kind = kind
    this.id = 0
    this.flags = NodeFlags.None
    // this.modifierFlagsCache = ModifierFlags.None
    // this.transformFlags = TransformFlags.None
    this.parent = undefined!
    this.original = undefined
  }
}
