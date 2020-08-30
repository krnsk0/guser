const prompts = require('prompts');
const kleur = require('kleur');

const setConfig = require('../setConfig');
const unsetConfig = require('../unsetConfig');

const addUser = require('../addUser');
const listUsers = require('../listUsers');
const removeUser = require('../removeUser');

const { loadUserData, getLocalGitConfig } = require('../utils');

const {
  topLevelChoiceFactory,
  isWorkingDirAGitRepo,
  bailIfGitNotFound,
} = require('./helpers');

const { SET, UNSET, ADD, REMOVE, LIST } = require('./constants');

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
  [ADD]: addUser,
  [REMOVE]: removeUser,
  [LIST]: listUsers,
};

const topLevelMenu = async () =>
  new Promise((resolve, reject) => {
    bailIfGitNotFound();

    console.log(kleur.white().bold('Checking for local git config...'));
    const { user, email } = getLocalGitConfig();
    if (!user) console.log(kleur.green(`No local git user set`));
    else console.log(`${kleur.green(`Local git user`)}: ${user}`);
    if (!email) console.log(kleur.green(`No local git email set`));
    else console.log(`${kleur.green(`Local git email`)}: ${email}`);

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
