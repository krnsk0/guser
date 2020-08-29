const { showConfig } = require('./showConfig');
const { showLocalGitUser } = require('./helpers');

jest.mock('./helpers', () => ({
  showLocalGitUser: jest.fn(),
}));

describe('The showConfig function', () => {
  it('should call the showLocalGitUser helper', async () => {
    await showConfig();
    expect(showLocalGitUser).toHaveBeenCalled();
  });
});
