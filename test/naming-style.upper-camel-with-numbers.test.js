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
 * Unit tests of the {@link NamingStyle.UPPER_CAMEL} with numbers.
 *
 * @author Haixing Hu
 */
describe('Test the NamingStyle.UPPER_CAMEL with numbers', () => {
  test('Test NamingStyle.UPPER_CAMEL.to() with numbers at the end', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Js3dModel')).toBe('js-3d-model');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Js3dModel')).toBe('js_3d_model');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Js3dModel')).toBe('js3dModel');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Js3dModel')).toBe('JS_3D_MODEL');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with numbers in the middle', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'HTML5Parser')).toBe('html-5-parser');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'HTML5Parser')).toBe('html_5_parser');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'HTML5Parser')).toBe('html5Parser');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'HTML5Parser')).toBe('HTML_5_PARSER');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with consecutive numbers', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'CSS3Processor')).toBe('css-3-processor');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'CSS3Processor')).toBe('css_3_processor');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'CSS3Processor')).toBe('css3Processor');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'CSS3Processor')).toBe('CSS_3_PROCESSOR');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with mixed patterns', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Http2Client')).toBe('http-2-client');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Http2Client')).toBe('http_2_client');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Http2Client')).toBe('http2Client');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Http2Client')).toBe('HTTP_2_CLIENT');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with OAuth pattern', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'OAuth2Token')).toBe('o-auth-2-token');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'OAuth2Token')).toBe('o_auth_2_token');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'OAuth2Token')).toBe('oAuth2Token');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'OAuth2Token')).toBe('O_AUTH_2_TOKEN');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with Base64 pattern', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Base64Encoder')).toBe('base-64-encoder');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Base64Encoder')).toBe('base_64_encoder');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Base64Encoder')).toBe('base64Encoder');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Base64Encoder')).toBe('BASE_64_ENCODER');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with Utf8 pattern', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Utf8Decoder')).toBe('utf-8-decoder');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Utf8Decoder')).toBe('utf_8_decoder');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Utf8Decoder')).toBe('utf8Decoder');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Utf8Decoder')).toBe('UTF_8_DECODER');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with hash patterns', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Md5Hash')).toBe('md-5-hash');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Md5Hash')).toBe('md_5_hash');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Md5Hash')).toBe('md5Hash');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Md5Hash')).toBe('MD_5_HASH');

    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Sha256Hash')).toBe('sha-256-hash');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Sha256Hash')).toBe('sha_256_hash');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Sha256Hash')).toBe('sha256Hash');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Sha256Hash')).toBe('SHA_256_HASH');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with Api pattern', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Api2Response')).toBe('api-2-response');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Api2Response')).toBe('api_2_response');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Api2Response')).toBe('api2Response');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Api2Response')).toBe('API_2_RESPONSE');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with numbers at start', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, '3dModel')).toBe('3d-model');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, '3dModel')).toBe('3d_model');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, '3dModel')).toBe('3dModel');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, '3dModel')).toBe('3D_MODEL');
  });

  test('Test NamingStyle.UPPER_CAMEL.to() with multiple consecutive numbers', () => {
    expect(UPPER_CAMEL.to(LOWER_HYPHEN, 'Http2Client123')).toBe('http-2-client-123');
    expect(UPPER_CAMEL.to(LOWER_UNDERSCORE, 'Http2Client123')).toBe('http_2_client_123');
    expect(UPPER_CAMEL.to(LOWER_CAMEL, 'Http2Client123')).toBe('http2Client123');
    expect(UPPER_CAMEL.to(UPPER_UNDERSCORE, 'Http2Client123')).toBe('HTTP_2_CLIENT_123');
  });
});
