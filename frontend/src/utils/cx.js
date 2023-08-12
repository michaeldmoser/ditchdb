/**
 * Easily combine CSS classes conditionally on an element.
 *
 * Any arrays included in the list will be flattened. Each item in the list will be evaluated and only the items that are strings and evaluate to a truthy value will be included.
 *
 * Example:
 *   const hasError = false, isEnabled = true, isTitle = true;
 *
 *   cx('base', undefined, ['tw-outline-none', 'tw-drop-shadow'],
 *     hasError && 'bg-warning',
 *     isEnabled && 'show',
 *     isTitle ? 'tw-font-bold' : 'tw-font-normal'
 *   )
 *
 * Produces: 'base tw-outline-none tw-drop-shadow show tw-fond-bold'
 *
 * @param  {...any} args A list containing arrays, falsey, and string values.
 * @returns {string}
 */
export const cx = (...classNames) =>
  classNames
    .flat()
    .filter((className) => !!className && typeof className === "string")
    .join(" ");

export default cx;
