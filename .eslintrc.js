module.exports = {
  extends: ['node', 'prettier'],
  plugins: ['jest'],
  rules: {
    'no-process-exit': 0,
    'import/no-commonjs': 0,
  },
};
