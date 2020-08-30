const shell = require('shelljs');

const unsetLocalGitUser = () => {
  const command = `git config --unset user.name && git config --unset user.email`;
  const { code } = shell.exec(command);
  return !code;
};

module.exports = {
  unsetLocalGitUser,
};
