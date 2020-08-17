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

const addUser = () => {
  addUserPrompt().then(({ username, email }) => {
    if (username === undefined || email === undefined) {
      throw new Error('SIGINT');
    } else {
      const hash = createHash('sha1');
      hash.update(username + email);
      const digest = hash.digest('base64');
      file.set(digest, { username, email });
      console.log(
        kleur.green(`Added user: `) + username + kleur.green(', ') + email
      );
    }
  });
};

module.exports = { addUser };
