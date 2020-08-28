const shell = require('shelljs');
const { bailIfGitNotFound } = require('./gitUtils');

describe('The bailIfGitNotFound function', () => {
  const which = shell.which;
  const exit = shell.exit;
  const log = console.log;
  beforeEach(() => {
    shell.which = jest.fn();
    shell.exit = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    shell.which = which;
    shell.exit = exit;
    console.log = log;
  });

  it('should not call console.log or exit when git is present', () => {
    shell.which = jest.fn().mockImplementation(() => true);

    bailIfGitNotFound();

    expect(shell.exit.mock.calls.length).toBe(0);
    expect(console.log.mock.calls.length).toBe(0);
  });
  it('should call console.log and exit when git is present', () => {
    shell.which = jest.fn().mockImplementation(() => false);

    bailIfGitNotFound();

    expect(shell.exit.mock.calls.length).toBe(1);
    expect(console.log.mock.calls.length).toBe(1);
  });
});
