////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  LOWER_HYPHEN,
  LOWER_UNDERSCORE,
  LOWER_CAMEL,
  UPPER_CAMEL,
  UPPER_UNDERSCORE,
} from '../src';

/**
 * Unit tests of the {@link NamingStyle.UPPER_CAMEL}.
 *
 * @author Haixing Hu
 */
describe('Test the NamingStyle.UPPER_CAMEL', () => {
  test('Test NamingStyle.UPPER_CAMEL.to(), undefined', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, undefined)).toBeUndefined();
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, undefined)).toBeUndefined();
    expect(UPPER_CAMEL.to(LOWER_CAMEL, undefined)).toBeUndefined();
    expect(UPPER_CAMEL.to(UPPER_CAMEL, undefined)).toBeUndefined();
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, undefined)).toBeUndefined();
  });
  test('Test NamingStyle.UPPER_CAMEL.to(), null', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, null)).toBeNull();
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, null)).toBeNull();
    expect(UPPER_CAMEL.to(LOWER_CAMEL, null)).toBeNull();
    expect(UPPER_CAMEL.to(UPPER_CAMEL, null)).toBeNull();
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, null)).toBeNull();
  });
  test('Test NamingStyle.UPPER_CAMEL.to(), empty string', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, '')).toBe('');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, '')).toBe('');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, '')).toBe('');
    expect(UPPER_CAMEL.to(UPPER_CAMEL, '')).toBe('');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, '')).toBe('');
  });
  test('Test NamingStyle.UPPER_CAMEL.to(), simple case', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'HelloWorldEverybody')).toBe('hello-world-everybody');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'HelloWorldEverybody')).toBe('hello_world_everybody');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'HelloWorldEverybody')).toBe('helloWorldEverybody');
    expect(UPPER_CAMEL.to(UPPER_CAMEL, 'HelloWorldEverybody')).toBe('HelloWorldEverybody');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'HelloWorldEverybody')).toBe('HELLO_WORLD_EVERYBODY');
  });
  test('Test NamingStyle.UPPER_CAMEL.to(), single word', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Hello')).toBe('hello');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Hello')).toBe('hello');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Hello')).toBe('hello');
    expect(UPPER_CAMEL.to(UPPER_CAMEL, 'Hello')).toBe('Hello');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Hello')).toBe('HELLO');
  });

  test('Test NamingStyle.UPPER_CAMEL.to(), XMLParser boundary (UPPER_SEQ→UPPER with lookahead=L)', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'XMLParser')).toBe('xml-parser');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'XMLParser')).toBe('xmlParser');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'XMLParser')).toBe('XML_PARSER');
  });

  test('Test NamingStyle.UPPER_CAMEL.to(), OTHER char should not split', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Hello$World')).toBe('hello$world');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Hello$World')).toBe('hello$world');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Hello$World')).toBe('HELLO$WORLD');
  });

  test('Test NamingStyle.UPPER_CAMEL.to(), digit→UPPER boundary', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'A3DModel')).toBe('a-3-d-model');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'A3DModel')).toBe('a_3_d_model');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'A3DModel')).toBe('a3DModel');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'A3DModel')).toBe('A_3_D_MODEL');
  });

  test('UPPER→UPPER with lookahead=U should not split (ABCD)', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'ABCD')).toBe('abcd');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'ABCD')).toBe('abcd');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'ABCD')).toBe('abcd');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'ABCD')).toBe('ABCD');
  });

  test('DIGIT→OTHER should not split (A1$B)', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'A1$B')).toBe('a-1$b');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'A1$B')).toBe('a_1$b');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'A1$B')).toBe('a1$b');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'A1$B')).toBe('A_1$B');
  });
});
