const shell = require('shelljs');

const bailIfGitNotFound = () => {
  if (!shell.which('git')) {
    console.log('This script requires git');
    shell.exit(1);
  }
};

const setLocalGitUser = (user, email) => {
  const command = `git config user.name "${user}" && git config user.email "${email}"`;
  if (shell.exec(command).code !== 0) {
    console.log('guser could not set local config');
  } else {
    console.log(`guser set local config to ${user}, ${email}`);
  }
};

const unsetLocalGitUser = () => {
  const command = `git config --unset user.name && git config --unset user.email`;
  if (shell.exec(command).code !== 0) {
    console.log('guser could not unset local config');
  } else {
    console.log(`guser unset local config`);
  }
};

const showLocalGitUser = () => {
  const user = shell.exec(`git config --local user.name`, { silent: true })
    .stdout;
  if (user.startsWith('error')) console.log(`no local user set`);
  else console.log(`local user: ${user}`);
  const email = shell.exec(`git config --local user.email`, { silent: true })
    .stdout;
  if (email.startsWith('error')) console.log(`no local email set`);
  else console.log(`local email: ${email}`);
};

const isWorkingDirAGitRepo = () => {
  const { code } = shell.exec(`git status`);
  return !code;
};

module.exports = {
  bailIfGitNotFound,
  setLocalGitUser,
  unsetLocalGitUser,
  showLocalGitUser,
  isWorkingDirAGitRepo,
};
