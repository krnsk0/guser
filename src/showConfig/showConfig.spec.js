const { showConfig } = require('./showConfig');
// let { getLocalGitConfig } = require('./helpers');

jest.mock('./helpers', () => ({
  getLocalGitConfig: jest
    .fn()
    .mockReturnValueOnce({ user: 'test', email: 'test@test.com' })
    .mockReturnValueOnce({ user: '', email: '' }),
}));

describe('The showConfig function', () => {
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = log;
  });
  it('should log the user and email when present', async () => {
    await showConfig();
    expect(console.log.mock.calls[0][0]).toEqual(
      expect.stringContaining(`test`)
    );
    expect(console.log.mock.calls[1][0]).toEqual(
      expect.stringContaining(`test@test.com`)
    );
  });
  it('should log when user/email not present', async () => {
    await showConfig();
    expect(console.log.mock.calls[0][0]).toEqual(
      expect.stringContaining(`No local user found`)
    );
    expect(console.log.mock.calls[1][0]).toEqual(
      expect.stringContaining(`No local email found`)
    );
  });
});
