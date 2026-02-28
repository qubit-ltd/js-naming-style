////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import findFirstCamelCaseBoundary from '../src/impl/find-first-camel-case-boundary';

describe('findFirstCamelCaseBoundary', () => {
  test('should find the first boundary in camelCase string', () => {
    expect(findFirstCamelCaseBoundary('helloWorld', 0, 10)).toBe(5);
    expect(findFirstCamelCaseBoundary('camelCaseString', 0, 15)).toBe(5);
    expect(findFirstCamelCaseBoundary('camelCaseString', 6, 15)).toBe(9);
  });

  test('should find the first boundary in snake_case string (though it may find none)', () => {
    expect(findFirstCamelCaseBoundary('hello_world', 0, 11)).toBe(-1);
  });

  test('should return -1 if no boundary is found', () => {
    expect(findFirstCamelCaseBoundary('helloworld', 0, 10)).toBe(-1);
    expect(findFirstCamelCaseBoundary('HELLOWORLD', 0, 10)).toBe(-1);
  });

  test('should handle empty range', () => {
    expect(findFirstCamelCaseBoundary('helloWorld', 5, 5)).toBe(-1);
  });

  test('should handle null or undefined string', () => {
    expect(findFirstCamelCaseBoundary(null, 0, 0)).toBe(-1);
    expect(findFirstCamelCaseBoundary(undefined, 0, 0)).toBe(-1);
  });
});
