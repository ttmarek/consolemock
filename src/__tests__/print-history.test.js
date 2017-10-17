import makeConsoleMock from '../consolemock';

describe('printHistory()', () => {
  it('returns the history as a pretty string', () => {
    const mock = makeConsoleMock();

    mock.log('a message');
    mock.group('a group');
    mock.info('maybe an object?', {
      a: 'str',
      b: false,
      c: [1, 2, 3],
      d: { a: 'b' },
    });
    mock.warn('something useful');
    mock.error('something unexpected');
    mock.group(
      '%c a nested group with styling',
      'color: #1da1f2; font-weight: bold;'
    );
    mock.log('%c a nested log with styling', 'color: #D63230;');
    mock.groupEnd();
    mock.log('almost done');
    mock.groupEnd();
    mock.info('%c fin', 'font-weight: bold;');

    expect(mock.printHistory()).toMatchSnapshot();
  });
});
