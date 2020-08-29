const { showLocalGitUser } = require('../utils/gitUtils');

const showConfig = () =>
  new Promise((resolve) => {
    showLocalGitUser();
    resolve();
  });

module.exports = { showConfig };
