const file = require('../utils/jsonFile');

const getLongestUsernameLength = (users) =>
  users.reduce(
    (longest, { username }) =>
      username.length > longest ? username.length : longest,
    0
  );

const listUsers = () => {
  const users = Object.values(file.get());
  const longestLength = getLongestUsernameLength(users);

  users.forEach(({ username, email }) => {
    const padding = ' '.repeat(longestLength - username.length + 2);
    console.log(username + padding + email);
  });

  return Promise.resolve();
};

module.exports = { listUsers, getLongestUsernameLength };
