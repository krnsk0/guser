const { unsetConfig } = require('./unsetConfig');
const { unsetLocalGitUser } = require('./helpers');

jest.mock('./helpers', () => ({
  unsetLocalGitUser: jest.fn(),
}));

describe('The unsetConfig function', () => {
  it('should call the unsetLocalConfig helper', async () => {
    await unsetConfig();
    expect(unsetLocalGitUser).toHaveBeenCalled();
  });
});
