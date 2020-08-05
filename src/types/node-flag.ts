/* eslint-disable no-magic-numbers */
/* eslint-disable no-bitwise */
export const enum NodeFlags {
  None = 0,
  ThisNodeHasError = 1 << 16, // If the parser encountered an error when parsing the code that created this node
  ThisNodeOrAnySubNodesHasError = 1 << 18, // If this node or any of its children had an error
}
