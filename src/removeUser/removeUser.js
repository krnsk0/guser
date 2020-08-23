const kleur = require('kleur');
const prompts = require('prompts');
const {
  loadUserData,
  removeUserByHash,
  makeChoicesFromUsers,
} = require('../utils');

const removeUserPrompt = (userData) =>
  prompts(
    {
      type: 'select',
      name: 'selectedUserData',
      message: 'Which user should be removed from guser?',
      hint: '(use arrow keys & enter to select)',
      choices: makeChoicesFromUsers(userData),
    },
    {}
  );

const removeUser = () =>
  new Promise((resolve, reject) => {
    removeUserPrompt(loadUserData()).then(({ selectedUserData }) => {
      if (selectedUserData === undefined) {
        return reject(new Error('SIGINT'));
      }
      const { hash, username, email } = selectedUserData;
      removeUserByHash(hash);
      console.log(
        kleur.green(`Removing user: `) + username + kleur.green(', ') + email
      );
    });
  });

module.exports = { removeUser };
