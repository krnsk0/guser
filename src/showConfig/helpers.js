const shell = require('shelljs');

const showLocalGitUser = () => {
  const user = shell.exec(`git config --local user.name`, { silent: true })
    .stdout;
  const email = shell.exec(`git config --local user.email`, { silent: true })
    .stdout;
  if (user.startsWith('error')) console.log(`no local user set`);
  else console.log(`local user: ${user}`);

  if (email.startsWith('error')) console.log(`no local email set`);
  else console.log(`local email: ${email}`);
};

module.exports = { showLocalGitUser };
