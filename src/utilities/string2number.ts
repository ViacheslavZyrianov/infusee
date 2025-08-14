/**
 * Converts a string to a number, supporting both dot and comma as decimal separators.
 * Returns 0 if the string is not a valid number.
 * Drops the `.0` if the number is an integer.
 *
 * @param val - The string to convert (e.g., "21.1", "21,1", "21.0", "abc")
 * @returns The parsed number. Examples:
 *          "21,1" → 21.1
 *          "21.1" → 21.1
 *          "21.0" → 21
 *          "abc" → 0
 */
export default (val: string): number =>
  isNaN(parseFloat(val?.replace(',', '.') ?? '')) ? 0 : parseFloat(val.replace(',', '.'))
