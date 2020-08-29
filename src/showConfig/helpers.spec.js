const shell = require('shelljs');
const { showLocalGitUser } = require('./helpers');

describe('The showLocalGitUser function', () => {
  const exec = shell.exec;
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    shell.exec = exec;
    console.log = log;
  });

  it('should show the user and email when present', () => {
    shell.exec = jest.fn().mockImplementation((command) => ({
      stdout: command.includes('user.name') ? 'test' : 'test@test.com',
      code: 0,
    }));

    showLocalGitUser();

    expect(shell.exec.mock.calls[0][0]).toBe(`git config --local user.name`);
    expect(shell.exec.mock.calls[1][0]).toBe(`git config --local user.email`);
    expect(console.log.mock.calls[0][0]).toBe(`local user: test`);
    expect(console.log.mock.calls[1][0]).toBe(`local email: test@test.com`);
  });

  it('should print errors when local user or email not found', () => {
    shell.exec = jest.fn().mockImplementation((command) => ({
      stdout: 'error: key does not contain...',
      code: 0,
    }));

    showLocalGitUser();

    expect(shell.exec.mock.calls[0][0]).toBe(`git config --local user.name`);
    expect(shell.exec.mock.calls[1][0]).toBe(`git config --local user.email`);
    expect(console.log.mock.calls[0][0]).toBe(`no local user set`);
    expect(console.log.mock.calls[1][0]).toBe(`no local email set`);
  });
});
