////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import firstCharOnlyToUpper from '../src/impl/first-char-only-to-upper';

describe('firstCharOnlyToUpper', () => {
  test('should handle empty string', () => {
    expect(firstCharOnlyToUpper('')).toBe('');
  });

  test('should capitalize single character string', () => {
    expect(firstCharOnlyToUpper('a')).toBe('A');
    expect(firstCharOnlyToUpper('Z')).toBe('Z');
  });

  test('should capitalize first character and lowercase the rest', () => {
    expect(firstCharOnlyToUpper('hello')).toBe('Hello');
    expect(firstCharOnlyToUpper('WORLD')).toBe('World');
    expect(firstCharOnlyToUpper('hElLo')).toBe('Hello');
  });

  test('should handle strings with non-alphabetic first character', () => {
    expect(firstCharOnlyToUpper('1abc')).toBe('1abc');
    expect(firstCharOnlyToUpper('-abc')).toBe('-abc');
  });

  test('should handle null or undefined', () => {
    expect(firstCharOnlyToUpper(null)).toBe(null);
    expect(firstCharOnlyToUpper(undefined)).toBe(undefined);
  });
});
