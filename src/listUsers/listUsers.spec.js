const { listUsers } = require('./listUsers');
const { file } = require('../utils');

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
    expect(console.log.mock.calls[1]).toEqual(['aasdf    asdf@asdf.com']);
  });
});
