#!/usr/bin/env node
const topLevelMenu = require('./src/topLevelMenu');

try {
  topLevelMenu();
} catch (e) {
  console.error(e);
  process.exit(0);
}
