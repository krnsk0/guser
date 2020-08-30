const shell = require('shelljs');
const {
  topLevelChoiceFactory,
  isWorkingDirAGitRepo,
  bailIfGitNotFound,
} = require('./helpers');

describe('The topLevelChoiceFactory function', () => {
  it('should return the right choices when in a repo, when users are saved, when local config is present', () => {
    expect(
      topLevelChoiceFactory({
        isRepo: true,
        usersSaved: true,
        wasLocalConfigFound: true,
      })
    ).toEqual([
      {
        title: 'Set local git user config',
        value: 'set',
      },
      {
        title: 'Unset local git user config',
        value: 'unset',
      },
      {
        title: 'Remove user config from guser',
        value: 'remove',
      },
      {
        title: 'List configs in guser',
        value: 'list',
      },
      {
        title: 'Add user config to guser',
        value: 'add',
      },
    ]);
  });

  it('should return the right choices when not in a repo and no users are saved', () => {
    expect(
      topLevelChoiceFactory({
        isRepo: false,
        usersSaved: false,
        wasLocalConfigFound: false,
      })
    ).toEqual([
      {
        title: 'Add user config to guser',
        value: 'add',
      },
    ]);
  });
});

describe('The isWorkingDirAGitRepo function', () => {
  const exec = shell.exec;

  afterEach(() => {
    shell.exec = exec;
  });

  it('should shell out and return false when the shell command fails', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 1,
    }));
    expect(isWorkingDirAGitRepo()).toBe(false);
  });

  it('should shell out and return true when the shell command fails', () => {
    shell.exec = jest.fn().mockImplementation(() => ({
      code: 0,
    }));
    expect(isWorkingDirAGitRepo()).toBe(true);
  });
});

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
