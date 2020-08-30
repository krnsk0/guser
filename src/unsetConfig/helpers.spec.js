const shell = require('shelljs');
const { unsetLocalGitUser } = require('./helpers');

describe('The unsetLocalGitUser function', () => {
  const exec = shell.exec;

  afterEach(() => {
    shell.exec = exec;
  });

  it('should call exec to unset the user and return true when successful', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 0,
    }));

    expect(unsetLocalGitUser()).toBe(true);

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config --unset user.name && git config --unset user.email`
    );
  });

  it('should call exec to set the user and return false on failure', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 1,
    }));

    expect(unsetLocalGitUser()).toBe(false);

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config --unset user.name && git config --unset user.email`
    );
  });
});
