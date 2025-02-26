// eslint.config.js
// import js from '@eslint/js';
// import globals from 'globals';
import standard from 'eslint-config-standard';
import prettier from 'eslint-config-prettier';
import wdio from 'eslint-plugin-wdio';

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.es2022,
        ...globals.node,
        ...globals.jest,
        before: 'readonly',
        after: 'readonly',
      },
    },
    plugins: {
      wdio: wdio,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'error',
    },
    ignores: ['/allure-results', '/allure-report', '/docker'],
  },
  standard,
  prettier,
  wdio.configs['flat/recommended'],
];
