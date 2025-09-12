////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import firstCharOnlyToUpper from './impl/first-char-only-to-upper';
import findFirst from './impl/find-first';
import findFirstCamelCaseBoundary from './impl/find-first-camel-case-boundary';

/**
 * A enumeration class that represents naming styles of identifiers.
 *
 * This class is used to convert a string from one naming style to another.
 * This class provides the following naming style constants:
 * - {@link NamingStyle#LOWER_HYPHEN}: XML hyphenated variable naming style,
 *   e.g., `"lower-hyphen"`.
 * - {@link NamingStyle#LOWER_UNDERSCORE}: C++/Python variable naming style,
 *   e.g., `"lower_underscore"`.
 * - {@link NamingStyle#LOWER_CAMEL}: Java variable naming style, e.g.,
 *   `"lowerCamel"`.
 * - {@link NamingStyle#UPPER_CAMEL}: Java and C++ class naming style, e.g.,
 *   `"UpperCamel"`.
 * - {@link NamingStyle#UPPER_UNDERSCORE}: Java and C++ constant naming style,
 *   e.g., `"UPPER_UNDERSCORE"`.
 *
 * Each constant is a {@link NamingStyle} instance. You can use the
 * {@link NamingStyle#to} method to convert a string from one naming style to
 * another.
 *
 * Example usage:
 * ```js
 * const str = 'hello-world';
 * const result = NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_CAMEL, str);
 * expect(result).toBe('helloWorld');
 * ```
 *
 * @author Haixing Hu
 */
class NamingStyle {
  /**
   * XML hyphenated variable naming style, e.g., `"lower-hyphen"`.
   */
  static LOWER_HYPHEN = Object.freeze(new NamingStyle(
    'lower-hyphen',                 // name
    (c) => c === '-',               // wordBoundaryFilter
    '-',                            // wordSeparator
    (w) => w.toLowerCase(),         // wordNormalizer
    undefined,                      // firstWordNormalizer
    (style, str) => {               // quickOptimizer
      if (style === NamingStyle.LOWER_UNDERSCORE) {
        return str.replace(/-/g, '_');
      } else if (style === NamingStyle.UPPER_UNDERSCORE) {
        return str.replace(/-/g, '_').toUpperCase();
      }
      return undefined;
    },
  ));

  /**
   * C++/Python variable naming style, e.g., `"lower_underscore"`.
   */
  static LOWER_UNDERSCORE = Object.freeze(new NamingStyle(
    'lower-underscore',             // name
    (c) => c === '_',               // wordBoundaryFilter
    '_',                            // wordSeparator
    (w) => w.toLowerCase(),         // wordNormalizer
    undefined,                      // firstWordNormalizer
    (style, str) => {               // quickOptimizer
      if (style === NamingStyle.LOWER_HYPHEN) {
        return str.replace(/_/g, '-');
      } else if (style === NamingStyle.UPPER_UNDERSCORE) {
        return str.toUpperCase();
      }
      return undefined;
    },
  ));

  /**
   * Java variable naming style, e.g., `"lowerCamel"`.
   */
  static LOWER_CAMEL = Object.freeze(new NamingStyle(
    'lower-camel',                  // name
    null,                           // wordBoundaryFilter (will use custom logic)
    '',                             // wordSeparator
    (w) => firstCharOnlyToUpper(w), // wordNormalizer
    (w) => w.toLowerCase(),         // firstWordNormalizer
    undefined,                      // quickOptimizer
    true,                           // useCamelCaseBoundary
  ));

  /**
   * Java and C++ class naming style, e.g., `"UpperCamel"`.
   */
  static UPPER_CAMEL = Object.freeze(new NamingStyle(
    'upper-camel',                  // name
    null,                           // wordBoundaryFilter (will use custom logic)
    '',                             // wordSeparator
    (w) => firstCharOnlyToUpper(w), // wordNormalizer
    undefined,                      // firstWordNormalizer
    undefined,                      // quickOptimizer
    true,                           // useCamelCaseBoundary
  ));

  /**
   * Java and C++ constant naming style, e.g., `"UPPER_UNDERSCORE"`.
   */
  static UPPER_UNDERSCORE = Object.freeze(new NamingStyle(
    'upper-underscore',             // name
    (c) => c === '_',               // wordBoundaryFilter
    '_',                            // wordSeparator
    (w) => w.toUpperCase(),         // wordNormalizer
    undefined,                      // firstWordNormalizer
    (style, str) => {               // quickOptimizer
      if (style === NamingStyle.LOWER_HYPHEN) {
        return str.replace(/_/g, '-').toLowerCase();
      } else if (style === NamingStyle.LOWER_UNDERSCORE) {
        return str.toLowerCase();
      }
      return undefined;
    },
  ));

