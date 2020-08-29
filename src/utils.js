const { createHash } = require('crypto');
const path = require('path');
const editjsonUtils = require('edit-json-file');
const os = require('os');

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

const makeChoicesFromUsers = (userData) => {
  return userData.reduce((output, { paddedUsername, email, hash }) => {
    output.push({ value: hash, title: `${paddedUsername}  ${email}` });
    return output;
  }, []);
};

const userDataPath = path.resolve(os.homedir(), '.guser');

const file = editjsonUtils(userDataPath, {
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
  addPaddedUsername,
  getLongestUsernameLength,
  makeUserDataHash,
  makeChoicesFromUsers,
};
