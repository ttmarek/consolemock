const LogTypes = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

function makeConsoleMock() {
  let history = {};

  function log(logType, ...msgs) {
    history = Object.assign({}, history, { [logType]: msgs });
  }

  return {
    log: log.bind(null, LogTypes.log),
    info: log.bind(null, LogTypes.info),
    warn: log.bind(null, LogTypes.warn),
    error: log.bind(null, LogTypes.error),
    group: () => {},
    groupEnd: () => {},
    history: () => history,
  };
}

module.exports = {
  makeConsoleMock,
};
