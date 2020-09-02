const { topLevelMenu } = require('./topLevelMenu');
const helpers = require('./helpers');
const { SET, UNSET, ADD, REMOVE, LIST } = require('../constants');

const { addUser, setSimulateSigint } = require('../addUser/addUser');
const { listUsers } = require('../listUsers/listUsers');
const { removeUser } = require('../removeUser/removeUser');
const { setConfig } = require('../setConfig/setConfig');
const { unsetConfig } = require('../unsetConfig/unsetConfig');

const { TOP_LEVEL_OPTIONS, LOCAL_USER, LOCAL_EMAIL } = require('../strings');

jest.mock('../utils', () => ({
  getLocalGitConfig: jest
    .fn()
    .mockImplementationOnce(() => ({ user: 'test', email: 'test@test.com' }))
    .mockImplementation(() => ({ user: false, email: false })),
  loadUserData: jest.fn().mockImplementation(() => ({ length: 5 })),
}));

jest.mock('./helpers', () => ({
  topLevelChoiceFactory: jest.fn(),
  isWorkingDirAGitRepo: jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValue(true),
  bailIfGitNotFound: () => null,
}));

helpers.topLevelChoiceFactory.mockImplementation(() => [
  {
    title: TOP_LEVEL_OPTIONS[SET],
    value: SET,
  },
  {
    title: TOP_LEVEL_OPTIONS[UNSET],
    value: UNSET,
  },
  {
    title: TOP_LEVEL_OPTIONS[REMOVE],
    value: REMOVE,
  },
  {
    title: TOP_LEVEL_OPTIONS[LIST],
    value: LIST,
  },
  {
    title: TOP_LEVEL_OPTIONS[ADD],
    value: ADD,
  },
]);

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
      expect(console.log.mock.calls[1][0]).toEqual(LOCAL_USER(`test`));
      expect(console.log.mock.calls[2][0]).toEqual(
        LOCAL_EMAIL(`test@test.com`)
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
