const shell = require('shelljs');
const { setLocalGitUser } = require('./helpers');

describe('The setLocalGitUser function', () => {
  const exec = shell.exec;

  afterEach(() => {
    shell.exec = exec;
  });

  it('should call exec to set the user and return true when successful', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 0,
    }));

    const user = 'test';
    const email = 'test@test.com';

    expect(setLocalGitUser(user, email)).toBe(true);

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config user.name "test" && git config user.email "test@test.com"`
    );
  });

  it('should call exec to set the user and return false on failure', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 1,
    }));

    const user = 'test';
    const email = 'test@test.com';

    expect(setLocalGitUser(user, email)).toBe(false);

    expect(shell.exec.mock.calls[0][0]).toBe(
      `git config user.name "test" && git config user.email "test@test.com"`
    );
  });
});
