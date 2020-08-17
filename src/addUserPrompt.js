const prompts = require('prompts');

const promptConfig = [
  {
    type: 'text',
    name: 'username',
    message: "Enter the user's username",
  },
  {
    type: 'text',
    name: 'email',
    message: "Enter the user's email",
  },
];

const addUserPrompt = () => {
  return prompts(promptConfig, {});
};

module.exports = addUserPrompt;
