const { setConfig } = require('./setConfig');
const { setLocalGitUser } = require('./helpers');
const prompts = require('prompts');

jest.mock('../utils', () => ({
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
  makeChoicesFromUsers: () => (
    {
      title: 'test  test@test.com',
      value: 'augVvF8rbOCJMOU6rWIbr+CUGac=',
    },
    {
      title: 'test2    test2@test2.com',
      value: 'Zl0YIYORhnHCFLIxhqCY2YgQA1M=',
    }
  ),
}));

jest.mock('./helpers', () => ({
  setLocalGitUser: jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false),
}));

describe('The setConfig function', () => {
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = log;
  });

  it('should display a prompt and pass the user/email of the selected user to the setLocalGitUser function, logging on success', async () => {
    prompts.inject('Zl0YIYORhnHCFLIxhqCY2YgQA1M=');
    await setConfig();
    expect(setLocalGitUser.mock.calls[0]).toEqual(['test2', 'test2@test2.com']);
    expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(
      `"[32mguser set local config to[39m: test2, test2@test2.com"`
    );
  });

  it('should display a prompt and pass the user/email of the selected user to the setLocalGitUser function, logging on failure', async () => {
    prompts.inject('Zl0YIYORhnHCFLIxhqCY2YgQA1M=');
    await setConfig();
    expect(setLocalGitUser.mock.calls[0]).toEqual(['test2', 'test2@test2.com']);
    expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(
      `"[31mguser could not set local config[39m"`
    );
  });

  it('should eventually throw when the user exists the prompt', async () => {
    prompts.inject([undefined]);
    expect.assertions(1);
    return setConfig().catch((e) =>
      expect(e).toStrictEqual(new Error('SIGINT'))
    );
  });
});
