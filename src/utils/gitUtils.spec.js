const shell = require('shelljs');
const {
  bailIfGitNotFound,
  setLocalGitUser,
  unsetLocalGitUser,
  showLocalGitUser,
} = require('./gitUtils');

describe('The bailIfGitNotFound function', () => {
  const which = shell.which;
  const exit = shell.exit;
  const log = console.log;
  beforeEach(() => {
    shell.exit = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    shell.which = which;
    shell.exit = exit;
    console.log = log;
  });

  it('should not call console.log or exit when git is present', () => {
    shell.which = jest.fn().mockImplementation(() => true);

    bailIfGitNotFound();

    expect(shell.exit.mock.calls.length).toBe(0);
    expect(console.log.mock.calls.length).toBe(0);
  });
  it('should call console.log and exit when git is present', () => {
    shell.which = jest.fn().mockImplementation(() => false);

    bailIfGitNotFound();

    expect(shell.exit.mock.calls.length).toBe(1);
    expect(console.log.mock.calls.length).toBe(1);
  });
});

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
