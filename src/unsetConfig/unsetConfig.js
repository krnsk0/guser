const { unsetLocalGitUser } = require('./helpers');
const { UNSET_SUCCESSFUL, UNSET_FAILED } = require('../strings');

const unsetConfig = () =>
  new Promise((resolve) => {
    if (unsetLocalGitUser()) {
      console.log(UNSET_SUCCESSFUL);
    } else {
      console.log(UNSET_FAILED);
    }
    resolve();
  });

module.exports = { unsetConfig };
