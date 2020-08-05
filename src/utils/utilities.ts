import { SyntaxKind } from 'types'

export function isNodeKind(kind: SyntaxKind): boolean {
  return kind >= SyntaxKind.FirstNode
}
