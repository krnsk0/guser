const kleur = require('kleur');
const { getLocalGitConfig } = require('./helpers');

const showConfig = () =>
  new Promise((resolve) => {
    const { user, email } = getLocalGitConfig();
    if (user) console.log(`${kleur.green(`Local user`)}: ${user.trim()}`);
    else console.log(kleur.red(`No local user found`));
    if (email) console.log(`${kleur.green(`Local email`)}: ${email.trim()}`);
    else console.log(kleur.red(`No local email found`));
    resolve();
  });

module.exports = { showConfig };
