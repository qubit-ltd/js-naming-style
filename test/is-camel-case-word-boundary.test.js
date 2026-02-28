////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isCamelCaseWordBoundary from '../src/impl/is-camel-case-word-boundary';

describe('isCamelCaseWordBoundary', () => {
  test('should return false for start/end of string', () => {
    expect(isCamelCaseWordBoundary('abc', 0)).toBe(false);
    expect(isCamelCaseWordBoundary('abc', 3)).toBe(false);
  });

  test('LOWER state: transitions to UPPER or DIGIT', () => {
    expect(isCamelCaseWordBoundary('abcDef', 3)).toBe(true);  // lower -> UPPER (D)
    expect(isCamelCaseWordBoundary('abc123', 3)).toBe(true);  // lower -> DIGIT (1)
    expect(isCamelCaseWordBoundary('abc_def', 3)).toBe(false); // lower -> OTHER (_)
  });

  test('UPPER state: transitions to DIGIT or consecutive UPPER', () => {
    expect(isCamelCaseWordBoundary('ABC', 1)).toBe(false);    // UPPER (A) -> UPPER (B), next is UPPER (C) -> false
    expect(isCamelCaseWordBoundary('ABc', 1)).toBe(true);     // UPPER (A) -> UPPER (B), next is lower (c) -> true (boundary at B)
    expect(isCamelCaseWordBoundary('A1', 1)).toBe(true);      // UPPER (A) -> DIGIT (1) -> true
  });

  test('UPPER_SEQ behavior (already covered by case U with next L)', () => {
    expect(isCamelCaseWordBoundary('XMLParser', 3)).toBe(true); // XMLP -> boundary at P (index 3) because it's followed by 'a' (lower)
    expect(isCamelCaseWordBoundary('XMLParser', 2)).toBe(false); // XML -> X and M are both upper, M followed by L (upper) -> false
  });

  test('DIGIT state', () => {
    expect(isCamelCaseWordBoundary('123abc', 3)).toBe(false); // DIGIT (3) -> lower (a) -> false
    expect(isCamelCaseWordBoundary('123Abc', 3)).toBe(true);  // DIGIT (3) -> UPPER (A) -> true
    expect(isCamelCaseWordBoundary('123456', 3)).toBe(false); // DIGIT (3) -> DIGIT (4) -> false
  });

  test('OTHER state', () => {
    expect(isCamelCaseWordBoundary('a_b', 1)).toBe(false); // OTHER (_) -> any -> false
  });

  test('should handle null or undefined string', () => {
    expect(isCamelCaseWordBoundary(null, 0)).toBe(false);
    expect(isCamelCaseWordBoundary(undefined, 0)).toBe(false);
  });
});
