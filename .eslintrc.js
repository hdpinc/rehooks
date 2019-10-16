module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['@typescript-eslint', 'compat', 'import', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'compat/compat': 'warn',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'always' }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
