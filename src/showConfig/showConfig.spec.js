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
    expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(
      `"[32mLocal user[39m: test"`
    );
    expect(console.log.mock.calls[1][0]).toMatchInlineSnapshot(
      `"[32mLocal email[39m: test@test.com"`
    );
  });
  it('should log when user/email not present', async () => {
    await showConfig();
    expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(
      `"[31mNo local user found[39m"`
    );
    expect(console.log.mock.calls[1][0]).toMatchInlineSnapshot(
      `"[31mNo local email found[39m"`
    );
  });
});
