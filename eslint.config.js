// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import * as wdioPlugin from 'eslint-plugin-wdio';

export default [
  {
    ignores: [
      '**/allure-results/**',
      '**/allure-report/**',
      '**/docker/**',
      '**/dist/**',
      'wdio.browserstack.conf.js',
      'wdio.local.conf.js',
      'wdio.github.conf.js',
      'wdio.conf.js'
    ]
  },
  // Core configurations
  js.configs.recommended,
  {
    // Global environment settings
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
        before: 'readonly',
        after: 'readonly',
      },
    },
  },
  // WDIO plugin configuration
  {
    plugins: {
      wdio: wdioPlugin,
    },
    rules: wdioPlugin.configs.recommended.rules,
  },
  // Prettier integration
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-console': 'error',
      'prettier/prettier': 'error',
    },
    // File patterns to ignore
  },
];
