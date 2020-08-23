const {
  getLongestUsernameLength,
  addPaddedUsername,
  makeUserDataHash,
  makeChoicesFromUsers,
} = require('./pureUtils');

describe('The addPaddedUsername function', () => {
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

describe('The makeUserDataHash function', () => {
  it('should return the right hash for a given username and email', () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    expect(makeUserDataHash(testData)).toStrictEqual([
      '9YEyhiVx/8iox+zODlakpPCwehg=',
      testData,
    ]);
  });
});

describe('The makeChoicesFromUsers function', () => {
  it('should generate a choices array correctly', () => {
    const userData = [
      {
        username: 'abcdefg',
        email: 'abc@def.com',
        paddedUsername: 'abcdefg',
        hash: '9YEyhiVx/8iox+zODlakpPCwehg=',
      },
      {
        username: 'aasdf',
        email: 'asdf@asdf.com',
        paddedUsername: 'aasdf  ',
        hash: '0y3f/wnta5PBjxSi3UqaSTfM0FU=',
      },
    ];

    expect(makeChoicesFromUsers(userData)).toStrictEqual([
      {
        title: 'abcdefg  abc@def.com',
        value: '9YEyhiVx/8iox+zODlakpPCwehg=',
      },
      {
        title: 'aasdf    asdf@asdf.com',
        value: '0y3f/wnta5PBjxSi3UqaSTfM0FU=',
      },
    ]);
  });
});
