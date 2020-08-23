const { loadUserData } = require('../utils/fileUtils');

const listUsers = () => {
  const userData = Object.values(loadUserData());

  userData.forEach(({ paddedUsername, email }) => {
    console.log(paddedUsername + '  ' + email);
  });

  return Promise.resolve();
};

module.exports = { listUsers };
