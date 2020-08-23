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

const makeChoicesFromUsers = (userData) => {
  return userData.reduce((output, { paddedUsername, email, hash }) => {
    output.push({ value: hash, title: `${paddedUsername}  ${email}` });
    return output;
  }, []);
};

module.exports = {
  addPaddedUsername,
  getLongestUsernameLength,
  makeUserDataHash,
  makeChoicesFromUsers,
};
