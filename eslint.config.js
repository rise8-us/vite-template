import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'


export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    // Add the react plugin
    react,
    // @ts-ignore: It does not like how we're defining the react-hooks plugin for some reason.
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  // @ts-ignore: Ignored for being a known issue with flat configs inside of rules
  // https://github.com/typescript-eslint/typescript-eslint/issues/8522
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true
      }
    ],
  },
})
