const kleur = require('kleur');
const { unsetLocalGitUser } = require('./helpers');
const { UNSET_SUCCESSFUL, UNSET_FAILED } = require('../strings');

const unsetConfig = () =>
  new Promise((resolve) => {
    if (unsetLocalGitUser()) {
      console.log(kleur.green(UNSET_SUCCESSFUL));
    } else {
      console.log(kleur.red(UNSET_FAILED));
    }
    resolve();
  });

module.exports = { unsetConfig };
