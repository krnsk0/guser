const { unsetConfig } = require('./unsetConfig');
const { unsetLocalGitUser } = require('../utils/gitUtils');

jest.mock('../utils/gitUtils', () => ({
  unsetLocalGitUser: jest.fn(),
}));

describe('The unsetConfig function', () => {
  it('should call the unsetLocalConfig helper', async () => {
    await unsetConfig();
    expect(unsetLocalGitUser).toHaveBeenCalled();
  });
});
