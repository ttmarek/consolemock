import makeConsoleMock from '../consolemock';

let mock;

beforeEach(() => {
  mock = makeConsoleMock();
});

describe('HISTORY', () => {
  it('returns an empty object when there is no history', () => {
    expect(mock.history()).toEqual([]);
  });
});

['LOG', 'INFO', 'WARN', 'ERROR'].forEach(logType => {
  describe(logType, () => {
    describe('(msg [, subst1, ..., substN])', () => {
      it('records single messages', () => {
        mock[logType.toLowerCase()]('hello');
        expect(mock.history()).toEqual([{ [logType]: ['hello'] }]);
      });

      it('records multiple messages', () => {
        mock[logType.toLowerCase()]('hello', 'world');
        expect(mock.history()).toEqual([{ [logType]: ['hello', 'world'] }]);
      });
    });

    describe('(obj1 [, obj2, ..., objN])', () => {
      it('records single objects', () => {
        mock[logType.toLowerCase()]({ hello: 'world' });
        expect(mock.history()).toEqual([{ [logType]: [{ hello: 'world' }] }]);
      });

      it('records multiple objects', () => {
        mock[logType.toLowerCase()]({ hello: 'world' }, { hello: 'planet' });
        expect(mock.history()).toEqual([
          { [logType]: [{ hello: 'world' }, { hello: 'planet' }] },
        ]);
      });
    });

    describe('(msg, obj)', () => {
      it('records a mix of objects and strings', () => {
        mock[logType.toLowerCase()]('hello world', { hello: 'world' });
        expect(mock.history()).toEqual([
          { [logType]: ['hello world', { hello: 'world' }] },
        ]);
      });
    });
  });
});

describe('MULTILINE', () => {
  it('records each message', () => {
    mock.log('hello');
    mock.log('world');
    mock.info('it is...');
    mock.info('pretty BIG!');
    mock.warn('humans live here');
    mock.error('and there is war');

    expect(mock.history()).toEqual([
      { LOG: ['hello'] },
      { LOG: ['world'] },
      { INFO: ['it is...'] },
      { INFO: ['pretty BIG!'] },
      { WARN: ['humans live here'] },
      { ERROR: ['and there is war'] },
    ]);
  });
});

describe('GROUP', () => {
  it('records a group title', () => {
    mock.group('some group');
    expect(mock.history()).toEqual([{ GROUP: ['some group'] }]);
  });

  it('records multiple title messages', () => {
    mock.group('some group', 'color: red;');
    expect(mock.history()).toEqual([{ GROUP: ['some group', 'color: red;'] }]);
  });

  it('records logs nested under the group (w/o groupEnd)', () => {
    mock.group('title');
    mock.log('something');
    mock.info('something', 'else');

    expect(mock.history()).toEqual([
      { GROUP: ['title'] },
      { _LOG: ['something'] },
      { _INFO: ['something', 'else'] },
    ]);
  });

  it('records logs nested under the group (with groupEnd)', () => {
    mock.group('title');
    mock.log('something');
    mock.info('something', 'else');
    mock.groupEnd();

    expect(mock.history()).toEqual([
      { GROUP: ['title'] },
      { _LOG: ['something'] },
      { _INFO: ['something', 'else'] },
    ]);
  });

  it('records logs before and after a group', () => {
    mock.log('before');
    mock.group('title');
    mock.log('something');
    mock.info('something', 'else');
    mock.groupEnd();
    mock.error('after');

    expect(mock.history()).toEqual([
      { LOG: ['before'] },
      { GROUP: ['title'] },
      { _LOG: ['something'] },
      { _INFO: ['something', 'else'] },
      { ERROR: ['after'] },
    ]);
  });

  it('records nested groups (w/o groupEnd)', () => {
    mock.group('title');
    mock.log('something');
    mock.group('sub title');
    mock.info('something interesting');
    mock.error('something dangerous');

    expect(mock.history()).toEqual([
      { GROUP: ['title'] },
      { _LOG: ['something'] },
      { _GROUP: ['sub title'] },
      { __INFO: ['something interesting'] },
      { __ERROR: ['something dangerous'] },
    ]);
  });

  it('records nested groups (with groupEnd) and logs after the groups', () => {
    mock.group('title');
    mock.log('something');
    mock.group('sub title');
    mock.info('something interesting');
    mock.error('something dangerous');
    mock.groupEnd();
    mock.groupEnd();
    mock.log('this is going to be hard to implement');

    expect(mock.history()).toEqual([
      { GROUP: ['title'] },
      { _LOG: ['something'] },
      { _GROUP: ['sub title'] },
      { __INFO: ['something interesting'] },
      { __ERROR: ['something dangerous'] },
      { LOG: ['this is going to be hard to implement'] },
    ]);
  });

  it('records nested groups (with groupEnd) and logs spread throughout', () => {
    mock.group('title');
    mock.log('something');
    mock.group('sub title');
    mock.info('something interesting');
    mock.error('something dangerous');
    mock.groupEnd();
    mock.log('something else');
    mock.groupEnd();
    mock.log('the end');

    expect(mock.history()).toEqual([
      { GROUP: ['title'] },
      { _LOG: ['something'] },
      { _GROUP: ['sub title'] },
      { __INFO: ['something interesting'] },
      { __ERROR: ['something dangerous'] },
      { _LOG: ['something else'] },
      { LOG: ['the end'] },
    ]);
  });

  it('records groups (with extra groupEnds)', () => {
    mock.group('group one');
    mock.log('something');
    mock.groupEnd();
    mock.groupEnd();
    mock.groupEnd();
    mock.group('group two');
    mock.info('something');
    mock.groupEnd();

    expect(mock.history()).toEqual([
      { GROUP: ['group one'] },
      { _LOG: ['something'] },
      { GROUP: ['group two'] },
      { _INFO: ['something'] },
    ]);
  });
});
