const { SET, UNSET, SHOW, ADD, REMOVE, LIST } = require('./constants');
const { setUser, unsetUser, showUser } = require('./gitFunctions');
const { addUser, removeUser, listUsers } = require('./jsonFunctions');

const choices = {
  [SET]: setUser,
  [UNSET]: unsetUser,
  [SHOW]: showUser,
  [ADD]: addUser,
  [REMOVE]: removeUser,
  [LIST]: listUsers,
};

module.exports = (choice) => {
  choices[choice]();
};
