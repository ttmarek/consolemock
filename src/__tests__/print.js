const { makeConsoleMock } = require('../consolemock');

describe('PRINT', () => {
  test('calling .print() incorrectly throws a helpful error message', () => {
    const mock = makeConsoleMock();
    const callPrintIncorrectly = () => {
      mock.print();
    };

    expect(callPrintIncorrectly).toThrowErrorMatchingSnapshot();
  });
});
