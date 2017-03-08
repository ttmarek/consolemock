const { makeConsoleMock } = require('../index');

let mock;

beforeEach(() => {
  mock = makeConsoleMock();
});

describe('HISTORY', () => {
  it('returns an empty object when there is no history', () => {
    expect(mock.history()).toEqual({});
  });
});

['LOG', 'INFO', 'WARN', 'ERROR'].forEach((logType) => {
  describe(logType, () => {
    describe('(msg [, subst1, ..., substN])', () => {
      it('records single messages', () => {
        mock[logType.toLowerCase()]('hello');
        expect(mock.history()).toEqual({
          [logType]: ['hello'],
        });
      });
      it('records multiple messages', () => {
        mock[logType.toLowerCase()]('hello', 'world');
        expect(mock.history()).toEqual({
          [logType]: ['hello', 'world'],
        });
      });
    });

    describe('(obj1 [, obj2, ..., objN])', () => {
      it('records single objects', () => {
        mock[logType.toLowerCase()]({ hello: 'world' });
        expect(mock.history()).toEqual({
          [logType]: [{ hello: 'world' }],
        });
      });
      it('records multiple objects', () => {
        mock[logType.toLowerCase()]({ hello: 'world' }, { hello: 'planet' });
        expect(mock.history()).toEqual({
          [logType]: [{ hello: 'world' }, { hello: 'planet' }],
        });
      });
    });

    describe('(msg, obj)', () => {
      it('records a mix of objects and strings', () => {
        mock[logType.toLowerCase()]('hello world', { hello: 'world' });
        expect(mock.history()).toEqual({
          [logType]: ['hello world', { hello: 'world' }],
        });
      });
    });
  });
});

describe('MULTILINE', () => {
  it('records each message', () => {
    mock.log('hello world');
    mock.info('it is big');
    mock.warn('humans live here');
    mock.error('war');
    expect(mock.history()).toEqual({
      LOG: ['hello world'],
      INFO: ['it is big'],
      WARN: ['humans live here'],
      ERROR: ['war'],
    });
  });
});

describe('GROUP', () => {
  it('records a group title', () => {
    mock.group('some group');
    expect(mock.history()).toEqual({
      GROUP: {
        title: ['some group'],
      },
    });
  });
  it('records multiple title messages', () => {
    mock.group('some group', 'color: red;');
    expect(mock.history()).toEqual({
      GROUP: {
        title: ['some group', 'color: red;'],
      },
    });
  });
  it('records logs nested under the group (w/o groupEnd)', () => {
    mock.group('title');
    mock.log('something');
    mock.info('something', 'else');
    expect(mock.history()).toEqual({
      GROUP: {
        title: ['title'],
        LOG: ['something'],
        INFO: ['something', 'else'],
      },
    });
  });
  it('records logs nested under the group (with groupEnd)', () => {
    mock.group('title');
    mock.log('something');
    mock.info('something', 'else');
    mock.groupEnd();
    expect(mock.history()).toEqual({
      GROUP: {
        title: ['title'],
        LOG: ['something'],
        INFO: ['something', 'else'],
      },
    });
  });
  it('records logs before and after a group', () => {
    mock.log('before');
    mock.group('title');
    mock.log('something');
    mock.info('something', 'else');
    mock.groupEnd();
    mock.error('after');
    expect(mock.history()).toEqual({
      LOG: ['before'],
      GROUP: {
        title: ['title'],
        LOG: ['something'],
        INFO: ['something', 'else'],
      },
      ERROR: ['after'],
    });
  });
  it('records nested groups (w/o groupEnd)', () => {
    mock.group('title');
    mock.log('something');
    mock.group('sub title');
    mock.info('something interesting');
    mock.error('something dangerous');
    expect(mock.history()).toEqual({
      GROUP: {
        title: ['title'],
        LOG: ['something'],
        GROUP: {
          title: ['sub title'],
          INFO: ['something interesting'],
          ERROR: ['something dangerous'],
        },
      },
    });
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
    expect(mock.history()).toEqual({
      GROUP: {
        title: ['title'],
        LOG: ['something'],
        GROUP: {
          title: ['sub title'],
          INFO: ['something interesting'],
          ERROR: ['something dangerous'],
        },
      },
      LOG: ['this is going to be hard to implement'],
    });
  });
});
