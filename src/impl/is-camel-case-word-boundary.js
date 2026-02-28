////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Determines whether a character at a given position in a string is a word
 * boundary in CamelCase naming style using a finite state automaton.
 *
 * This function needs to be called in sequence to maintain state consistency.
 * It tracks previous boundaries to correctly determine the current state.
 *
 * @param {string} str
 *     the string to be checked.
 * @param {number} index
 *     the index of the character to be checked.
 * @return {boolean}
 *     true if the character at the given index is a word boundary; false otherwise.
 * @author Haixing Hu
 * @private
 */
function isCamelCaseWordBoundary(str, index) {
  if (!str || index <= 0 || index >= str.length) {
    return false;
  }

  const isUpper = (c) => c >= 'A' && c <= 'Z';
  const isLower = (c) => c >= 'a' && c <= 'z';
  const isDigit = (c) => c >= '0' && c <= '9';

  const getCharType = (c) => {
    if (isUpper(c)) return 'U';
    if (isLower(c)) return 'L';
    if (isDigit(c)) return 'D';
    return 'OTHER';
  };

  const currentChar = str.charAt(index);
  const currentType = getCharType(currentChar);
  if (currentType === 'OTHER') {
    return false;
  }

  const prevChar = str.charAt(index - 1);
  const prevType = getCharType(prevChar);

  switch (prevType) {
    case 'L':
      return currentType === 'U' || currentType === 'D';
    case 'U': {
      if (currentType === 'L') {
        return false;
      }
      if (currentType === 'D') {
        return true;
      }
      if (currentType === 'U') {
        const nextChar = (index + 1 < str.length) ? str.charAt(index + 1) : '';
        return isLower(nextChar);
      }
      return false;
    }
    case 'D':
      return currentType === 'U';
    default:
      return false;
  }
}

export default isCamelCaseWordBoundary;
