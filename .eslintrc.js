// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('@micra/developer-tools/eslint/library');

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    '@typescript-eslint/no-empty-interface': 'off',
  },
};
