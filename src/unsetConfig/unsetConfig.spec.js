const { unsetConfig } = require('./unsetConfig');
const { unsetLocalGitUser } = require('./helpers');
const { UNSET_SUCCESSFUL, UNSET_FAILED } = require('../strings');

jest.mock('./helpers', () => ({
  unsetLocalGitUser: jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false),
}));

describe('The unsetConfig function', () => {
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = log;
  });

  it('should call the unsetLocalConfig helper and log on success', async () => {
    await unsetConfig();
    expect(unsetLocalGitUser).toHaveBeenCalled();
    expect(console.log.mock.calls[0][0]).toEqual(UNSET_SUCCESSFUL);
  });
  it('should call the unsetLocalConfig helper and log on failure', async () => {
    await unsetConfig();
    expect(unsetLocalGitUser).toHaveBeenCalled();
    expect(console.log.mock.calls[0][0]).toEqual(UNSET_FAILED);
  });
});
