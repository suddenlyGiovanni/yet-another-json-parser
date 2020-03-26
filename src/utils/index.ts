/**
 * Type of objects whose values are all of the same type.
 * The `in` and `for-in` operators can *not* be safely used,
 * since `Object.prototype` may be modified by outside code.
 */
export interface MapLike<T> {
  [index: string]: T
}

/** Create a new map from a template object is provided, the map will copy entries from it. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createMapFromTemplate<K extends string | number, T>(
  template: Record<K, T>
): Map<K, T> {
  const map: Map<K, T> = new Map()

  // Copies keys/values from template. Note that for..in will not throw if
  // template is undefined, and instead will just exit the loop.

  // eslint-disable-next-line no-restricted-syntax
  for (const key in template) {
    if (template.hasOwnProperty(key)) {
      map.set(key, template[key])
    }
  }

  return map
}
