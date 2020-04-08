/**
 * Create a new map from a template object is provided, the map will copy entries from it.
 *
 * @param template
 */

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
