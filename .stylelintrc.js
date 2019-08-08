module.exports = {
  extends: ['stylelint-config-shopify/prettier'],
  rules: {
    'shopify/content-no-strings': true,
    'selector-class-pattern': null,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/^grid.*/'],
      },
    ],
  },
};
