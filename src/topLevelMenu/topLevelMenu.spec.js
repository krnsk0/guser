const {
  topLevelMenu,
  SET,
  UNSET,
  SHOW,
  ADD,
  REMOVE,
  LIST,
} = require('./topLevelMenu');

const { addUser, setSimulateSigint } = require('../addUser/addUser');
const { listUsers } = require('../listUsers/listUsers');
const { removeUser } = require('../removeUser/removeUser');
const { setConfig } = require('../setConfig/setConfig');
const { showConfig } = require('../showConfig/showConfig');
const { unsetConfig } = require('../unsetConfig/unsetConfig');

jest.mock('./helpers', () => ({
  topLevelChoiceFactory: () => [
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
  ],
  isWorkingDirAGitRepo: () => true,
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
jest.mock('../showConfig/showConfig', () => ({
  showConfig: jest.fn().mockImplementation(() => Promise.resolve()),
}));
jest.mock('../unsetConfig/unsetConfig', () => ({
  unsetConfig: jest.fn().mockImplementation(() => Promise.resolve()),
}));

const prompts = require('prompts');

describe('The topLevelMenu fucntion', () => {
  it('should eventually throw when passed an undefined choice', async () => {
    prompts.inject([undefined]);
    expect.assertions(1);
    return topLevelMenu().catch((e) =>
      expect(e).toStrictEqual(new Error('SIGINT'))
    );
  });

  it('should call all helpers when their corresponding options are selected', async () => {
    prompts.inject([ADD, LIST, REMOVE, SET, SHOW, UNSET]);
    await topLevelMenu();
    expect(addUser).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(listUsers).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(removeUser).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(setConfig).toHaveBeenCalledTimes(1);
    await topLevelMenu();
    expect(showConfig).toHaveBeenCalledTimes(1);
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
