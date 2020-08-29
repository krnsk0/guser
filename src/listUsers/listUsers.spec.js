const { listUsers } = require('./listUsers');

jest.mock('../utils/utils', () => {
  return {
    loadUserData: () => [
      { username: 'abcdefg', email: 'abc@def.com', paddedUsername: 'abcdefg' },
      {
        username: 'aaa',
        email: 'aaa@aaa.com',
        paddedUsername: 'aaa    ',
      },
    ],
  };
});

describe('The listUsers function', () => {
  const consoleLog = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = consoleLog;
  });

  it('logs out data that matches a snapshot', () => {
    listUsers();
    expect(console.log.mock.calls[0]).toEqual(['abcdefg  abc@def.com']);
    expect(console.log.mock.calls[1]).toEqual(['aaa      aaa@aaa.com']);
  });
});
