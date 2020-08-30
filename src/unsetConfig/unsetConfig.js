const kleur = require('kleur');
const { unsetLocalGitUser } = require('./helpers');

const unsetConfig = () =>
  new Promise((resolve) => {
    if (unsetLocalGitUser()) {
      console.log(kleur.green(`guser unset local config`));
    } else {
      console.log(kleur.red('guser could not unset local config'));
    }
    resolve();
  });

module.exports = { unsetConfig };
