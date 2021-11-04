[![Typescript](https://img.shields.io/static/v1?label=&message=typescript&color=white&style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Standard Code Style](https://img.shields.io/static/v1?label=code%20style&message=standard&color=yellow&style=flat)](https://standardjs.com)
[![GitHub](https://img.shields.io/github/license/arvinall/reverse-char-id)](https://github.com/arvinall/reverse-char-id/blob/main/LICENSE)

[![GitHub package.json version](https://img.shields.io/github/package-json/v/arvinall/reverse-char-id?logo=github)](https://github.com/arvinall/reverse-char-id/releases)
[![npm](https://img.shields.io/npm/v/reverse-char-id?logo=npm)](https://www.npmjs.com/package/reverse-char-id)
![npm bundle size](https://img.shields.io/bundlephobia/min/reverse-char-id)
![npm](https://img.shields.io/npm/dt/reverse-char-id)

![GitHub issues](https://img.shields.io/github/issues-raw/arvinall/reverse-char-id)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/arvinall/reverse-char-id)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/arvinall/reverse-char-id)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/arvinall/reverse-char-id)

# Reverse Char ID
[![API Reference](https://img.shields.io/static/v1?label=&message=API%20Reference&color=grey&style=flat)](https://github.com/arvinall/reverse-char-id/wiki/index)

> Reverse character ID is a sequential and predictable ID generator with its specific algorithm.

## Table of Contents
* [Examples](#examples)
* [Usage](#usage)
  * [Install](#install)
  * [Example](#example)
* [License](#license)
* [Author](#author)

## Examples
|char |  0  | to  |  9  |  .  |char |  a  | to  |  z  |  .  |char |  z  | to  |  x  |
|  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |
|     |     |     |     |  .  |     |     |     |     |  .  |     |     |     |     |
|  0  |  1  |  2  |  3  |  .  |  a  |  b  |  c  |  d  |  .  |  z  |  y  |  x  |  zz |
|  4  |  5  |  6  |  7  |  .  |  e  |  f  |  g  |  h  |  .  |  zy |  zx |  yz |  yy |
|  8  |  9  |  00 |  01 |  .  |  i  |  j  |  k  |  l  |  .  |  yx |  xz |  xy |  xx |
|  02 |  03 |  04 |  05 |  .  |  m  |  n  |  o  |  p  |  .  |  zzz|  zzy|  zzx|  zyz|

|char |  9  | to  |  7  |  .  |chars|7 > 9| to  |a > c|  .  |char |c > a| to  |9 > 7|
|  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |
|     |     |     |     |  .  |     |     |     |     |  .  |     |     |     |     |
|  9  |  8  |  7  |  99 |  .  |  7  |  8  |  9  |  a  |  .  |  c  |  b  |  a  |  9  |
|  98 |  97 |  89 |  88 |  .  |  b  |  c  | 77  |  78 |  .  |  8  |  7  |  cc |  cb |
|  87 |  79 |  78 |  77 |  .  |  79 |  7a |  7b |  7c |  .  |  ca |  c9 |  c8 |  c7 |
|  999|  998|  997|  989|  .  |  87 |  88 |  89 |  8a |  .  |  bc |  bb |  ba |  b9 |

## Usage
> [Visit complete API reference](https://github.com/arvinall/reverse-char-id/wiki/index)

> *This package export its API over CommonJS pattern.

### Install
```shell
$ npm install reverse-char-id
```

### Example
```typescript
// Import with bundler ...
import {
  REVERSED_PREDEFINED_RANGES,
  PREDEFINED_RANGES,

  ReverseCharID
} from 'reverse-char-id'

// OR

// Import without bundler
const {
  REVERSED_PREDEFINED_RANGES,
  PREDEFINED_RANGES,

  ReverseCharID
} = require('reverse-char-id')
```

```javascript
const reverseCharID = new ReverseCharID() // Default character range: 0 to 9

console.log(
  `${reverseCharID}`,
  reverseCharID.toString(),
  reverseCharID.toValue(),
  String(reverseCharID)
) // 0 1 2 3
```

```javascript
const reverseCharID = new ReverseCharID({
  ranges: [
    REVERSED_PREDEFINED_RANGES['z to a'],
    PREDEFINED_RANGES['0 to 9']
  ],
  lastID: 'c'
})

console.log(
  `${reverseCharID}`,
  reverseCharID.toString(),
  reverseCharID.toValue(),
  String(reverseCharID)
) // b a 0 1
```

## License
[MIT License](https://github.com/arvinall/reverse-char-id/blob/main/LICENSE)

## Author
[Arvin Ladan (arvinall)](https://github.com/arvinall)
