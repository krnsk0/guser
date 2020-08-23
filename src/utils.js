const path = require('path');
const editjsonUtils = require('edit-json-file');
const { createHash } = require('crypto');

const getLongestUsernameLength = (userData) =>
  userData.reduce(
    (longest, { username }) =>
      username.length > longest ? username.length : longest,
    0
  );

const addPaddedUsername = (userData, longestUsernameLength) => {
  return userData.reduce((output, entry) => {
    output.push(
      Object.assign({}, entry, {
        paddedUsername: entry.username.padEnd(longestUsernameLength, ' '),
      })
    );
    return output;
  }, []);
};

const makeUserDataHash = ({ username, email }) => {
  const hash = createHash('sha1');
  hash.update(username + email);
  const digest = hash.digest('base64');
  return [digest, { username, email }];
};

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

const removeUserByHash = ({ hash }) => {
  file.unset(hash);
};

module.exports = {
  addPaddedUsername,
  getLongestUsernameLength,
  loadUserData,
  makeUserDataHash,
  saveUserData,
  removeUserByHash,
  file,
};
