const kleur = require('kleur');
const { unsetLocalGitUser } = require('./helpers');

const unsetConfig = () =>
  new Promise((resolve) => {
    if (unsetLocalGitUser()) {
      console.log(kleur.green(`Local user/email config unset`));
    } else {
      console.log(kleur.red('Could not unset local config'));
    }
    resolve();
  });

module.exports = { unsetConfig };
