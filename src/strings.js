const kleur = require('kleur');

const TOP_LEVEL_PROMPT = 'What would you like to do?';
const TOP_LEVEL_HINT = '(use arrow keys & enter to select)';
const CHECKING_CONFIG = 'Checking for local git config...';
const NO_LOCAL_USER = 'No local user set';
const NO_LOCAL_EMAIL = 'No local email set';
const LOCAL_USER = (user) => `${kleur.green(`Local git user`)}: ${user}`;
const LOCAL_EMAIL = (email) => `${kleur.green(`Local git email`)}: ${email}`;

module.exports = {
  TOP_LEVEL_PROMPT,
  TOP_LEVEL_HINT,
  CHECKING_CONFIG,
  NO_LOCAL_USER,
  NO_LOCAL_EMAIL,
  LOCAL_USER,
  LOCAL_EMAIL,
};
