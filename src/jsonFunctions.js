const editJsonFile = require('edit-json-file');
const kleur = require('kleur');
const { createHash } = require('crypto');

const addUserPrompt = require('./addUserPrompt');

// initialize file if it doesn't exist
const file = editJsonFile(`${__dirname}/users.json`, { autosave: true });

const addUser = () => {
  addUserPrompt().then(({ username, email }) => {
    if (username === undefined || email === undefined) {
      console.log(kleur.red('Exiting guser'));
      process.exit(0);
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

const removeUser = () => {
  console.log('removeUser: ', removeUser);
};

const listUsers = () => {
  console.log('listUsers: ', listUsers);
};

module.exports = { addUser, removeUser, listUsers };
