const prompts = require('prompts');

const { saveUserData } = require('../utils');

const { USERNAME_PROMPT, EMAIL_PROMPT, USER_ADDED } = require('../strings');

const addUserPrompt = () =>
  prompts(
    [
      {
        type: 'text',
        name: 'username',
        message: USERNAME_PROMPT,
        max: 50,
      },
      {
        type: 'text',
        name: 'email',
        message: EMAIL_PROMPT,
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
      console.log(USER_ADDED(username, email));
      resolve();
    });
  });

module.exports = { addUser };
