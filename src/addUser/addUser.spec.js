const { makeUserDataHash, addUser } = require('./addUser');
const file = require('../utils/jsonFile');
const prompts = require('prompts');

describe('The makeUserDataHash function', () => {
  it('should return the right hash for a given username and email', () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    expect(makeUserDataHash(testData)).toStrictEqual([
      '9YEyhiVx/8iox+zODlakpPCwehg=',
      testData,
    ]);
  });
});

jest.mock('../utils/jsonFile');

describe('The addUser fucntion', () => {
  const originalSet = file.set;
  const originalLog = console.log;
  beforeEach(() => {
    file.set = jest.fn();
    console.log = () => null;
  });
  afterEach(() => {
    file.set = originalSet;
    console.log = originalLog;
  });

  it('should eventually make a call to write to the config file when passed good data', async () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    prompts.inject([testData.username, testData.email]);

    await addUser();
    expect(file.set.mock.calls[0][0]).toStrictEqual(
      '9YEyhiVx/8iox+zODlakpPCwehg='
    );
    expect(file.set.mock.calls[0][1]).toStrictEqual(testData);
  });

  it('should eventually throw when passed an undefined username', async () => {
    prompts.inject([undefined, 'asdf@asdf.com']);
    expect.assertions(1);
    return addUser().catch((e) => expect(e).toStrictEqual(new Error('SIGINT')));
  });

  it('should eventually throw when passed an undefined email', async () => {
    prompts.inject(['asdf', undefined]);
    expect.assertions(1);
    return addUser().catch((e) => expect(e).toStrictEqual(new Error('SIGINT')));
  });
});
