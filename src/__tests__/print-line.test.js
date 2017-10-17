import printLine from '../print-line';

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
