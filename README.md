<p align="center">
  <a href="https://github.com/ttmarek/consolemock">
    <img alt="consolemock" src="https://raw.githubusercontent.com/ttmarek/consolemock/master/logo/logo.png" width="500">
  </a>
</p>

<p align="center">
A small dev utility for testing console logs
</p>

<p align="center">
  <a href="https://www.codacy.com/app/ttmarek/consolemock/dashboard"><img src="https://img.shields.io/codacy/grade/f9594cea653f45d8992bedc95999ed99.svg"></a>
  <a href="https://circleci.com/gh/ttmarek/consolemock"><img src="https://img.shields.io/circleci/project/github/ttmarek/consolemock.svg"></a>
  <a href="https://www.npmjs.com/package/consolemock"><img src="https://img.shields.io/npm/v/consolemock.svg"></a>
  <a href="https://github.com/ttmarek/consolemock/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ttmarek/consolemock.svg"></a>
</p>

----

## Installation

with yarn
```
yarn add --dev consolemock
```

or with npm
```
npm install --save-dev consolemock
```

### API

```js
import { makeConsoleMock } from 'consolemock';

console = makeConsoleMock();

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

#### &#x21b3; `console.history();`

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

#### &#x21b3; `console.printHistory();`

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

#### &#x21b3; `console.print(message, [message1, ..., messageN])`

Use this to bypass the mock and log messages to the console when debugging. In
order to use this method you **must** provide the `console` object when calling
`makeConsoleMock`:

```js
import { makeConsoleMock } from 'consolemock';

console = makeConsoleMock(console);
```

## **Tip:** Use `consolemock` With Snapshot Testing

The output of `printHistory` works great with
[Jest's snapshot testing](https://facebook.github.io/jest/docs/snapshot-testing.html#content).
Create the mock console, log a few messages, then save the output of
`printHistory` as a snapshot.

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/7446702/24484314/93995c3a-14cb-11e7-9075-563d6e200a92.png" width="650">
</p>
