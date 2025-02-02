import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import reactHooks from "eslint-plugin-react-hooks";
import a11yPlugin from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  // NOTE: General plugins/presets
  pluginJs.configs.recommended,
  eslintPluginUnicorn.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  a11yPlugin.flatConfigs.recommended,

  // NOTE: File specific plugins/presents
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },

    ...pluginReact.configs.flat.recommended,

    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  {
    files: ["**/*.astro"],
    ...eslintPluginAstro.configs.recommended,
  },
  // NOTE: Rules
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
