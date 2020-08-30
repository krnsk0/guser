const shell = require('shelljs');
const { getLocalGitConfig } = require('./helpers');

describe('The getLocalGitConfig function', () => {
  const exec = shell.exec;

  afterEach(() => {
    shell.exec = exec;
  });

  it('should return the user and email when present', () => {
    shell.exec = jest.fn().mockImplementation((command) => ({
      stdout: command.includes('user.name') ? 'test' : 'test@test.com',
      code: 0,
    }));

    expect(getLocalGitConfig()).toEqual({
      user: 'test',
      email: 'test@test.com',
    });

    expect(shell.exec.mock.calls[0][0]).toBe(`git config --local user.name`);
    expect(shell.exec.mock.calls[1][0]).toBe(`git config --local user.email`);
  });

  it('should return empty strings when either email or username is not present', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      stdout: 'error: key does not contain...',
      code: 0,
    }));

    expect(getLocalGitConfig()).toEqual({ user: '', email: '' });
    expect(shell.exec.mock.calls[0][0]).toBe(`git config --local user.name`);
    expect(shell.exec.mock.calls[1][0]).toBe(`git config --local user.email`);
  });
});
