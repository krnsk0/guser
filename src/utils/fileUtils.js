const path = require('path');
const editjsonUtils = require('edit-json-file');
const {
  getLongestUsernameLength,
  addPaddedUsername,
  makeUserDataHash,
} = require('./pureUtils');

const file = editjsonUtils(path.resolve(__dirname, '..', 'users.json'), {
  autosave: true,
});

const loadUserData = () => {
  const userData = Object.entries(file.get()).reduce(
    (output, [hash, entry]) => {
      output.push({ hash, ...entry });
      return output;
    },
    []
  );
  const longestUsernameLength = getLongestUsernameLength(userData);

  return addPaddedUsername(userData, longestUsernameLength);
};

const saveUserData = ({ username, email }) => {
  file.set(...makeUserDataHash({ username, email }));
};

const removeUserByHash = (hash) => {
  file.unset(hash);
};

module.exports = {
  loadUserData,
  saveUserData,
  removeUserByHash,
  file,
};
