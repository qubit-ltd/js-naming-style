# @qubit-ltd/naming-style 

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/naming-style.svg)](https://npmjs.com/package/@qubit-ltd/naming-style)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![English Document](https://img.shields.io/badge/Document-English-blue.svg)](README.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/qubit-ltd/js-naming-style/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/qubit-ltd/js-naming-style/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/qubit-ltd/js-naming-style/badge.svg?branch=master)](https://coveralls.io/github/qubit-ltd/js-naming-style?branch=master)

[naming-style] 是一个JavaScript库，用于转换标志符的命名风格。它支持多种编程语言的命名规范，
包括Java、C++和Python，能够方便地在不同的大小写风格之间进行转换。这个库体积小巧，没有外部依赖，
并且保持100%的测试覆盖率。

## <span id="content">目录</span>

- [安装方法](#installation)
- [使用示例](#example)
- [使用方法](#usage)
  - [导入](#import)
  - [转换字符串格式](#convert)
  - [可用的格式转换](#formats)
  - [获取所有格式](#all-formats)
  - [根据名称获取格式](#get-format)
  - [快捷常量](#shortcuts)
- [高级用法](#advanced-usage)
  - [批量处理](#batch-processing)
  - [错误处理](#error-handling)
  - [与其他工具集成](#integration)
- [性能特点](#performance)
- [测试覆盖率](#test-coverage)
- [浏览器兼容性](#browser-compatibility)
- [贡献方法](#contributing)
- [版权协议](#license)

## <span id="installation">安装方法</span>

通过 `npm` 安装：
```bash
npm install @qubit-ltd/naming-style
```
或者通过 `yarn` 安装：
```bash
yarn add @qubit-ltd/naming-style
```

## <span id="example">使用示例</span>

基本用法 - 将连字符格式转换为小驼峰格式：
```js
import NamingStyle from '@qubit-ltd/naming-style';

const str = 'hello-world-boy';
const converted = NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_CAMEL, str);
console.log(converted);     // 输出 "helloWorldBoy"
```

简化用法 - 直接导入命名风格常量：
```js
import { LOWER_HYPHEN, LOWER_CAMEL } from '@qubit-ltd/naming-style';

const str = 'hello-world-boy';
const converted = LOWER_HYPHEN.to(LOWER_CAMEL, str);
console.log(converted);     // 输出 "helloWorldBoy"
```

在多种风格之间转换：
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

## <span id="usage">使用方法</span>

### <span id="import">导入</span>

导入`NamingStyle`类：
```js
import NamingStyle from '@qubit-ltd/naming-style';
```
或者导入表示各种命名风格的全局常量：
```js
import {
  LOWER_HYPHEN,
  LOWER_UNDERSCORE,
  LOWER_CAMEL,
  UPPER_CAMEL,
  UPPER_UNDERSCORE,
} from '@qubit-ltd/naming-style';
```

### <span id="convert">转换字符串格式</span>

使用 `NamingStyle` 类的静态实例来转换字符串格式。例如，将 `lower-hyphen` 命名风格的字符串
转换为其他风格：

```js
import NamingStyle from '@qubit-ltd/naming-style';

expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_HYPHEN, 'hello-world')).toBe('hello-world');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_UNDERSCORE, 'hello-world')).toBe('hello_world');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.LOWER_CAMEL, 'hello-world')).toBe('helloWorld');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.UPPER_CAMEL, 'hello-world')).toBe('HelloWorld');
expect(NamingStyle.LOWER_HYPHEN.to(NamingStyle.UPPER_UNDERSCORE, 'hello-world')).toBe('HELLO_WORLD');
```

你也可以直接导入常量来使用更简洁的语法：

```js
import { LOWER_HYPHEN, LOWER_UNDERSCORE, LOWER_CAMEL, UPPER_CAMEL, UPPER_UNDERSCORE } from '@qubit-ltd/naming-style';

expect(LOWER_HYPHEN.to(LOWER_HYPHEN, 'hello-world')).toBe('hello-world');
expect(LOWER_HYPHEN.to(LOWER_UNDERSCORE, 'hello-world')).toBe('hello_world');
expect(LOWER_HYPHEN.to(LOWER_CAMEL, 'hello-world')).toBe('helloWorld');
expect(LOWER_HYPHEN.to(UPPER_CAMEL, 'hello-world')).toBe('HelloWorld');
expect(LOWER_HYPHEN.to(UPPER_UNDERSCORE, 'hello-world')).toBe('HELLO_WORLD');
```

### <span id="formats">可用的格式转换</span>

本函数库提供以下格式常量，并允许在它们之间进行转换：

- `NamingStyle.LOWER_HYPHEN`：使用连字符分隔的小写字母，例如 `"lower-hyphen"`。
  此命名风格常用于 XML 的标签名、HTML 属性和 CSS 属性名。
- `NamingStyle.LOWER_UNDERSCORE`：使用下划线分隔的小写字母，例如 `"lower_underscore"`。
  此命名风格常用于 C++ 和 Python 的变量名和属性名。
- `NamingStyle.LOWER_CAMEL`：首字母小写的驼峰命名法，例如 `"lowerCamel"`。
  此命名风格常用于 Java 的变量名和属性名，以及 JavaScript。
- `NamingStyle.UPPER_CAMEL`：首字母大写的驼峰命名法，例如 `"UpperCamel"`。  
  此命名风格常用于 Java 和 C++ 的类名，以及 React 组件名。
- `NamingStyle.UPPER_UNDERSCORE`：使用下划线分隔的大写字母，例如 `"UPPER_UNDERSCORE"`。
  此命名风格常用于 Java 和 C++ 的常量名。

### <span id="all-formats">获取所有格式</span>

使用 `NamingStyle.values()` 方法可获取所有可用的格式常量列表：

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

### <span id="get-format">根据名称获取格式</span>

使用 `NamingStyle.of(name)` 方法可根据名称获取对应的格式对象。
该方法接受一个字符串或一个 `NamingStyle` 实例作为参数；字符串参数大小写不敏感，`'-'`和`'_'`被视为等同。

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

如果提供的名称不存在，将抛出错误。

### <span id="shortcuts">快捷常量</span>

除了使用 `NamingStyle` 类成员常量，还可以通过以下全局常量直接访问不同的大小写格式：

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

## <span id="advanced-usage">高级用法</span>

### <span id="batch-processing">批量处理</span>

当需要一次性转换多个字符串时，可以进行批量处理：

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

### <span id="error-handling">错误处理</span>

该库能够优雅地处理边缘情况：

```js
import { LOWER_HYPHEN, UPPER_CAMEL, NamingStyle } from '@qubit-ltd/naming-style';

// 处理 null 或 undefined
console.log(LOWER_HYPHEN.to(UPPER_CAMEL, null));      // ""
console.log(LOWER_HYPHEN.to(UPPER_CAMEL, undefined)); // ""

// 处理空字符串
console.log(LOWER_HYPHEN.to(UPPER_CAMEL, ""));        // ""

// 使用无效命名风格时的错误
try {
  NamingStyle.of("invalid-style");
} catch (error) {
  console.error(error.message); // "No naming style found with name: invalid-style"
}
```

### <span id="integration">与其他工具集成</span>

这个库可以轻松地与其他工具和框架集成：

**与 React 组件命名集成：**
```jsx
import React from 'react';
import { LOWER_UNDERSCORE, LOWER_CAMEL } from '@qubit-ltd/naming-style';

// 将 API 响应字段（snake_case）转换为 React 组件属性（camelCase）
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

**与 Express 路由参数集成：**
```js
import express from 'express';
import { LOWER_HYPHEN, LOWER_CAMEL } from '@qubit-ltd/naming-style';

const app = express();

// 将路由参数从 kebab-case 转换为 camelCase
app.param(['user-id', 'item-id'], (req, res, next, value, name) => {
  const camelName = LOWER_HYPHEN.to(LOWER_CAMEL, name);
  req.params[camelName] = value;
  next();
});

app.get('/users/:user-id/items/:item-id', (req, res) => {
  console.log(req.params.userId);   // 使用 camelCase 访问
  console.log(req.params.itemId);   // 使用 camelCase 访问
  // 处理程序的其余部分
});
```

## <span id="performance">性能特点</span>

该库被设计为轻量级和高效：

- **零依赖**：没有外部依赖，不会增加你的打包体积
- **体积小**：压缩后小于 10KB
- **优化的算法**：高效的字符串操作，最小化开销
- **不可变对象**：所有 `NamingStyle` 实例都是不可变的，可以重复使用

## <span id="test-coverage">测试覆盖率</span>

该库在所有文件和功能上保持 100% 的测试覆盖率：

```
------------------------------|---------|----------|---------|---------|------------------
文件                           | % 语句  | % 分支   | % 函数  | % 行    | 未覆盖行号
------------------------------|---------|----------|---------|---------|------------------
所有文件                        |     100 |      100 |     100 |     100 |               
 src                          |     100 |      100 |     100 |     100 |               
  index.js                    |     100 |      100 |     100 |     100 |               
  naming-style.js             |     100 |      100 |     100 |     100 |               
 src/impl                     |     100 |      100 |     100 |     100 |               
  find-first.js               |     100 |      100 |     100 |     100 |               
  first-char-only-to-upper.js |     100 |      100 |     100 |     100 |               
------------------------------|---------|----------|---------|---------|------------------
```

全面的测试确保所有边缘情况和正常使用场景都能按预期工作。

## <span id="browser-compatibility">浏览器兼容性</span>

该库与所有现代浏览器和 Node.js 环境兼容。它使用 ES5 语法以确保最大兼容性：

- Chrome 45+
- Firefox 38+
- Safari 9+
- Edge 12+
- IE 11（使用适当的 polyfills）
- Node.js 6.0.0+

## <span id="contributing">贡献方法</span>

如果你发现任何问题或有改进建议，欢迎提交 issue 或者 PR 到本项目的 [GitHub 仓库]。

我们欢迎贡献！要贡献代码，请：

1. Fork 本仓库
2. 创建你的功能分支（`git checkout -b feature/amazing-feature`）
3. 提交你的更改（`git commit -m '添加一些惊人的功能'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开一个 Pull Request

请确保你的代码保持 100% 的测试覆盖率，并通过所有现有测试。

## <span id="license">版权协议</span>

[naming-style] 采用 Apache 2.0 许可证。详细信息请查阅 [LICENSE](LICENSE) 文件。

[naming-style]: https://npmjs.com/package/@qubit-ltd/naming-style
[GitHub 仓库]: https://github.com/qubit-ltd/js-naming-style
