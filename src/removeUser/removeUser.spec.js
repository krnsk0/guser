const { removeUser } = require('./removeUser');
const { removeUserByHash } = require('../utils/fileUtils');
const prompts = require('prompts');

jest.mock('../utils/fileUtils', () => ({
  removeUserByHash: jest.fn(),
  loadUserData: () => [
    {
      username: 'test',
      paddedUsername: 'test ',
      email: 'test@test.com',
      hash: 'augVvF8rbOCJMOU6rWIbr+CUGac=',
    },
    {
      username: 'test2',
      paddedUsername: 'test2',
      email: 'test2@test2.com',
      hash: 'Zl0YIYORhnHCFLIxhqCY2YgQA1M=',
    },
  ],
  makeChoicesFromUsers: () => [
    {
      title: 'test2 test2@test2.com',
      hash: 'Zl0YIYORhnHCFLIxhqCY2YgQA1M=',
    },
    {
      title: 'test test@test.com',
      hash: 'augVvF8rbOCJMOU6rWIbr+CUGac=',
    },
  ],
}));

jest.mock('../utils/pureUtils', () => ({
  makeChoicesFromUsers: () => [
    {
      title: 'test2 test2@test2.com',
      hash: 'Zl0YIYORhnHCFLIxhqCY2YgQA1M=',
    },
    {
      title: 'test test@test.com',
      hash: 'augVvF8rbOCJMOU6rWIbr+CUGac=',
    },
  ],
}));

describe('The removeUser function', () => {
  const consoleLog = console.log;
  beforeEach(() => {
    console.log = () => null;
  });
  afterEach(() => {
    console.log = consoleLog;
  });

  it('should display a prompt and pass the hash of the selected user to the removeUserByHash function', async () => {
    prompts.inject('Zl0YIYORhnHCFLIxhqCY2YgQA1M=');
    await removeUser();

    expect(removeUserByHash.mock.calls[0][0]).toStrictEqual(
      'Zl0YIYORhnHCFLIxhqCY2YgQA1M='
    );
  });

  it('should eventually throw when the user exists the prompt', async () => {
    prompts.inject([undefined]);
    expect.assertions(1);
    return removeUser().catch((e) =>
      expect(e).toStrictEqual(new Error('SIGINT'))
    );
  });
});
