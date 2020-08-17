const path = require('path');
const editJsonFile = require('edit-json-file');

const file = editJsonFile(path.resolve(__dirname, '..', 'users.json'), {
  autosave: true,
});

module.exports = file;