  /**
   * Returns all the naming style constants.
   *
   * @return {Array<NamingStyle>}
   *     the array of all naming style constants.
   */
  static values() {
    return [
      NamingStyle.LOWER_HYPHEN,
      NamingStyle.LOWER_UNDERSCORE,
      NamingStyle.LOWER_CAMEL,
      NamingStyle.UPPER_CAMEL,
      NamingStyle.UPPER_UNDERSCORE,
    ];
  }

  /**
   * Returns the naming style constant of the specified name.
   *
   * @param {String|NamingStyle} name
   *     the name of the naming style constant, or a `NamingStyle` instance. The
   *     name is compared case-insensitively and the characters '-' and '_' are
   *     treated as the same.
   * @return {NamingStyle}
   *     the naming style constant of the specified name, or the specified
   *     `NamingStyle` instance if the argument `name` is a `NamingStyle` instance.
   * @throws {TypeError}
   *     if the argument `name` is not a string nor a `NamingStyle` instance.
   * @throws {Error}
   *     if there is no naming style constant of the specified name.
   */
  static of(name) {
    if (name instanceof NamingStyle) {
      return name;
    }
    if (typeof name !== 'string') {
      throw new TypeError('The argument of `NamingStyle.of()` must be a string or a `NamingStyle` instance.');
    }
    const normalizedName = name.replace(/_/g, '-').toLowerCase();
    const values = NamingStyle.values();
    for (let i = 0; i < values.length; ++i) {
      const value = values[i];
      if (value.name.toLowerCase() === normalizedName) {
        return value;
      }
    }
    throw new Error(`Unknown naming style: '${name}'.`);
  }

  /**
   * Constructor a {@link NamingStyle} instance.
   *
   * **NOTE:** this constructor is private, you should use the static constants
   * instead.
   *
   * @param {String} name
   *     The name of this instance.
   * @param {Function} wordBoundaryFilter
   *     A function that determines whether a character is a word boundary.
   * @param {String} wordSeparator
   *     The word separator string.
   * @param {Function} wordNormalizer
   *     The function that normalizes a word.
   * @param {Function|undefined} firstWordNormalizer
   *     The function that normalizes the first word. If this argument is
   *     `undefined`, then the `wordNormalizer` will be used instead.
   * @param {Function|undefined} quickOptimizer
   *     The function that optimizes the conversion from this naming style to
   *     some special naming style. If this argument is `undefined`, then it is
   *     ignored.
   * @param {Boolean|undefined} useCamelCaseBoundary
   *     Whether to use CamelCase boundary detection logic. If true, uses
   *     findFirstCamelCaseBoundary instead of wordBoundaryFilter.
   */
  constructor(name, wordBoundaryFilter, wordSeparator, wordNormalizer, firstWordNormalizer, quickOptimizer, useCamelCaseBoundary) {
    this.name = name;
    this.wordBoundaryFilter = wordBoundaryFilter;
    this.wordSeparator = wordSeparator;
    this.wordNormalizer = wordNormalizer;
    this.firstWordNormalizer = firstWordNormalizer ?? wordNormalizer;
    this.quickOptimizer = quickOptimizer;
    this.useCamelCaseBoundary = useCamelCaseBoundary ?? false;
  }

  /**
   * Converts a specified string from this naming style to another naming style.
   *
   * @param {NamingStyle} style
   *     The target naming style.
   * @param {String} str
   *     The string to be converted.
   * @return {String}
   *     The converted string.
   */
  to(style, str) {
    if (str === null || str === undefined) {
      return str;
    }
    if (style === this) {
      return str;
    }
    if (this.quickOptimizer) {
      const result = this.quickOptimizer(style, str);
      if (result !== undefined) {
        return result;
      }
    }
    let result = '';
    let i = 0;
    let j = -1;

    // Use appropriate boundary finding logic
    const findBoundary = this.useCamelCaseBoundary
      ? (str, start, end) => findFirstCamelCaseBoundary(str, start, end)
      : (str, start, end) => findFirst(str, start, end, this.wordBoundaryFilter);

    while ((j = findBoundary(str, ++j, str.length)) >= 0) {
      if (i === j) continue;
      const word = str.substring(i, j);
      if (i === 0) {
        const normalizedWord = style.firstWordNormalizer(word);
        result += normalizedWord;
      } else {
        const normalizedWord = style.wordNormalizer(word);
        result += normalizedWord;
      }
      result += style.wordSeparator;
      i = j + this.wordSeparator.length;
    }
    if (i === 0) {
      return style.firstWordNormalizer(str);
    } else {
      const word = str.substring(i);
      const normalizedWord = style.wordNormalizer(word);
      result += normalizedWord;
      return result;
    }
  }
}

// freeze the constants and the class
// Object.freeze(NamingStyle);

export default NamingStyle;
