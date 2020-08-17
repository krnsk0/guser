const prompts = require('prompts');
const { SET, UNSET, SHOW, ADD, REMOVE, LIST } = require('./constants');

const promptConfig = {
  type: 'select',
  name: 'choice',
  message: 'What would you like to do?',
  hint: '(use arrow keys & enter to select)',
  choices: [
    {
      title: 'Set local git user config',
      value: SET,
    },
    {
      title: 'Unset local git user config',
      value: UNSET,
    },
    {
      title: 'Show local git user config',
      value: SHOW,
    },
    {
      title: 'Add user config to guser',
      value: ADD,
    },
    {
      title: 'Remove user config from guser',
      value: REMOVE,
    },
    {
      title: 'List configs in guser',
      value: LIST,
    },
  ],
};

const topLevelMenu = () => {
  return prompts(promptConfig, {});
};

module.exports = topLevelMenu;
