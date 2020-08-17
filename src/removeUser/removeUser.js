const editJsonFile = require('edit-json-file');
const kleur = require('kleur');
const prompts = require('prompts');
const path = require('path');

const file = editJsonFile(path.resolve(__dirname, '..', 'users.json'), {
  autosave: true,
});

const makeChoicesFromUsers = (userFile) =>
  Object.entries(userFile).map(([hash, { username, email }]) => ({
    title: `${username}, ${email}`,
    value: { hash, username, email },
  }));

const removeUserPrompt = (userFile) =>
  prompts(
    {
      type: 'select',
      name: 'userToRemove',
      message: 'Which user should be removed from guser?',
      hint: '(use arrow keys & enter to select)',
      choices: makeChoicesFromUsers(userFile),
    },
    {}
  );

const removeUser = () => {
  removeUserPrompt(file.get()).then(({ userToRemove }) => {
    if (userToRemove === undefined) {
      console.log(kleur.red('Exiting guser'));
      process.exit(0);
    } else {
      const { hash, username, email } = userToRemove;
      console.log(
        kleur.green(`Removing user: `) + username + kleur.green(', ') + email
      );
      file.unset(hash);
    }
  });
};

module.exports = { removeUser };
