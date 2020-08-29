const { setConfig } = require('./setConfig');
const { setLocalGitUser } = require('../utils/gitUtils');
const prompts = require('prompts');

jest.mock('../utils/fileUtils', () => ({
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
}));

jest.mock('../utils/gitUtils', () => ({
  setLocalGitUser: jest.fn(),
}));

describe('The setConfig function', () => {
  it('should display a prompt and pass the user/email of the selected user to the setLocalGitUser function', async () => {
    prompts.inject('Zl0YIYORhnHCFLIxhqCY2YgQA1M=');
    await setConfig();

    expect(setLocalGitUser.mock.calls[0]).toEqual(['test2', 'test2@test2.com']);
  });

  it('should eventually throw when the user exists the prompt', async () => {
    prompts.inject([undefined]);
    expect.assertions(1);
    return setConfig().catch((e) =>
      expect(e).toStrictEqual(new Error('SIGINT'))
    );
  });
});
