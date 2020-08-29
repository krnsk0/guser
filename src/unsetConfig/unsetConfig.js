const { unsetLocalGitUser } = require('./helpers');

const unsetConfig = () =>
  new Promise((resolve) => {
    unsetLocalGitUser();
    resolve();
  });

module.exports = { unsetConfig };
