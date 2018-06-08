import printLine from './print-line';

const LogTypes = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
  debug: 'DEBUG',
};

function makeConsoleMock(nativeConsole) {
  const history = [];
  let groupDepth = 0;

  function prefix(str) {
    const underscores = Array(groupDepth)
      .fill('_')
      .join('');
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
    return history.reduce(
      (printedHistory, line) => [printedHistory, printLine(line)].join('\n'),
      ''
    );
  }

  /* istanbul ignore next */
  function print(...args) {
    if (typeof nativeConsole === 'object') {
      nativeConsole.log(...args);
    } else {
      throw new Error(
        [
          '[consolemock]',
          'You called .print without giving makeConsoleMock a native console object:',
          "  import { makeConsoleMock } from 'consolemock';",
          '  console = makeConsoleMock(console);',
        ].join('\n')
      );
    }
  }

  function clearHistory() {
    history.length = 0;
  }

  return {
    group,
    groupEnd,
    print,
    printHistory,
    clearHistory,
    history: () => history,
    log: log.bind(null, LogTypes.log),
    info: log.bind(null, LogTypes.info),
    warn: log.bind(null, LogTypes.warn),
    error: log.bind(null, LogTypes.error),
    debug: log.bind(null, LogTypes.debug),
  };
}

export default makeConsoleMock;
