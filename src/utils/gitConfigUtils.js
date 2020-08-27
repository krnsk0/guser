const shell = require('shelljs');

const bailIfNoGit = () => {
  if (!shell.which('git')) {
    console.log('This script requires git');
    shell.exit(1);
  }
};

module.exports = { bailIfNoGit };
