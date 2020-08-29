const shell = require('shelljs');

const setLocalGitUser = (user, email) => {
  const command = `git config user.name "${user}" && git config user.email "${email}"`;
  if (shell.exec(command).code !== 0) {
    console.log('guser could not set local config');
  } else {
    console.log(`guser set local config to ${user}, ${email}`);
  }
};

module.exports = {
  setLocalGitUser,
};
