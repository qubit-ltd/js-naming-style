////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import findFirst from '../src/impl/find-first';

describe('findFirst', () => {
  const isDigit = (c) => c >= '0' && c <= '9';
  const isUpper = (c) => c >= 'A' && c <= 'Z';

  test('should find the first digit', () => {
    expect(findFirst('abc1def2', 0, 8, isDigit)).toBe(3);
    expect(findFirst('abc1def2', 4, 8, isDigit)).toBe(7);
  });

  test('should find the first uppercase letter', () => {
    expect(findFirst('abcDefG', 0, 7, isUpper)).toBe(3);
    expect(findFirst('abcDefG', 4, 7, isUpper)).toBe(6);
  });

  test('should return -1 if not found', () => {
    expect(findFirst('abcdefg', 0, 7, isDigit)).toBe(-1);
    expect(findFirst('ABCDEFG', 0, 7, isDigit)).toBe(-1);
  });

  test('should handle empty range', () => {
    expect(findFirst('abc1def2', 4, 4, isDigit)).toBe(-1);
    expect(findFirst('abc1def2', 8, 8, isDigit)).toBe(-1);
  });

  test('should handle invalid range (startIndex >= endIndex)', () => {
    expect(findFirst('abc1def2', 5, 4, isDigit)).toBe(-1);
  });

  test('should handle null or undefined string', () => {
    expect(findFirst(null, 0, 0, isDigit)).toBe(-1);
    expect(findFirst(undefined, 0, 0, isDigit)).toBe(-1);
  });

  test('should handle null filter', () => {
    expect(findFirst('abc', 0, 3, null)).toBe(-1);
    expect(findFirst('abc', 0, 3, undefined)).toBe(-1);
  });
});
