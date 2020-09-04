const prompts = require('prompts');
const {
  loadUserData,
  removeUserByHash,
  makeChoicesFromUsers,
} = require('../utils');
const { REMOVE_PROMPT, USER_REMOVED } = require('../strings');

const removeUserPrompt = (userData) =>
  prompts(
    {
      type: 'select',
      name: 'hash',
      message: REMOVE_PROMPT,
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
      console.log(USER_REMOVED(username, email));
      resolve();
    });
  });

module.exports = { removeUser };
