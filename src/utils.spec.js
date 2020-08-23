const {
  getLongestUsernameLength,
  addPaddedUsername,
  makeUserDataHash,
  saveUserData,
  loadUserData,
  file,
} = require('./utils');

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

describe('The loadUserData function', () => {
  const originalGet = file.get;
  beforeEach(() => {
    file.get = jest.fn().mockImplementation(() => {
      return {
        '9YEyhiVx/8iox+zODlakpPCwehg=': {
          username: 'abcdefg',
          email: 'abc@def.com',
        },
        '0y3f/wnta5PBjxSi3UqaSTfM0FU=': {
          username: 'aasdf',
          email: 'asdf@asdf.com',
        },
      };
    });
  });
  afterEach(() => {
    file.get = originalGet;
  });
  it('should load user data', () => {
    expect(loadUserData()).toStrictEqual([
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
    ]);
  });
});

describe('The saveUserData function', () => {
  const originalSet = file.set;
  beforeEach(() => {
    file.set = jest.fn();
  });
  afterEach(() => {
    file.set = originalSet;
  });

  it('should call file.set() with the right hash', () => {
    const testData = { username: 'abcdefg', email: 'abc@def.com' };
    saveUserData(testData);
    expect(file.set.mock.calls[0][0]).toStrictEqual(
      '9YEyhiVx/8iox+zODlakpPCwehg='
    );
    expect(file.set.mock.calls[0][1]).toStrictEqual(testData);
  });
});
