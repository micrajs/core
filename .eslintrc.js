module.exports = {
  extends: ['@micra/eslint-config/typescript'],
  rules: {
    // Sometimes it is necessary to use empty interfaces to define extensible types.
    '@typescript-eslint/no-empty-interface': 'off',
    // Sometimes it is necessary to use any to define a more generic and flexible type.
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
