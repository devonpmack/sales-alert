// This lint config covers most of the application. Only disable
// or configure rules here if they meet one of the following criteria:
//
// 1. They cover features not available in our version of a given dependency
// 2. They have many false positives and need to be fixed
// 3. They are rules we have decided should be disabled in our shared lint config

module.exports = {
  extends: [
    'plugin:shopify/react',
    'plugin:shopify/typescript',
    'plugin:shopify/prettier',
    'plugin:shopify/polaris',
    'plugin:shopify/webpack',
    'plugin:shopify/jest',
    'plugin:shopify/node',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/external-module-folders': ['node_modules', 'packages'],
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    // These rules have too many false positives and will be remove
    // in future versions of the config
    'jsx-a11y/control-has-associated-label': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': 'off',

    // These rules do not really make sense for TypeScript, we'll remove them
    // in the future
    'consistent-return': 'off',
    'import/named': 'off',

    // We don’t need nesting and ID, just one of them.
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],

    // Custom restrictions for Web
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@shopify/address',
            importNames: ['AddressFormatter'],
            message:
              'Please import from utilities/web-address-formatter instead',
          },
          {
            name: '@shopify/polaris',
            importNames: ['DatePicker'],
            message:
              'Please use DatePicker in /components instead. It has weekStartsOn set by default and uses the Polaris one under the hood, so it has the same API.',
          },
        ],
      },
    ],
  },
};
