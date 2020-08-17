const editJsonFile = require('edit-json-file');

// initialize file if it doesn't exist
const file = editJsonFile(`${__dirname}/users.json`);
file.save();

const addUser = (user) => {
  console.log('addUser: ', addUser);
};

const removeUser = (user) => {
  console.log('removeUser: ', removeUser);
};

const listUsers = () => {
  console.log('listUsers: ', listUsers);
};

module.exports = { addUser, removeUser, listUsers };
