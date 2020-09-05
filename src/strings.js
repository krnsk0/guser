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
const UNSET_SUCCESSFUL = kleur.green('Local user/email config unset');
const UNSET_FAILED = kleur.red('Could not unset local config');

// set
const SET_PROMPT = 'Choose a user config to set in the local git repo';
const SET_SUCCESSFUL = (username, email) =>
  `${kleur.green('Set local config to')}: ${username}, ${email}`;
const SET_FAILED = kleur.red(`Could not set local config`);

// remove
const REMOVE_PROMPT = 'Which user should be removed from guser?';
const USER_REMOVED = (username, email) =>
  kleur.green(`Removing user: `) + username + kleur.green(', ') + email;

// add
const USERNAME_PROMPT = 'Enter username';
const EMAIL_PROMPT = 'Enter email';
const USER_ADDED = (username, email) =>
  kleur.green(`Added user: `) + username + kleur.green(', ') + email;

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
  SET_PROMPT,
  SET_SUCCESSFUL,
  SET_FAILED,
  REMOVE_PROMPT,
  USER_REMOVED,
  USERNAME_PROMPT,
  EMAIL_PROMPT,
  USER_ADDED,
};
