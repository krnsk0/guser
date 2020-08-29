const shell = require('shelljs');
const { SET, UNSET, SHOW, ADD, REMOVE, LIST } = require('./topLevelMenu');

const topLevelChoiceFactory = ({ isRepo, usersSaved }) => {
  const choices = [];

  if (usersSaved && isRepo) {
    choices.push({
      title: 'Set local git user config',
      value: SET,
    });
  }

  if (isRepo) {
    choices.push(
      {
        title: 'Show local git user config',
        value: SHOW,
      },
      {
        title: 'Unset local git user config',
        value: UNSET,
      }
    );
  }

  if (usersSaved) {
    choices.push(
      {
        title: 'Remove user config from guser',
        value: REMOVE,
      },
      {
        title: 'List configs in guser',
        value: LIST,
      }
    );
  }

  choices.push({
    title: 'Add user config to guser',
    value: ADD,
  });

  return choices;
};

const isWorkingDirAGitRepo = () => {
  const { code } = shell.exec(`git status`, { silent: true });
  return !code;
};

const bailIfGitNotFound = () => {
  if (!shell.which('git')) {
    console.log('This script requires git');
    shell.exit(1);
  }
};

module.exports = {
  topLevelChoiceFactory,
  isWorkingDirAGitRepo,
  bailIfGitNotFound,
};
