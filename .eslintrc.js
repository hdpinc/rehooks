module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
  },
  extends: ['@jmdc/eslint-config-typescript-react'],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
  },
}
