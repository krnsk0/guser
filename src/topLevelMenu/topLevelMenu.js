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

const { SET, UNSET, ADD, REMOVE, LIST } = require('../constants');

const {
  TOP_LEVEL_PROMPT,
  TOP_LEVEL_HINT,
  CHECKING_CONFIG,
  NO_LOCAL_USER,
  NO_LOCAL_EMAIL,
  LOCAL_USER,
  LOCAL_EMAIL,
} = require('../strings');

const topLevelPrompt = ({ localUser, localEmail, isRepo }) =>
  prompts({
    type: 'select',
    name: 'choice',
    message: TOP_LEVEL_PROMPT,
    hint: TOP_LEVEL_HINT,
    choices: topLevelChoiceFactory({
      isRepo,
      usersSaved: !!loadUserData().length,
      wasLocalConfigFound: localUser || localEmail,
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

    const isRepo = isWorkingDirAGitRepo();
    let localUser, localEmail;

    if (isRepo) {
      console.log(kleur.white().bold(CHECKING_CONFIG));

      const { user, email } = getLocalGitConfig();
      localUser = user;
      localEmail = email;

      if (!user) console.log(kleur.green(NO_LOCAL_USER));
      else console.log(LOCAL_USER(user));
      if (!email) console.log(kleur.green(NO_LOCAL_EMAIL));
      else console.log(LOCAL_EMAIL(email));
    }

    topLevelPrompt({ localUser, localEmail, isRepo }).then(({ choice }) => {
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
