module.exports = {
  extends: ['node', 'prettier'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'no-process-exit': 0,
    'import/no-commonjs': 0,
  },
};
