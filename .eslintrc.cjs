/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:lit/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'lit'],
  root: true,
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'semi': [1, 'never'],
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  }
}