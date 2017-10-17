const { makeConsoleMock } = require('../consolemock');


describe('clearHistory()', () => {
  it('clears the mock console history', () => {
    const mock = makeConsoleMock();

    mock.log('hello');
    mock.log('world');
    mock.info('it is...');
    mock.info('pretty BIG!');
    mock.warn('humans live here');
    mock.error('and there is war');

    mock.clearHistory();

    mock.log('hello');

    expect(mock.history()).toEqual([{ LOG: ['hello'] }]);
  });
});
