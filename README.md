# @qubit-ltd/naming-style

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/naming-style.svg)](https://npmjs.com/package/@qubit-ltd/naming-style)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.zh_CN.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/qubit-ltd/js-naming-style/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/qubit-ltd/js-naming-style/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/qubit-ltd/js-naming-style/badge.svg?branch=master)](https://coveralls.io/github/qubit-ltd/js-naming-style?branch=master)

[naming-style] is a JavaScript library for converting the naming style of 
identifiers. It supports various programming languages' naming conventions, 
including Java, C++, and Python, facilitating the transition between different 
casing styles. The library is lightweight, has no dependencies, and maintains 100% test coverage.

## <span id="content">Contents</span>

- [Installation](#installation)
- [Usage Examples](#example)
- [How to Use](#usage)
    - [Importing](#import)
    - [Converting String Formats](#convert)
    - [Available Format Conversions](#formats)
    - [Retrieving All Formats](#all-formats)
    - [Getting a Format by Name](#get-format)
    - [Shortcut Constants](#shortcuts)
- [Advanced Usage](#advanced-usage)
    - [Batch Processing](#batch-processing)
    - [Error Handling](#error-handling)
    - [Integration with Other Tools](#integration)
- [Performance](#performance)
- [Test Coverage](#test-coverage)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

## <span id="installation">Installation</span>

Install via `npm`:
```bash
npm install @qubit-ltd/naming-style
```
Or through `yarn`:
```bash
yarn add @qubit-ltd/naming-style
```

## <span id="example">Usage Examples</span>

Basic usage for converting a hyphenated string to camelCase:
```js
import NamingStyle from '@qubit-ltd/naming-style';

const str = 'hello-world-boy';
const converted = NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_CAMEL, str);
console.log(converted);     // Outputs "helloWorldBoy"
```

Simplified usage by directly importing the naming style constants:
```js
import { LOWER_HYPHEN, LOWER_CAMEL } from '@qubit-ltd/naming-style';

const str = 'hello-world-boy';
const converted = LOWER_HYPHEN.to(LOWER_CAMEL, str);
console.log(converted);     // Outputs "helloWorldBoy"
```

Converting between multiple styles:
```js
import { LOWER_HYPHEN, LOWER_UNDERSCORE, LOWER_CAMEL, UPPER_CAMEL, UPPER_UNDERSCORE } from '@qubit-ltd/naming-style';

const kebabCase = 'user-first-name';
const snakeCase = LOWER_HYPHEN.to(LOWER_UNDERSCORE, kebabCase);
const camelCase = LOWER_HYPHEN.to(LOWER_CAMEL, kebabCase);
const pascalCase = LOWER_HYPHEN.to(UPPER_CAMEL, kebabCase);
const constantCase = LOWER_HYPHEN.to(UPPER_UNDERSCORE, kebabCase);

console.log(snakeCase);     // "user_first_name"
console.log(camelCase);     // "userFirstName"  
console.log(pascalCase);    // "UserFirstName"
console.log(constantCase);  // "USER_FIRST_NAME"
```

## <span id="usage">How to Use</span>

### <span id="import">Importing</span>

Import the `NamingStyle` class:
```js
import NamingStyle from '@qubit-ltd/naming-style';
```
Or import the global constants representing various naming styles:
```js
import {
  LOWER_HYPHEN,
  LOWER_UNDERSCORE,
  LOWER_CAMEL,
  UPPER_CAMEL,
  UPPER_UNDERSCORE,
} from '@qubit-ltd/naming-style';
```

### <span id="convert">Converting String Formats</span>

Use the static instances of the `NamingStyle` class to convert string formats. 
For example, converting a `lower-hyphen` naming style other styles:

```js
import NamingStyle from '@qubit-ltd/naming-style';

expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_HYPHEN, 'hello-world')).toBe('hello-world');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_UNDERSCORE, 'hello-world')).toBe('hello_world');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_CAMEL, 'hello-world')).toBe('helloWorld');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.UPPER_CAMEL, 'hello-world')).toBe('HelloWorld');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.UPPER_UNDERSCORE, 'hello-world')).toBe('HELLO_WORLD');
```

You can also directly import the constants for a more concise syntax:

```js
import { LOWER_HYPHEN, LOWER_UNDERSCORE, LOWER_CAMEL, UPPER_CAMEL, UPPER_UNDERSCORE } from '@qubit-ltd/naming-style';

expect(LOWER_HYPHEN.to(LOWER_HYPHEN, 'hello-world')).toBe('hello-world');
expect(LOWER_HYPHEN.to(LOWER_UNDERSCORE, 'hello-world')).toBe('hello_world');
expect(LOWER_HYPHEN.to(LOWER_CAMEL, 'hello-world')).toBe('helloWorld');
expect(LOWER_HYPHEN.to(UPPER_CAMEL, 'hello-world')).toBe('HelloWorld');
expect(LOWER_HYPHEN.to(UPPER_UNDERSCORE, 'hello-world')).toBe('HELLO_WORLD');
```

### <span id="formats">Available Format Conversions</span>

This library offers the following format constants for conversion:

- `NamingStyle.LOWER_HYPHEN`: Lowercase letters separated by hyphens, e.g., 
  `"lower-hyphen"`. Commonly used in XML tag names, HTML attributes, and CSS properties.
- `NamingStyle.LOWER_UNDERSCORE`: Lowercase letters separated by underscores, 
  e.g., `"lower_underscore"`. Commonly used in C++ and Python variable and attribute names.
- `NamingStyle.LOWER_CAMEL`: Camel case with the first letter lowercase, e.g.,
  `"lowerCamel"`. Commonly used in Java variable and attribute names, as well as JavaScript.
- `NamingStyle.UPPER_CAMEL`: Camel case with the first letter uppercase, e.g., 
  `"UpperCamel"`. Commonly used in Java and C++ class names, and React component names.
- `NamingStyle.UPPER_UNDERSCORE`: Uppercase letters separated by underscores, 
  e.g., `"UPPER_UNDERSCORE"`. Commonly used in Java and C++ constant names.

### <span id="all-formats">Retrieving All Formats</span>

Use the `NamingStyle.values()` method to get a list of all available format constants:

```js
const formats = NamingStyle.values();
expect(formats).toEqual([
  NamingStyle.LOWER_HYPHEN,
  NamingStyle.LOWER_UNDERSCORE,
  NamingStyle.LOWER_CAMEL,
  NamingStyle.UPPER_CAMEL,
  NamingStyle.UPPER_UNDERSCORE,
]);
```

### <span id="get-format">Getting a Format by Name</span>

Use the `NamingStyle.of(name)` method to get a corresponding format object by 
name. This method accepts a string or a `NamingStyle` instance as an argument; 
string arguments are case-insensitive, and `'-'` and `'_'` are considered 
equivalent.

```js
let format = NamingStyle.of('lower-camel');
expect(format).toBe(NamingStyle.LOWER_CAMEL);
format = NamingStyle.of('LOWER-CAMEL');
expect(format).toBe(NamingStyle.LOWER_CAMEL);
format = NamingStyle.of('lower_camel');
expect(format).toBe(NamingStyle.LOWER_CAMEL);
format = NamingStyle.of('LOWER_CAMEL');
expect(format).toBe(NamingStyle.LOWER_CAMEL);
format = NamingStyle.of(NamingStyle.LOWER_CAMEL);
expect(format).toBe(NamingStyle.LOWER_CAMEL);
```

If the provided name does not exist, an error will be thrown.

### <span id="shortcuts">Shortcut Constants</span>

In addition to using the `NamingStyle` class member constants, you can directly
access different case styles through the following global constants:

```js
import { 
  LOWER_HYPHEN,
  LOWER_UNDERSCORE,
  LOWER_CAMEL, 
  UPPER_CAMEL, 
  UPPER_UNDERSCORE, 
} from '@qubit-ltd/naming-style';

expect(LOWER_HYPHEN.to(LOWER_HYPHEN, 'hello-world')).toBe('hello-world');
expect(LOWER_HYPHEN.to(LOWER_UNDERSCORE, 'hello-world')).toBe('hello_world');
expect(LOWER_HYPHEN.to(LOWER_CAMEL, 'hello-world')).toBe('helloWorld');
expect(LOWER_HYPHEN.to(UPPER_CAMEL, 'hello-world')).toBe('HelloWorld');
expect(LOWER_HYPHEN.to(UPPER_UNDERSCORE, 'hello-world')).toBe('HELLO_WORLD');
```

## <span id="advanced-usage">Advanced Usage</span>

### <span id="batch-processing">Batch Processing</span>

When you need to convert multiple strings at once, you can process them in a batch:

```js
import { LOWER_HYPHEN, LOWER_CAMEL } from '@qubit-ltd/naming-style';

const kebabCaseStrings = [
  'user-name',
  'email-address',
  'phone-number'
];

const camelCaseStrings = kebabCaseStrings.map(str => 
  LOWER_HYPHEN.to(LOWER_CAMEL, str)
);

console.log(camelCaseStrings);  // ["userName", "emailAddress", "phoneNumber"]
```

### <span id="error-handling">Error Handling</span>

The library handles edge cases gracefully:

```js
import { LOWER_HYPHEN, UPPER_CAMEL, NamingStyle } from '@qubit-ltd/naming-style';

// Handling null or undefined
console.log(LOWER_HYPHEN.to(UPPER_CAMEL, null));      // ""
console.log(LOWER_HYPHEN.to(UPPER_CAMEL, undefined)); // ""

// Handling empty string
console.log(LOWER_HYPHEN.to(UPPER_CAMEL, ""));        // ""

// Error when using invalid naming style
try {
  NamingStyle.of("invalid-style");
} catch (error) {
  console.error(error.message); // "No naming style found with name: invalid-style"
}
```

### <span id="integration">Integration with Other Tools</span>

This library can be easily integrated with other tools and frameworks:

**With React component naming:**
```jsx
import React from 'react';
import { LOWER_UNDERSCORE, LOWER_CAMEL } from '@qubit-ltd/naming-style';

// Convert API response fields (snake_case) to React component props (camelCase)
function processApiData(apiData) {
  const processedData = {};
  
  Object.keys(apiData).forEach(key => {
    const camelKey = LOWER_UNDERSCORE.to(LOWER_CAMEL, key);
    processedData[camelKey] = apiData[key];
  });
  
  return processedData;
}

function UserProfile({ userData }) {
  const processedData = processApiData(userData);
  return (
    <div>
      <h1>{processedData.userName}</h1>
      <p>{processedData.emailAddress}</p>
    </div>
  );
}
```

**With Express route parameters:**
```js
import express from 'express';
import { LOWER_HYPHEN, LOWER_CAMEL } from '@qubit-ltd/naming-style';

const app = express();

// Convert route parameters from kebab-case to camelCase
app.param(['user-id', 'item-id'], (req, res, next, value, name) => {
  const camelName = LOWER_HYPHEN.to(LOWER_CAMEL, name);
  req.params[camelName] = value;
  next();
});

app.get('/users/:user-id/items/:item-id', (req, res) => {
  console.log(req.params.userId);   // Access using camelCase
  console.log(req.params.itemId);   // Access using camelCase
  // Rest of the handler
});
```

## <span id="performance">Performance</span>

The library is designed to be lightweight and efficient:

- **Zero dependencies**: No external dependencies to bloat your bundle
- **Small footprint**: Less than 10KB minified
- **Optimized algorithms**: Efficient string manipulation with minimal overhead
- **Immutable objects**: All `NamingStyle` instances are immutable and reusable

## <span id="test-coverage">Test Coverage</span>

This library maintains 100% test coverage across all files and functionality:

```
------------------------------|---------|----------|---------|---------|------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|------------------
All files                     |     100 |      100 |     100 |     100 |               
 src                          |     100 |      100 |     100 |     100 |               
  index.js                    |     100 |      100 |     100 |     100 |               
  naming-style.js             |     100 |      100 |     100 |     100 |               
 src/impl                     |     100 |      100 |     100 |     100 |               
  find-first.js               |     100 |      100 |     100 |     100 |               
  first-char-only-to-upper.js |     100 |      100 |     100 |     100 |               
------------------------------|---------|----------|---------|---------|------------------
```

Comprehensive tests ensure that all edge cases and normal usage scenarios work as expected.

## <span id="browser-compatibility">Browser Compatibility</span>

This library is compatible with all modern browsers and Node.js environments. It uses ES5 syntax to ensure maximum compatibility:

- Chrome 45+
- Firefox 38+
- Safari 9+
- Edge 12+
- IE 11 (with appropriate polyfills)
- Node.js 6.0.0+

## <span id="contributing">Contributing</span>

If you encounter any issues or have suggestions for improvements, feel free to
submit an issue or PR to our [GitHub repository].

We welcome contributions! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code maintains 100% test coverage and passes all existing tests.

## <span id="license">License</span>

[naming-style] is licensed under Apache 2.0. For more details, please refer to 
the [LICENSE](LICENSE) file.

[naming-style]: https://npmjs.com/package/@qubit-ltd/naming-style
[GitHub repository]: https://github.com/qubit-ltd/js-naming-style
