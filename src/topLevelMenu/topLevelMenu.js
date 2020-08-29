const prompts = require('prompts');

const setConfig = require('../setConfig');
const unsetConfig = require('../unsetConfig');
const showConfig = require('../showConfig');

const addUser = require('../addUser');
const listUsers = require('../listUsers');
const removeUser = require('../removeUser');

const { loadUserData } = require('../utils/utils');

const {
  topLevelChoiceFactory,
  isWorkingDirAGitRepo,
  bailIfGitNotFound,
} = require('./helpers');

const { SET, UNSET, SHOW, ADD, REMOVE, LIST } = require('./constants');

const topLevelPrompt = () =>
  prompts({
    type: 'select',
    name: 'choice',
    message: 'What would you like to do?',
    hint: '(use arrow keys & enter to select)',
    choices: topLevelChoiceFactory({
      isRepo: isWorkingDirAGitRepo(),
      usersSaved: !!loadUserData().length,
    }),
  });

const choiceHandlers = {
  [SET]: setConfig,
  [UNSET]: unsetConfig,
  [SHOW]: showConfig,
  [ADD]: addUser,
  [REMOVE]: removeUser,
  [LIST]: listUsers,
};

const topLevelMenu = async () =>
  new Promise((resolve, reject) => {
    bailIfGitNotFound();
    topLevelPrompt().then(({ choice }) => {
      if (choice === undefined) {
        return reject(new Error('SIGINT'));
      }
      choiceHandlers[choice]()
        .then(resolve)
        .catch((e) => reject(e));
    });
  });

module.exports = {
  topLevelMenu,
};
