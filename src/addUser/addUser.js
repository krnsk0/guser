const kleur = require('kleur');
const prompts = require('prompts');
const { createHash } = require('crypto');
const file = require('../utils/jsonUtils');

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

const makeUserDataHash = ({ username, email }) => {
  const hash = createHash('sha1');
  hash.update(username + email);
  const digest = hash.digest('base64');
  return [digest, { username, email }];
};

const addUser = () =>
  new Promise((resolve, reject) => {
    addUserPrompt().then(({ username, email }) => {
      if (username === undefined || email === undefined) {
        return reject(new Error('SIGINT'));
      }
      file.set(...makeUserDataHash({ username, email }));
      console.log(
        kleur.green(`Added user: `) + username + kleur.green(', ') + email
      );
      resolve();
    });
  });

module.exports = { addUser, makeUserDataHash };
