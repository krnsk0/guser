const { showConfig } = require('./showConfig');
const { showLocalGitUser } = require('../utils/gitUtils');

jest.mock('../utils/gitUtils', () => ({
  showLocalGitUser: jest.fn(),
}));

describe('The showConfig function', () => {
  it('should call the showLocalGitUser helper', async () => {
    await showConfig();
    expect(showLocalGitUser).toHaveBeenCalled();
  });
});
