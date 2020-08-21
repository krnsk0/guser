const unsetConfig = jest.fn().mockImplementation(() => Promise.resolve());

module.exports = { unsetConfig };
