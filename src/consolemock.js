const LogTypes = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

function makeConsoleMock() {
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

  return {
    group,
    groupEnd,
    history: () => history,
    log: log.bind(null, LogTypes.log),
    info: log.bind(null, LogTypes.info),
    warn: log.bind(null, LogTypes.warn),
    error: log.bind(null, LogTypes.error),
  };
}

module.exports = {
  makeConsoleMock,
};
