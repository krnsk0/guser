#!/usr/bin/env node
const prompts = require('prompts');
const { Command } = require('commander');
const editJsonFile = require('edit-json-file');
const packageJSON = require('./package.json');
const program = new Command();
program.version(packageJSON.version);

const file = editJsonFile(`${__dirname}/user_config.json`);

file.save();
