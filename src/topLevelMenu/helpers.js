const shell = require('shelljs');

const { SET, UNSET, ADD, REMOVE, LIST } = require('../constants');

const { NO_GIT_ERROR, TOP_LEVEL_OPTIONS } = require('../strings');

const topLevelChoiceFactory = ({ isRepo, usersSaved, wasLocalConfigFound }) => {
  const choices = [];

  if (usersSaved && isRepo) {
    choices.push({
      title: TOP_LEVEL_OPTIONS[SET],
      value: SET,
    });
  }

  if (isRepo && wasLocalConfigFound) {
    choices.push({
      title: TOP_LEVEL_OPTIONS[UNSET],
      value: UNSET,
    });
  }

  if (usersSaved) {
    choices.push(
      {
        title: TOP_LEVEL_OPTIONS[REMOVE],
        value: REMOVE,
      },
      {
        title: TOP_LEVEL_OPTIONS[LIST],
        value: LIST,
      }
    );
  }

  choices.push({
    title: TOP_LEVEL_OPTIONS[ADD],
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
    console.log(NO_GIT_ERROR);
    shell.exit(1);
  }
};

module.exports = {
  topLevelChoiceFactory,
  isWorkingDirAGitRepo,
  bailIfGitNotFound,
};
