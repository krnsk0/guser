const kleur = require('kleur');
const prompts = require('prompts');

const { saveUserData } = require('../utils');

const addUserPrompt = () =>
  prompts(
    [
      {
        type: 'text',
        name: 'username',
        message: "Enter the user's username",
        max: 50,
      },
      {
        type: 'text',
        name: 'email',
        message: "Enter the user's email",
        max: 50,
      },
    ],
    {}
  );

const addUser = () =>
  new Promise((resolve, reject) => {
    addUserPrompt().then(({ username, email }) => {
      if (username === undefined || email === undefined) {
        return reject(new Error('SIGINT'));
      }
      saveUserData({ username, email });
      console.log(
        kleur.green(`Added user: `) + username + kleur.green(', ') + email
      );
      resolve();
    });
  });

module.exports = { addUser };
