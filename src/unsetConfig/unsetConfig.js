const { unsetLocalGitUser } = require('../utils/gitUtils');

const unsetConfig = () =>
  new Promise((resolve) => {
    unsetLocalGitUser();
    resolve();
  });

module.exports = { unsetConfig };
