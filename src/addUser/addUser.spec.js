const { makeUserData, addUser } = require('./addUser');
const file = require('../utils/jsonFile');
const prompts = require('prompts');

describe('The makeUserData function', () => {
  it('should return the right hash for a given username and email', () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    expect(makeUserData(testData)).toStrictEqual([
      '9YEyhiVx/8iox+zODlakpPCwehg=',
      testData,
    ]);
  });

  it('should throw when passed undefined values', () => {
    expect(() =>
      makeUserData({ username: undefined, email: 'abc@def.com' })
    ).toThrow();
    expect(() =>
      makeUserData({ username: 'abcdefg', email: undefined })
    ).toThrow();
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

  it('should eventually make a call to write to the config file', async () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    prompts.inject([testData.username, testData.email]);

    await addUser(testData);
    expect(file.set.mock.calls[0][0]).toStrictEqual(
      '9YEyhiVx/8iox+zODlakpPCwehg='
    );
    expect(file.set.mock.calls[0][1]).toStrictEqual(testData);
  });
});
