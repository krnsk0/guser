const shell = require('shelljs');

const setLocalGitUser = (user, email) => {
  const command = `git config user.name "${user}" && git config user.email "${email}"`;
  const { code } = shell.exec(command);
  return !code;
};

module.exports = {
  setLocalGitUser,
};
