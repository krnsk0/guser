const kleur = require('kleur');
const prompts = require('prompts');
const { createHash } = require('crypto');
const file = require('../utils/jsonFile');

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

const makeUserData = ({ username, email }) => {
  // this handles ctrl+c while the menu is open
  if (username === undefined || email === undefined) {
    throw new Error('SIGINT');
  }
  // happy path
  const hash = createHash('sha1');
  hash.update(username + email);
  const digest = hash.digest('base64');
  return [digest, { username, email }];
};

const addUser = () => {
  return new Promise((resolve) => {
    addUserPrompt().then(({ username, email }) => {
      file.set(...makeUserData({ username, email }));
      console.log(
        kleur.green(`Added user: `) + username + kleur.green(', ') + email
      );
      resolve();
    });
  });
};

module.exports = { addUser, makeUserData };
