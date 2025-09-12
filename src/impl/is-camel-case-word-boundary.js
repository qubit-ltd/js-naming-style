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
  if (index <= 0 || index >= str.length) {
    return false;
  }

  // Helper functions
  const isUpper = (c) => c >= 'A' && c <= 'Z';
  const isLower = (c) => c >= 'a' && c <= 'z';
  const isDigit = (c) => c >= '0' && c <= '9';

  // Get character type
  const getCharType = (c) => {
    if (isUpper(c)) return 'U';
    if (isLower(c)) return 'L';
    if (isDigit(c)) return 'D';
    return 'OTHER';
  };

  // Determine current state based on previous character
  const getCurrentState = () => {
    const prevChar = str.charAt(index - 1);
    const prevType = getCharType(prevChar);

    if (prevType === 'L') return 'LOWER';
    if (prevType === 'D') return 'DIGIT';

    if (prevType === 'U') {
      // Check if we have consecutive uppercase letters
      if (index >= 2) {
        const prevPrevChar = str.charAt(index - 2);
        if (isUpper(prevPrevChar)) {
          return 'UPPER_SEQ';
        }
      }
      return 'UPPER';
    }

    return 'START';
  };

  const currentChar = str.charAt(index);
  const currentType = getCharType(currentChar);
  const nextChar = index + 1 < str.length ? str.charAt(index + 1) : '';
  const nextType = nextChar ? getCharType(nextChar) : '';

  const currentState = getCurrentState();

  // State transition logic based on FSA
  switch (currentState) {
    case 'START':
      return false;

    case 'LOWER':
      if (currentType === 'U') return true;
      if (currentType === 'D') return true;
      return false;

    case 'UPPER':
      if (currentType === 'L') return false;
      if (currentType === 'D') return true;
      if (currentType === 'U') {
        if (nextType === 'L') return true;
        return false;
      }
      return false;

    case 'UPPER_SEQ':
      // 不在 L 处建边界；若当前 U 且下一字符是 L，则在当前 U 建边界
      if (currentType === 'L') return false;
      if (currentType === 'D') return true;
      if (currentType === 'U') return nextType === 'L';
      return false;

    case 'DIGIT':
      if (currentType === 'L') return false;
      if (currentType === 'U') return true;
      if (currentType === 'D') return false;
      return false;

    default:
      return false;
  }
}

export default isCamelCaseWordBoundary;
