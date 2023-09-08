/**
 * Create a regular expression that matches on a string that contains the given string.
 *
 * This is intended to be used mostly with testing libraries query functions.
 */
export function contains(str: string) {
  return new RegExp(`.*${str}.*`);
}
