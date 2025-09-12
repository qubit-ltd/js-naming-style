////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isCamelCaseWordBoundary from './is-camel-case-word-boundary.js';

/**
 * Finds the first word boundary in a CamelCase string.
 *
 * @param {String} str
 *     the string to be searched, which must be an ASCII string.
 * @param {Number} startIndex
 *     the index of the first character to be searched, which must be in the
 *     range `[0, str.length)`.
 * @param {Number} endIndex
 *     the index after the last character to be searched, which must be in the
 *     range `[0, str.length]`.
 * @return {Number}
 *     the index of the first word boundary; or -1 if no such boundary is found.
 * @author Haixing Hu
 * @private
 */
function findFirstCamelCaseBoundary(str, startIndex, endIndex) {
  for (let i = startIndex; i < endIndex; ++i) {
    if (isCamelCaseWordBoundary(str, i)) {
      return i;
    }
  }
  return -1;
}

export default findFirstCamelCaseBoundary;
