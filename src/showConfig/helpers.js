const shell = require('shelljs');

const getLocalGitConfig = () => {
  const user = shell.exec(`git config --local user.name`, { silent: true })
    .stdout;
  const email = shell.exec(`git config --local user.email`, { silent: true })
    .stdout;

  return {
    user: user.startsWith('error') || !user ? '' : user,
    email: email.startsWith('error') || !email ? '' : email,
  };
};

module.exports = { getLocalGitConfig };
