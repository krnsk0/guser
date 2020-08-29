const {
  file,
  loadUserData,
  saveUserData,
  removeUserByHash,
} = require('./utils');

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

describe('The removeUserByHash function', () => {
  const originalUnset = file.unset;
  beforeEach(() => {
    file.unset = jest.fn();
  });
  afterEach(() => {
    file.unset = originalUnset;
  });

  it('should call file.unset() with the right hash', () => {
    const hash = '!@#$%asdf1324';
    removeUserByHash(hash);
    expect(file.unset.mock.calls[0][0]).toBe(hash);
  });
});
