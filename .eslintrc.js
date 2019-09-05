module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    parser: '@typescript-eslint/parser',
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
