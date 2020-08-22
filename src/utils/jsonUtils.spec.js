const { getLongestUsernameLength, addPaddedUsername } = require('./jsonUtils');

describe.only('The addPaddedUsername function', () => {
  it('should add in a padded username key to the object passed in', () => {
    const testData = [
      { username: '12345', email: 'a@b.com' },
      { username: '1234', email: 'a@b.com' },
      { username: '123', email: 'a@b.com' },
    ];

    expect(addPaddedUsername(testData, 5)).toStrictEqual([
      { username: '12345', email: 'a@b.com', paddedUsername: '12345' },
      { username: '1234', email: 'a@b.com', paddedUsername: '1234 ' },
      { username: '123', email: 'a@b.com', paddedUsername: '123  ' },
    ]);
  });
});

describe('The getLongestUsernameLengh function', () => {
  it('should return the length of the longest username', () => {
    const testData = [
      { username: '12345', email: 'a@b.com' },
      { username: '1234', email: 'a@b.com' },
      { username: '123', email: 'a@b.com' },
    ];

    expect(getLongestUsernameLength(testData)).toStrictEqual(5);
  });

  it('should handle an empty array', () => {
    const testData = [];
    expect(getLongestUsernameLength(testData)).toStrictEqual(0);
  });
});
