const { addUser } = require('./addUser');
const { saveUserData } = require('../utils');
const prompts = require('prompts');

jest.mock('../utils', () => {
  return { saveUserData: jest.fn() };
});

describe('The addUser fucntion', () => {
  const originalLog = console.log;
  beforeEach(() => {
    console.log = () => null;
  });
  afterEach(() => {
    console.log = originalLog;
  });

  it('should eventually make a call to write to the config file when passed good data', async () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    prompts.inject([testData.username, testData.email]);
    await addUser();
    expect(saveUserData.mock.calls[0][0]).toStrictEqual(testData);
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
