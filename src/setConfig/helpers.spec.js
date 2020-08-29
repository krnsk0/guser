const shell = require('shelljs');
const { setLocalGitUser } = require('./helpers');

describe('The setLocalGitUser function', () => {
  const exec = shell.exec;
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    shell.exec = exec;
    console.log = log;
  });

  it('should call exec to set the user and log when successful', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 0,
    }));

    const user = 'test';
    const email = 'test@test.com';

    setLocalGitUser(user, email);

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config user.name "test" && git config user.email "test@test.com"`
    );
    expect(console.log.mock.calls[0][0]).toBe(
      `guser set local config to test, test@test.com`
    );
  });

  it('should call exec to set the user and log on failure', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 1,
    }));

    const user = 'test';
    const email = 'test@test.com';

    setLocalGitUser(user, email);

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config user.name "test" && git config user.email "test@test.com"`
    );
    expect(console.log.mock.calls[0][0]).toBe(
      `guser could not set local config`
    );
  });
});
