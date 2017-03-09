const {
  makeConsoleMock,
  printLine,
} = require('../consolemock');

let mock;

beforeEach(() => {
  mock = makeConsoleMock();
});

describe('printLine(line)', () => {
  it('regular line', () => {
    const line = printLine({ LOG: ['hello'] });
    expect(line).toEqual('LOG hello');
  });
  it('line with multiple messages', () => {
    const line = printLine({ LOG: ['hello', 'world'] });
    expect(line).toEqual('LOG hello, world');
  });
  it('indented line', () => {
    const line = printLine({ _LOG: ['hello'] });
    expect(line).toEqual('  LOG hello');
  });
  it('double indented line', () => {
    const line = printLine({ __LOG: ['hello'] });
    expect(line).toEqual('    LOG hello');
  });
  it('pretty prints objects', () => {
    const obj = { hello: 'world' };
    const line = printLine({ LOG: [obj] });
    expect(line).toEqual("LOG {hello: 'world'}");
  });
});

describe('printHistory()', () => {
  it('returns the history as a pretty string', () => {
    mock.log('a message');
    mock.group('a group');
    mock.info('maybe an object?', { a: 'str', b: false, c: [1, 2, 3], d: { a: 'b' } });
    mock.warn('something useful');
    mock.error('something unexpected');
    mock.group('%c a nested group with styling', 'color: #1da1f2; font-weight: bold;');
    mock.log('%c a nested log with styling', 'color: #D63230;');
    mock.groupEnd();
    mock.log('almost done');
    mock.groupEnd();
    mock.info('fin', 'font-weight: bold;');

    expect(mock.printHistory()).toMatchSnapshot();
  });
});
