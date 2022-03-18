module.exports = {
  extends: ['@micra/eslint-config/typescript'],
  rules: {
    // Sometimes it is necessary to use empty interfaces to define extensible types.
    '@typescript-eslint/no-empty-interface': 'off',
  },
};
