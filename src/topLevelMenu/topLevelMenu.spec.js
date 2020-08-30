const { topLevelMenu } = require('./topLevelMenu');

const { SET, UNSET, ADD, REMOVE, LIST } = require('./constants');

const { addUser, setSimulateSigint } = require('../addUser/addUser');
const { listUsers } = require('../listUsers/listUsers');
const { removeUser } = require('../removeUser/removeUser');
const { setConfig } = require('../setConfig/setConfig');
const { unsetConfig } = require('../unsetConfig/unsetConfig');

jest.mock('../utils', () => ({
  getLocalGitConfig: jest
    .fn()
    .mockImplementationOnce(() => ({ user: 'test', email: 'test@test.com' }))
    .mockImplementation(() => ({ user: false, email: false })),
  loadUserData: jest.fn().mockImplementation(() => ({ length: 5 })),
}));

jest.mock('./helpers', () => ({
  topLevelChoiceFactory: () => [
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
  ],
  isWorkingDirAGitRepo: jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValue(true),
  bailIfGitNotFound: () => null,
}));

jest.mock('../addUser/addUser', () => {
  let simulateSigint = false;
  return {
    addUser: jest
      .fn()
      // only need to do this for one function to get coverage of this case
      .mockImplementation(() =>
        simulateSigint ? Promise.reject(new Error('SIGINT')) : Promise.resolve()
      ),
    setSimulateSigint: (value) => (simulateSigint = value),
  };
});
jest.mock('../listUsers/listUsers', () => ({
  listUsers: jest.fn().mockImplementation(() => Promise.resolve()),
}));
jest.mock('../removeUser/removeUser', () => ({
  removeUser: jest.fn().mockImplementation(() => Promise.resolve()),
}));
jest.mock('../setConfig/setConfig', () => ({
  setConfig: jest.fn().mockImplementation(() => Promise.resolve()),
}));
jest.mock('../unsetConfig/unsetConfig', () => ({
  unsetConfig: jest.fn().mockImplementation(() => Promise.resolve()),
}));

const prompts = require('prompts');

describe('The topLevelMenu fucntion', () => {
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = log;
  });

  it('should eventually throw when passed an undefined choice, but not before logging the user and email', async () => {
    prompts.inject([undefined]);
    expect.hasAssertions();
    return topLevelMenu().catch((e) => {
      expect(e).toStrictEqual(new Error('SIGINT'));
      expect(console.log.mock.calls[1][0]).toEqual(
        expect.stringContaining(`test`)
      );
      expect(console.log.mock.calls[2][0]).toEqual(
        expect.stringContaining(`test@test.com`)
      );
    });
  });

  it('should not log anything about the local config when not in a repo', () => {
    expect(console.log.mock.calls.length).toBe(0);
  });

  it('should call all helpers when their corresponding options are selected', async () => {
    prompts.inject([ADD, LIST, REMOVE, SET, UNSET]);
    await topLevelMenu();
    expect(addUser).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(listUsers).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(removeUser).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(setConfig).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(unsetConfig).toHaveBeenCalledTimes(1);
  });

  it('should handle a SIGINT in a submenu, passing the failure upwards', async () => {
    prompts.inject([ADD]);
    setSimulateSigint(true);
    return topLevelMenu().catch((e) =>
      expect(e).toStrictEqual(new Error('SIGINT'))
    );
  });
});
