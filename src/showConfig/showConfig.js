const { showLocalGitUser } = require('./helpers');

const showConfig = () =>
  new Promise((resolve) => {
    showLocalGitUser();
    resolve();
  });

module.exports = { showConfig };
