const kleur = require('kleur');
const prompts = require('prompts');
const file = require('../utils/jsonUtils');

const makeChoicesFromUsers = (userFile) =>
  Object.entries(userFile).map(([hash, { username, email }]) => ({
    title: `${username}, ${email}`,
    value: hash,
  }));

const removeUserPrompt = (userFile) =>
  prompts(
    {
      type: 'select',
      name: 'userHash',
      message: 'Which user should be removed from guser?',
      hint: '(use arrow keys & enter to select)',
      choices: makeChoicesFromUsers(userFile),
    },
    {}
  );

const removeUser = () =>
  new Promise((resolve, reject) => {
    const usersObject = file.get();
    removeUserPrompt(usersObject).then(({ userHash }) => {
      if (userHash === undefined) {
        return reject(new Error('SIGINT'));
      }
      const { hash, username, email } = usersObject[userHash];
      console.log(
        kleur.green(`Removing user: `) + username + kleur.green(', ') + email
      );
      file.unset(hash);
    });
  });

module.exports = { removeUser };
