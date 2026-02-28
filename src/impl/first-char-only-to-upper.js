////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the first character of a word to upper case and converts the
 * remaining characters to lower case.
 *
 * @param {string} word
 *     the word to be converted.
 * @returns {string}
 *     the converted word.
 * @author Haixing Hu
 * @private
 */
function firstCharOnlyToUpper(word) {
  if (!word || word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default firstCharOnlyToUpper;
