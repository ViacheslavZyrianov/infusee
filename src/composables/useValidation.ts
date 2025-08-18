/**
 * Possible input values for Vuetify form fields.
 */
export type Value = string | number | null | undefined

/**
 * A validation rule function for Vuetify.
 * @param value - The value to validate.
 * @returns `true` if valid, otherwise an error message string.
 */
export type ValidationRule = (value: Value) => true | string

/**
 * Provides reusable validation rules for forms.
 */
export default () => {
  /**
   * Creates a required field validation rule.
   * @param message - Custom error message (default: 'Required').
   * @returns A ValidationRule function.
   */
  const required = (message = 'Required'): ValidationRule =>
    (value: Value) => (value !== null && value !== undefined && value !== '') || message

  /**
   * Creates a number range validation rule.
   * @param min - Minimum allowed value.
   * @param max - Maximum allowed value.
   * @param message - Custom error message.
   * @returns A ValidationRule function.
   */
  const numberRange = (min: number, max: number, message?: string): ValidationRule =>
    (value: Value) =>
      typeof value !== 'number'
        ? true
        : (value >= min && value <= max) || message || `Value must be between ${min} and ${max}`

  /**
   * Creates a minimum length validation rule for strings.
   * @param len - Minimum length required.
   * @param message - Custom error message.
   * @returns A ValidationRule function.
   */
  const minLength = (len: number, message?: string): ValidationRule =>
    (value: Value) =>
      typeof value !== 'string'
        ? true
        : value.length >= len || message || `Minimum length is ${len}`

  /**
   * Creates a maximum length validation rule for strings.
   * @param len - Maximum length allowed.
   * @param message - Custom error message.
   * @returns A ValidationRule function.
   */
  const maxLength = (len: number, message?: string): ValidationRule =>
    (value: Value) =>
      typeof value !== 'string'
        ? true
        : value.length <= len || message || `Maximum length is ${len}`

  /**
   * Creates a regex match validation rule for strings.
   * @param pattern - Regular expression to match.
   * @param message - Custom error message.
   * @returns A ValidationRule function.
   */
  const regexMatch = (pattern: RegExp, message?: string): ValidationRule =>
    (value: Value) =>
      typeof value !== 'string'
        ? true
        : pattern.test(value) || message || `Value does not match required format`

  /**
   * Combines multiple validation rules into an array (for Vuetify's rules prop).
   * @param rules - One or more ValidationRule functions.
   * @returns Array of ValidationRule.
   */
  const composeRules = (...rules: ValidationRule[]): ValidationRule[] => rules

  return {
    required,
    numberRange,
    minLength,
    maxLength,
    regexMatch,
    composeRules,
  }
}
