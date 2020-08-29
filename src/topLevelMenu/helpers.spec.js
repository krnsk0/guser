const shell = require('shelljs');
const { topLevelChoiceFactory, isWorkingDirAGitRepo } = require('./helpers');

describe('The topLevelChoiceFactory function', () => {
  it('should return the right choices when in a repo and users are saved', () => {
    expect(topLevelChoiceFactory({ isRepo: true, usersSaved: true })).toEqual([
      {
        title: 'Set local git user config',
        value: 'set',
      },
      {
        title: 'Show local git user config',
        value: 'show',
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
    expect(topLevelChoiceFactory({ isRepo: false, usersSaved: false })).toEqual(
      [
        {
          title: 'Add user config to guser',
          value: 'add',
        },
      ]
    );
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
