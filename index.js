#!/usr/bin/env node
const topLevelMenu = require('./src/topLevelMenu');
const kleur = require('kleur');
const { bailIfNoGit } = require('./src/utils/gitConfigUtils');

bailIfNoGit();

topLevelMenu()
  .then(() => null)
  .catch((e) => {
    if (e.message === 'SIGINT') {
      console.log(kleur.red('Exiting guser'));
    }
    process.exit(0);
  });
