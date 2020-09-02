const kleur = require('kleur');
const { SET, UNSET, ADD, REMOVE, LIST } = require('./constants');

// top level menu
const TOP_LEVEL_PROMPT = 'What would you like to do?';
const CHECKING_CONFIG = 'Checking for local git config...';
const NO_LOCAL_USER = 'No local user set';
const NO_LOCAL_EMAIL = 'No local email set';
const LOCAL_USER = (user) => `${kleur.green(`Local git user`)}: ${user}`;
const LOCAL_EMAIL = (email) => `${kleur.green(`Local git email`)}: ${email}`;
const NO_GIT_ERROR = kleur.red('This script requires git');
const TOP_LEVEL_OPTIONS = {
  [SET]: 'Set local git user config',
  [UNSET]: 'Unset local git user config',
  [REMOVE]: 'Remove user config from guser',
  [LIST]: 'List configs in guser',
  [ADD]: 'Add user config to guser',
};

// unset
const UNSET_SUCCESSFUL = 'Local user/email config unset';
const UNSET_FAILED = 'Could not unset local config';

module.exports = {
  TOP_LEVEL_PROMPT,
  CHECKING_CONFIG,
  NO_LOCAL_USER,
  NO_LOCAL_EMAIL,
  LOCAL_USER,
  LOCAL_EMAIL,
  NO_GIT_ERROR,
  TOP_LEVEL_OPTIONS,
  UNSET_SUCCESSFUL,
  UNSET_FAILED,
};
