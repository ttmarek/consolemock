import makeConsoleMock from '../consolemock';

describe('print(message, [message1, ..., messageN])', () => {
  test('calling .print incorrectly throws a helpful error message', () => {
    const mock = makeConsoleMock();
    const callPrintIncorrectly = () => {
      mock.print();
    };

    expect(callPrintIncorrectly).toThrowErrorMatchingSnapshot();
  });
});
