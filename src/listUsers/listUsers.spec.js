const { getLongestUsernameLength, listUsers } = require('./listUsers');
const file = require('../utils/jsonFile');

describe('The getLongestUsernameLengh function', () => {
  it('should return the length of the longest username', () => {
    const testData = [
      { username: '12345', email: 'a@b.com' },
      { username: '1234', email: 'a@b.com' },
      { username: '123', email: 'a@b.com' },
    ];

    expect(getLongestUsernameLength(testData)).toStrictEqual(5);
  });

  it('should handle an empty array', () => {
    const testData = [];
    expect(getLongestUsernameLength(testData)).toStrictEqual(0);
  });
});

describe.only('The listUsers function', () => {
  const fileGet = file.get();
  const consoleLog = console.log;
  beforeEach(() => {
    file.get = jest.fn().mockImplementation(() => ({
      '9YEyhiVx/8iox+zODlakpPCwehg=': {
        username: 'abcdefg',
        email: 'abc@def.com',
      },
      '0y3f/wnta5PBjxSi3UqaSTfM0FU=': {
        username: 'aasdf',
        email: 'asdf@asdf.com',
      },
    }));
    console.log = jest.fn();
  });
  afterEach(() => {
    file.get = fileGet;
    console.log = consoleLog;
  });

  it('logs out data that matches a snapshot', () => {
    listUsers();
    expect(console.log.mock.calls[0]).toEqual(['abcdefg  abc@def.com']);
  });
});
