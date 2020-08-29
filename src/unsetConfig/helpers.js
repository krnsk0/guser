const shell = require('shelljs');

const unsetLocalGitUser = () => {
  const command = `git config --unset user.name && git config --unset user.email`;
  if (shell.exec(command).code !== 0) {
    console.log('guser could not unset local config');
  } else {
    console.log(`guser unset local config`);
  }
};

module.exports = {
  unsetLocalGitUser,
};
