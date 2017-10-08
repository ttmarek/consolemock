const stringifyObject = require('stringify-object');

const LogTypes = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

function printLine(line) {
  const key = Object.keys(line)[0];

  const msgs = line[key].map(msg => (
    typeof msg === 'string' ?
      msg :
      stringifyObject(msg, { indent: '  ', inlineCharacterLimit: 80 })
  )).join(', ');

  const indentedKey = key.split('').map(letter => (letter === '_' ? '  ' : letter)).join('');

  return `${indentedKey} ${msgs}`;
}

function makeConsoleMock(nativeConsole) {
  const history = [];
  let groupDepth = 0;

  function prefix(str) {
    const underscores = Array(groupDepth).fill('_').join('');
    return underscores + str;
  }

  function log(logType, ...msgs) {
    history.push({ [prefix(logType)]: msgs });
  }

  function group(...title) {
    history.push({ [prefix('GROUP')]: title });
    groupDepth += 1;
  }

  function groupEnd() {
    groupDepth = Math.max(0, groupDepth - 1);
  }

  function printHistory() {
    return history.reduce((printedHistory, line) =>
      [printedHistory, printLine(line)].join('\n'), '');
  }

  /* istanbul ignore next */
  function print(...args) {
    if (typeof nativeConsole === 'object') {
      nativeConsole.log(...args);
    }
  }

  return {
    group,
    groupEnd,
    print,
    printHistory,
    history: () => history,
    log: log.bind(null, LogTypes.log),
    info: log.bind(null, LogTypes.info),
    warn: log.bind(null, LogTypes.warn),
    error: log.bind(null, LogTypes.error),
  };
}

module.exports = {
  makeConsoleMock,
  printLine,
};
