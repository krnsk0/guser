const shell = require('shelljs');

const bailIfGitNotFound = () => {
  if (!shell.which('git')) {
    console.log('This script requires git');
    shell.exit(1);
  }
};

module.exports = { bailIfGitNotFound };
