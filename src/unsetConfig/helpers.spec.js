const shell = require('shelljs');
const { unsetLocalGitUser } = require('./helpers');

describe('The unsetLocalGitUser function', () => {
  const exec = shell.exec;
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    shell.exec = exec;
    console.log = log;
  });

  it('should call exec to unset the user and log when successful', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 0,
    }));

    unsetLocalGitUser();

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config --unset user.name && git config --unset user.email`
    );
    expect(console.log.mock.calls[0][0]).toBe(`guser unset local config`);
  });

  it('should call exec to set the user and log on failure', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 1,
    }));

    unsetLocalGitUser();

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config --unset user.name && git config --unset user.email`
    );
    expect(console.log.mock.calls[0][0]).toBe(
      `guser could not unset local config`
    );
  });
});
