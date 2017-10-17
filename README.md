<p align="center">
  <a href="https://github.com/ttmarek/consolemock">
    <img alt="consolemock" src="https://raw.githubusercontent.com/ttmarek/consolemock/master/logo/logo.png" width="500">
  </a>
</p>

<p align="center">
  <i>A tool for testing console logs</i>
</p>

<p align="center">
  <a href="https://www.codacy.com/app/ttmarek/consolemock/dashboard"><img src="https://img.shields.io/codacy/grade/f9594cea653f45d8992bedc95999ed99.svg"></a>
  <a href="https://www.npmjs.com/package/consolemock"><img src="https://img.shields.io/npm/v/consolemock.svg"></a>
  <a href="https://github.com/ttmarek/consolemock/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ttmarek/consolemock.svg"></a>
</p>

## Installation

with yarn
```
yarn add --dev consolemock
```

or with npm
```
npm install --save-dev consolemock
```

## API

```js
import makeConsoleMock from 'consolemock';

console = makeConsoleMock();
```

```js
console.log('a message');
console.group('a group');
console.info('maybe an object?', { a: 'str', b: false, c: [1, 2, 3], d: { a: 'b' } });
console.warn('something useful');
console.error('something unexpected');
console.group('%c a nested group with styling', 'color: #1da1f2; font-weight: bold;');
console.log('%c a nested log with styling', 'color: #D63230;');
console.groupEnd();
console.log('almost done');
console.groupEnd();
console.info('%c fin', 'font-weight: bold;');
```

### &#x21b3; `console.history();`

```js
[
  { LOG: ['a message'] },
  { GROUP: ['a group'] },
  { _INFO: ['maybe an object?', { a: 'str', b: false, c: [1, 2, 3], d: { a: 'b' } }] },
  { _WARN: ['something useful'] },
  { _ERROR: ['something unexpected'] },
  { _GROUP: ['%c a nested group with styling', 'color: #1da1f2; font-weight: bold;'] },
  { __LOG: ['%c a nested log with styling', 'color: #D63230;'] },
  { _LOG: ['almost done'] },
  { INFO: ['%c fin', 'font-weight: bold;'] }
]
```

### &#x21b3; `console.printHistory();`

```
"LOG a message
GROUP a group
  INFO maybe an object?, {a: 'str', b: false, c: [1, 2, 3], d: {a: 'b'}}
  WARN something useful
  ERROR something unexpected
  GROUP %c a nested group with styling, color: #1da1f2; font-weight: bold;
    LOG %c a nested log with styling, color: #D63230;
  LOG almost done
INFO %c fin, font-weight: bold;"
```

### &#x21b3; `console.clearHistory()`

```js
console.log('hello');
console.log('world');

console.clearHistory();

console.log('apple');

console.history() // returns [{ LOG: ['apple'] }]
```

### &#x21b3; `console.print(message, [message1, ..., messageN])`

Logs messages to the console when debugging. Provide `makeConsoleMock` with the
native `console` object when creating the mock:

```js
import makeConsoleMock from 'consolemock';

console = makeConsoleMock(console);
```

## Uses

### &#x1f5f2; Use `consolemock` With Snapshot Testing

The output of `printHistory` works great with
[Jest's snapshot testing](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).
Create the mock console, log a few messages, then save the output of
`printHistory` as a snapshot.

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/7446702/24484314/93995c3a-14cb-11e7-9075-563d6e200a92.png" width="650">
</p>
