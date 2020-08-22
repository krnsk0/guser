const path = require('path');
const editjsonUtils = require('edit-json-file');

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

const file = editjsonUtils(path.resolve(__dirname, '..', '..', 'users.json'), {
  autosave: true,
});

const loadUserData = () => {
  const userData = Object.values(file.get());
  const longestUsernameLength = getLongestUsernameLength(userData);

  return addPaddedUsername(userData, longestUsernameLength);
};

module.exports = {
  addPaddedUsername,
  getLongestUsernameLength,
  loadUserData,
  file,
};
