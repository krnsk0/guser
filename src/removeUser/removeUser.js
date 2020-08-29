const kleur = require('kleur');
const prompts = require('prompts');
const { loadUserData, removeUserByHash } = require('../utils/utils');
const { makeChoicesFromUsers } = require('../utils/pureUtils');

const removeUserPrompt = (userData) =>
  prompts(
    {
      type: 'select',
      name: 'hash',
      message: 'Which user should be removed from guser?',
      hint: '(use arrow keys & enter to select)',
      choices: makeChoicesFromUsers(userData),
    },
    {}
  );

const removeUser = () =>
  new Promise((resolve, reject) => {
    const userData = loadUserData();
    removeUserPrompt(userData).then(({ hash }) => {
      if (hash === undefined) {
        return reject(new Error('SIGINT'));
      }
      const { username, email } = userData.find((entry) => entry.hash === hash);
      removeUserByHash(hash);
      console.log(
        kleur.green(`Removing user: `) + username + kleur.green(', ') + email
      );
      resolve();
    });
  });

module.exports = { removeUser };
