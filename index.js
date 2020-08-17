#!/usr/bin/env node

const topLevelMenu = require('./src/topLevelMenu');
const topLevelChoices = require('./src/topLevelHandlers');
const kleur = require('kleur');

topLevelMenu().then(({ choice }) => {
  if (choice === undefined) {
    console.log(kleur.red('Exiting guser'));
    process.exit(0);
  } else {
    topLevelChoices(choice);
  }
});
