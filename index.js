#!/usr/bin/env node
const topLevelMenu = require('./src/topLevelMenu');
const kleur = require('kleur');

topLevelMenu()
  .then(() => {
    console.log(kleur.grey('Exiting guser'));
  })
  .catch((e) => {
    if (e.message === 'SIGINT') {
      console.log(kleur.red('Exiting guser'));
    }
    process.exit(1);
  });
