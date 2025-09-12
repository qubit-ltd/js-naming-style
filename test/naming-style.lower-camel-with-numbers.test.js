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
 * Unit tests of the {@link NamingStyle.LOWER_CAMEL} with numbers.
 *
 * @author Haixing Hu
 */
describe('Test the NamingStyle.LOWER_CAMEL with numbers', () => {
  test('Test NamingStyle.LOWER_CAMEL.to() with numbers at the end', () => {
    expect(LOWER_CAMEL.to(LOWER_HYPHEN, 'js3dModel')).toBe('js-3d-model');
    expect(LOWER_CAMEL.to(LOWER_UNDERSCORE, 'js3dModel')).toBe('js_3d_model');
    expect(LOWER_CAMEL.to(UPPER_CAMEL, 'js3dModel')).toBe('Js3dModel');
    expect(LOWER_CAMEL.to(UPPER_UNDERSCORE, 'js3dModel')).toBe('JS_3D_MODEL');
  });

  test('Test NamingStyle.LOWER_CAMEL.to() with numbers in the middle', () => {
    expect(LOWER_CAMEL.to(LOWER_HYPHEN, 'html5Parser')).toBe('html-5-parser');
    expect(LOWER_CAMEL.to(LOWER_UNDERSCORE, 'html5Parser')).toBe('html_5_parser');
    expect(LOWER_CAMEL.to(UPPER_CAMEL, 'html5Parser')).toBe('Html5Parser');
    expect(LOWER_CAMEL.to(UPPER_UNDERSCORE, 'html5Parser')).toBe('HTML_5_PARSER');
  });

  test('Test NamingStyle.LOWER_CAMEL.to() with consecutive numbers', () => {
    expect(LOWER_CAMEL.to(LOWER_HYPHEN, 'css3Processor')).toBe('css-3-processor');
    expect(LOWER_CAMEL.to(LOWER_UNDERSCORE, 'css3Processor')).toBe('css_3_processor');
    expect(LOWER_CAMEL.to(UPPER_CAMEL, 'css3Processor')).toBe('Css3Processor');
    expect(LOWER_CAMEL.to(UPPER_UNDERSCORE, 'css3Processor')).toBe('CSS_3_PROCESSOR');
  });

  test('Test NamingStyle.LOWER_CAMEL.to() with mixed patterns', () => {
    expect(LOWER_CAMEL.to(LOWER_HYPHEN, 'http2Client')).toBe('http-2-client');
    expect(LOWER_CAMEL.to(LOWER_UNDERSCORE, 'http2Client')).toBe('http_2_client');
    expect(LOWER_CAMEL.to(UPPER_CAMEL, 'http2Client')).toBe('Http2Client');
    expect(LOWER_CAMEL.to(UPPER_UNDERSCORE, 'http2Client')).toBe('HTTP_2_CLIENT');
  });

  test('Test NamingStyle.LOWER_CAMEL.to() with OAuth pattern', () => {
    expect(LOWER_CAMEL.to(LOWER_HYPHEN, 'oAuth2Token')).toBe('o-auth-2-token');
    expect(LOWER_CAMEL.to(LOWER_UNDERSCORE, 'oAuth2Token')).toBe('o_auth_2_token');
    expect(LOWER_CAMEL.to(UPPER_CAMEL, 'oAuth2Token')).toBe('OAuth2Token');
    expect(LOWER_CAMEL.to(UPPER_UNDERSCORE, 'oAuth2Token')).toBe('O_AUTH_2_TOKEN');
  });
});
