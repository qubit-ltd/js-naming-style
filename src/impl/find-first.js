////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Finds the first character in a string satisfying the specified filter.
 *
 * @param {String} str
 *     the string to be searched, which must be an ASCII string.
 * @param {Number} startIndex
 *     the index of the first character to be searched, which must be in the
 *     range `[0, str.length)`.
 * @param {Number} endIndex
 *     the index after the last character to be searched, which must be in the
 *     range `[0, str.length]`.
 * @param {Function} filter
 *     the filter function.
 * @return {Number}
 *     the index of the first character satisfying the specified filter; or
 *     -1 if no such character is found.
 * @author Haixing Hu
 * @private
 */
function findFirst(str, startIndex, endIndex, filter) {
  if (!str || !filter) {
    return -1;
  }
  for (let i = startIndex; i < endIndex; ++i) {
    if (filter(str.charAt(i))) {
      return i;
    }
  }
  return -1;
}

export default findFirst;
