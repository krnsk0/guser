#!/usr/bin/env node
const topLevelMenu = require('./src/topLevelMenu');
const kleur = require('kleur');
const { bailIfGitNotFound } = require('./src/utils/gitConfigUtils');

bailIfGitNotFound();

topLevelMenu()
  .then(() => null)
  .catch((e) => {
    if (e.message === 'SIGINT') {
      console.log(kleur.red('Exiting guser'));
    }
    process.exit(0);
  });
