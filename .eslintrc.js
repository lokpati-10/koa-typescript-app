module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    eqeqeq: [2, 'always'],
    semi: 0,
    'no-console': 2,
    'arrow-parens': [2, 'as-needed'],
    'max-len': [2, { code: 120, ignoreUrls: true }],
    'comma-dangle': [2, 'never'],
    'no-shadow': 0,
    'prefer-destructuring': 0,
    'dot-notation': 0,
    'sort-imports': 0,
    'simple-import-sort/sort': 2,
    'import/order': 0,
    'func-names': 0,
    'no-restricted-syntax': 0,
    'no-useless-constructor': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'global-require': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-nested-ternary': 0,
    'max-classes-per-file': 0,
    'no-param-reassign': 2,
    'default-case': 0,
    'symbol-description': 0,
    'no-empty': 0,
    'no-void': 0,
    'class-methods-use-this': 0,
    'prefer-promise-reject-errors': 2,
    'no-case-declarations': 2,
    'react/button-has-type': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    '@typescript-eslint/import-name': 0,
    '@typescript-eslint/no-require-imports': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        name: '@a-team/server-utils',
        message: '@a-team/server-utils should only be used on server side code. use allowServerUtils if needed.'
      }
    ],
    'jest/valid-expect': 'error'
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
}
