import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  // NOTE: Configs
  pluginJs.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  a11yPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  // eslint-disable-next-line import/no-named-as-default-member
  tseslint.configs.recommended,
  // eslint-disable-next-line import/no-named-as-default-member
  ...eslintPluginAstro.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  // NOTE: File specific plugins/presents
  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: { ...reactHooks.configs.recommended.rules },
  },

  // NOTE: Import sorting
  {
    files: ['*.{js,mjs,cjs,jsx,tsx,astro}', '**/*.{js,mjs,cjs,jsx,tsx,astro}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { 'simple-import-sort': simpleImportSort, 'import-plugin': importPlugin },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './src', // this loads <rootDir>/tsconfig.json to eslint
        },
        node: true,
      },
    },
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/export': 'error',
      'import/no-cycle': 'error',
    },
  },

  // NOTE: Rules
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
);
