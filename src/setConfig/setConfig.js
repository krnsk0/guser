const prompts = require('prompts');
const { setLocalGitUser } = require('./helpers');
const { loadUserData, makeChoicesFromUsers } = require('../utils');
const { SET_PROMPT, SET_SUCCESSFUL, SET_FAILED } = require('../strings');

const setUserPrompt = (userData) =>
  prompts(
    {
      type: 'select',
      name: 'hash',
      message: SET_PROMPT,
      choices: makeChoicesFromUsers(userData),
    },
    {}
  );

const setConfig = () =>
  new Promise((resolve, reject) => {
    const userData = loadUserData();
    setUserPrompt(userData).then(({ hash }) => {
      if (hash === undefined) {
        return reject(new Error('SIGINT'));
      }
      const { username, email } = userData.find((entry) => entry.hash === hash);
      if (setLocalGitUser(username, email)) {
        console.log(SET_SUCCESSFUL(username, email));
      } else {
        console.log(SET_FAILED);
      }

      resolve();
    });
  });

module.exports = { setConfig };
